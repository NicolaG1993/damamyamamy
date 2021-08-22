import React from "react";

export default function Review({ checkoutToken }) {
    return (
        <>
            <h5>Il vostro ordine:</h5>
            <div>
                {checkoutToken.live.line_items.map((product) => (
                    <div key={product.name} className="review-row">
                        <div className="review-product-infos">
                            <p>{product.name}</p>
                            <p>Quantità: {product.quantity}</p>
                        </div>

                        <p className="review-product-price">
                            {product.line_total.formatted_with_symbol}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <p className="review-final-price">
                    Totale: {checkoutToken.live.subtotal.formatted_with_symbol}
                </p>
            </div>
        </>
    );
}
