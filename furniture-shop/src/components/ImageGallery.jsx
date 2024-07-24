
import React, { useState } from 'react';


const ImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="gallery-container">
            <div className="main-image">
                <img src={selectedImage} alt="Selected" />
            </div>
            <div className="thumbnails">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className={selectedImage === image ? 'active' : ''}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
