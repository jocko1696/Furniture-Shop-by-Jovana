import React, {useState} from 'react';
import {BsChevronCompactLeft, BsChevronCompactRight, BsDot} from 'react-icons/bs'
import {RxDotFilled} from "react-icons/rx";
import {BiDotsHorizontal} from "react-icons/bi";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquare} from '@fortawesome/free-solid-svg-icons'
import {NavLink, useParams} from 'react-router-dom';


const slides = [
    {
        url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        textAbove: "Best furniture for your Living Room",
        slogan: "New Furniture Collection trends in 2023",
        textUnder: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
    },
    {
        url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        textAbove: "All necessary furniture in one place",
        slogan: "Buy with style",
        textUnder: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
    },
    {
        url: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        textAbove: "New furniture collection",
        slogan: "Your furniture your style",
        textUnder: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
    },
    {
        url: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        textAbove: "Best furniture for your Living Room",
        slogan: "Buy with the smile",
        textUnder: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
    },
]


const HeroComponent = () => {
    //
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = React.useRef(null);
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const delay = 4000;

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === slides.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);


    return (
        <section className="heroSection h-[610px] w-full  m-auto relative group" id="heroSection">
            <div className="backImg w-full h-full bg-center bg-cover duration-500"
                 style={{backgroundImage: `url(${slides[currentIndex].url})`}}
                 key={currentIndex}

            >

            </div>
            <div className="heroBox absolute flex flex-col top-[121px] left-[140px] max-w-[500px]">
                <p className="text-above">{slides[currentIndex].textAbove}</p>
                <h1 className="text-slogan">{slides[currentIndex].slogan}</h1>
                <p className="text-under">{slides[currentIndex].textUnder}</p>
                <NavLink to="/products"><a className=" shopNow flex items-center text-white text-xl  max-w-[163px] pl-[40px] pr-[40px] pt-[11px] pb-[11px] ">Shop Now</a></NavLink>

            </div>
            <div
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl ">
                <BsChevronCompactLeft className="text-pink-600" size={50} onClick={prevSlide}/>
            </div>
            <div
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl ">
                <BsChevronCompactRight className="text-pink-600" size={50} onClick={nextSlide}/>
            </div>
            <div className="dots flex top-4 justify-center py-2">
                {slides.map((slide, slideIndex) => {
                    return <div
                        key={slideIndex}
                        onClick={() => {
                            setCurrentIndex(slideIndex);
                        }}
                        className={`cursor-pointer  text-pink-600 text-[10px] mr-[3px] ml-[3px] slideshowDot${currentIndex === slideIndex ? " active" : ""}`}
                    >
                        {/*<RxDotFilled/>*/}
                        <FontAwesomeIcon icon={faSquare} size="2xs"/>
                    </div>
                })}
            </div>

        </section>
    );
};

export default HeroComponent;

