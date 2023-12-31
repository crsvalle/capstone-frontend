import { useEffect, useState } from "react";

export function FeaturedImageGallery({ initialImages, price }) {
    const [images, setImages] = useState(initialImages);
    const [active, setActive] = useState('');

    useEffect(() => {
        if (initialImages.length > 0) {
            setImages(initialImages);
            setActive(initialImages[0]);
        }
    }, [initialImages]);


    return (
        <div className="grid gap-4">
            <div className="image-container relative">
                <img
                    className=" rounded-lg object-cover object-center"
                    src={active}
                    alt=""
                    />
                    <div className="top-right-text">
                        <h5>${price}</h5>
                        <p>per month</p>
                    </div>
            </div>


            <div className= "grid grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="">
                        <img
                            onClick={() => setActive(image)}
                            src={image}
                            className="max-w-full max-h-full cursor-pointer rounded-lg object-cover object-center"
                            alt="gallery-image" 
                        />
                    </div>
                ))}
            </div>
        </div>



    );
}