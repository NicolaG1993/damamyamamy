import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";

export default function PaymentForm({
    userInfo,
    cartItems,
    shippingAddress,
    nextStep,
    backStep,
}) {
    return (
        <form className={styles.form}>
            <h2>Pagamento</h2>
        </form>
    );
}
