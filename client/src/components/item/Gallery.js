import { useState, useEffect } from "react";

export default function Gallery({ toggleGallery, item }) {
    console.log("item: ", item);
    return (
        <div className="item-gallery-overlay">
            <div
                className="gallery-close-wrap"
                onClick={() => toggleGallery(false)}
            >
                X
            </div>
            <div className="item-gallery-wrap">
                <div className="gallery-focus-wrap">
                    <img src={item.media.source} />
                </div>
                <div className="gallery-pics-wrap">
                    {item.assets.map((pic) => (
                        <img key={pic.id} src={pic.url} />
                    ))}
                </div>
            </div>
        </div>
    );
}
