import React from 'react';
import { Card } from 'flowbite-react';


const cardSupport = [
    {image:"free-delivery.svg", title:"Free Delivery", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
    {image:"dollar-coin.svg", title:"100% Cash Back", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
    {image:"quality-product.svg", title:"Quality Product", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
    {image:"24-hours-7-days.svg", title:"24/7 Support", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "}
]

const CardSection = () => {
    let cards = cardSupport.map(card=>{
        return  <Card
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={`../../public/images/${card.image}`}
           className="supportCard flex flex-col justify-center items-center"
        >
            <h5 className="text-2xl font-bold tracking-tight dark:text-white supportCardTitle">
                <p>
                    {card.title}
                </p>
            </h5>
            <p className="dark:text-gray-400 cardSupportDesc">
                <p>
                    {card.description}
                </p>
            </p>
        </Card>
    })
    return (
        <section className="sectionInfoCards pb-[100px] ">
            <h1 className="sectionHeadingText text-center">Our Features</h1>
            <div className="centerAdditionalContainer flex ">{cards}</div>
        </section>
    );
};

export default CardSection;
