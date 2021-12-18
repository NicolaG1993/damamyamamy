// api fetch ordine
// no ssr
// rifare component

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useReducer, useState } from "react";
// import { Store } from "../../utils/Store";
import { useSnackbar } from "notistack";
import { getError } from "../../../shared/utils/error";
import axios from "axios";

import Cookies from "js-cookie";

import { formatJSDate } from "../../../shared/utils/convertTimestamp";

import { shallowEqual, useSelector } from "react-redux";
const loggedUser = (state) => state.user.userInfo;

function Order({ params }) {
    const orderId = Number(params.id);
    const router = useRouter();
    let userInfo = useSelector(loggedUser, shallowEqual);

    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const [order, setOrder] = useState();
    const [error, setError] = useState();

    // const {
    //     shipping_address,
    //     paymentmethod,
    //     orderitems,
    //     itemsprice,
    //     taxprice,
    //     shippingprice,
    //     totalprice,
    //     isdelivered,
    //     deliveredat,
    //     ispaid,
    //     paidat,
    // } = order;

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }

        // in questo file fare check di tutte le keys id, orderId, _id
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                setOrder(data.rows[0]);
            } catch (err) {
                setError(getError(err));
                enqueueSnackbar(getError(err), { variant: "error" });
            }
        };

        fetchOrder();
    }, []);

    console.log("order:", order);

    return (
        <main>
            <h1>Order details: {orderId}</h1>

            {!order ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <section className={"placeorder-section"}>
                    <div>
                        <div>
                            <h2>Shipping Address</h2>
                            <p>
                                {order.shipping_address.fullName},{" "}
                                {order.shipping_address.address},{" "}
                                {order.shipping_address.city},{" "}
                                {order.shipping_address.postalCode},{" "}
                                {order.shipping_address.country}
                            </p>
                            <p>
                                Status:{" "}
                                {order.is_delivered
                                    ? `delivered at ${formatJSDate(
                                          order.delivered_at
                                      )}`
                                    : `not delivered`}
                            </p>
                        </div>

                        <div>
                            <h2>Payment Method</h2>
                            <p>{order.payment_method}</p>
                            <p>
                                Status:{" "}
                                {order.ispaid
                                    ? `paid at ${formatJSDate(order.paid_at)}`
                                    : `not paid`}
                            </p>
                        </div>

                        <div>
                            <h2>Order items</h2>
                            <div>
                                <div className={"grid-table-headings"}>
                                    <h4>Image</h4>
                                    <h4>Name</h4>
                                    <h4>Quantity</h4>
                                    <h4>Price</h4>
                                </div>
                                {order.order_items.map((el) => (
                                    <div
                                        key={el.itemId}
                                        className={"placeorder-table-product"}
                                    >
                                        <div>
                                            <Link href={`/product/${el.slug}`}>
                                                <a>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            height: "50px",
                                                            width: "50px",
                                                        }}
                                                    >
                                                        <Image
                                                            src={
                                                                el.image ||
                                                                "/pics/Logo.jpg"
                                                            }
                                                            alt={el.name}
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                </a>
                                            </Link>

                                            <Link href={`/product/${el.slug}`}>
                                                <a>
                                                    <h4>{el.name}</h4>
                                                </a>
                                            </Link>

                                            <p>{el.quantity} €</p>
                                            <p>{el.price} €</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={"flex-paragraph"}>
                            <p>Items Price:</p> <p>{order.items_price} €</p>
                        </div>
                        <div className={"flex-paragraph"}>
                            <p>Tax Price:</p> <p>{order.tax_price} €</p>
                        </div>
                        <div className={"flex-paragraph"}>
                            <p>Shipping Price:</p>{" "}
                            <p>{order.shipping_price} €</p>
                        </div>
                        <div className={"flex-paragraph"}>
                            <h4>Total Price:</h4> <h4>{order.total_price} €</h4>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}
export default dynamic(() => Promise.resolve(Order), { ssr: false });
