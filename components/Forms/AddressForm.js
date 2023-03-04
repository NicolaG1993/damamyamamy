import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import {
    addressValidation,
    nameValidation,
    numberValidation,
    textValidation,
} from "@/utils/validateForms";

const countries = ["Italia", "Svizzera", "Austria", "Germania"];
const shippingOptions = [
    {
        id: "Ritiro in negozio",
        label: `Ritiro in negozio (Gratis)`,
    },
    {
        id: "Spedizione",
        label: `Spedizione (a carico del cliente)`,
    },
];

export default function AddressForm({ next, shippingAddress, cartItems }) {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const [formState, setFormState] = useState({});
    const [errors, setErrors] = useState({});

    //================================================================================
    // Functions
    //================================================================================
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/carrello");
        }
        if (shippingAddress && Object.keys(shippingAddress).length) {
            setFormState(shippingAddress);
        }
    }, []);

    const handleChange = (name, value) => {
        let newState = { ...formState, [name]: value };
        setFormState(newState);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        next({
            fullName: formState.fullName,
            address: formState.address,
            city: formState.city,
            postalCode: formState.postalCode,
            country: formState.country,
            shippingOption: formState.shippingOption,
        });
    };

    const validateData = (e) => {
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };
        //validate
        if (id === "Full Name") {
            const resp = textValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Address") {
            const resp = addressValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "City") {
            const resp = nameValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Postal Code") {
            const resp = numberValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Country") {
            const resp = nameValidation(id, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <div className={styles.formWrap}>
            <Link href={"/carrello"} className="back-button">
                {"< "}Torna al carrello
            </Link>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <h2>Indirizzo</h2>

                <div className={styles.inputWrap}>
                    <input
                        required
                        type="text"
                        name="fullName"
                        id="Full Name"
                        placeholder="Nome completo*"
                        value={formState.fullName}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.fullName && (
                        <div className={styles["form-error"]}>
                            • {errors.fullName}
                        </div>
                    )}
                </div>

                <div className={styles.inputWrap}>
                    <input
                        required
                        type="text"
                        name="address"
                        id="Address"
                        placeholder="Indirizzo*"
                        value={formState.address}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.address && (
                        <div className={styles["form-error"]}>
                            • {errors.address}
                        </div>
                    )}
                </div>

                <div className={styles.inputWrap}>
                    <input
                        required
                        type="text"
                        name="city"
                        id="City"
                        placeholder="Città*"
                        value={formState.city}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.city && (
                        <div className={styles["form-error"]}>
                            • {errors.city}
                        </div>
                    )}
                </div>

                <div className={styles.inputWrap}>
                    <input
                        required
                        type="text"
                        name="postalCode"
                        id="PostalCode"
                        placeholder="CAP*"
                        value={formState.postalCode}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        onBlur={(e) => validateData(e)}
                    />
                    {errors.postalCode && (
                        <div className={styles["form-error"]}>
                            • {errors.postalCode}
                        </div>
                    )}
                </div>

                <div className={styles.inputWrap}>
                    <select
                        required
                        name="country"
                        id="Country"
                        placeholder="Stato*"
                        value={formState.country}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                    >
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputWrap}>
                    <select
                        required
                        name="country"
                        id="Country"
                        placeholder="Metodo di spedizione*"
                        value={formState.shippingOption}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                        onBlur={(e) => validateData(e)}
                    >
                        {shippingOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.buttonWrap}>
                    <button
                        type="submit"
                        disabled={
                            Object.keys(errors).length === 0 ? false : true
                        }
                        className={`${
                            Object.keys(errors).length === 0
                                ? "button form-button"
                                : "button-disabled form-button"
                        }`}
                    >
                        Conferma
                    </button>
                </div>
            </form>
        </div>
    );
}
