import { useState, useEffect } from "react";

export default function Gallery({ toggleGallery, item }) {
    console.log("item: ", item);
    const [focus, setFocus] = useState(item.assets[0].url);
    const [picId, setPicId] = useState(item.assets[0].id);

    const setFocusPic = (id, url) => {
        setFocus(url);
        setPicId(id);
    };

    return (
        <div className="item-gallery-overlay">
            <div
                id="hamBtn"
                className={"gallery-close-wrap hamBtn active"}
                onClick={() => toggleGallery(false)}
            >
                <div className={"stick"}></div>
            </div>

            <div className="item-gallery-wrap">
                <div className="gallery-focus-wrap">
                    <div>
                        <img src={focus} />
                    </div>
                </div>
                <div className="gallery-pics-wrap">
                    {item.assets.map((pic) => (
                        <div key={pic.id}>
                            <img
                                src={pic.url}
                                onClick={() => setFocusPic(pic.id, pic.url)}
                            />
                            {pic.id === picId && (
                                <div className="gallery-pic-selected"> </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
