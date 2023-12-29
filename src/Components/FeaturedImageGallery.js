import { useEffect, useState } from "react";

export function FeaturedImageGallery({ initialImages }) {
    const [images, setImages] = useState(initialImages);
    const [active, setActive] = useState('');

    const numColumns = images.length <= 4 ? images.length : 5;
    useEffect(() => {
        if (initialImages.length > 0) {
            setImages(initialImages);
            setActive(initialImages[0]); // Set active to the first image in the initialImages array
        }
    }, [initialImages]);


    return (
        <div className="grid gap-4 md:gap-2 lg:gap-4">
            <div>
                <img
                    className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                    src={active}
                    alt=""

                />
            </div>

            <div className="flex justify-center">
                <div className={`grid grid-cols-5 gap-4`}>
                    {images.map((image, index) => (
                        <div key={index} className="w-24 h-24 flex items-center justify-center">
                            <img
                                onClick={() => setActive(image)}
                                src={image}
                                className="max-w-full max-h-full cursor-pointer rounded-lg object-cover object-center"
                                alt="gallery-image"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    ))}
                </div>
            </div>





        </div>
    );
}