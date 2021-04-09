import React from "react";

export default function Review({ checkoutToken }) {
    return (
        <>
            <h6>Order summary</h6>
            <div>
                {checkoutToken.live.line_items.map((product) => (
                    <div key={product.name}>
                        <p>{product.name}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>{product.line_total.formatted_with_symbol}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>
                    Total: {checkoutToken.live.subtotal.formatted_with_symbol}
                </p>
            </div>
        </>
    );
}
