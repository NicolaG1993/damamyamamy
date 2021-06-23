import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import {
    nameValidation,
    emailValidation,
    requestedValue,
} from "../../utils/validate-forms";

export default function AddressForm({ checkoutToken, next }) {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    // const methods = useForm();
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    console.log("errors: ", errors);

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    // console.log("countries: ", countries);
    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
            id: code,
            label: name,
        })
    );
    // console.log("subdivisions: ", subdivisions);
    const options = shippingOptions.map((sO) => ({
        id: sO.id,
        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
    }));
    console.log("options: ", options);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } =
            await commerce.services.localeListShippingCountries(
                checkoutTokenId
            );

        // console.log("fetched countries: ", countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]); //questo mi serve perché ricevo un oggetto invece di array (da commerce), e voglio solo i keys "countries" al suo interno // [0] é per avere il primo di questi
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );

        // console.log("fetched subdivisions: ", subdivisions);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (
        checkoutTokenId,
        country,
        region = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, region }
        );

        // console.log("fetched options: ", options);
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }; //region = null se non cé né una // io ho una sola option al momento ma puo essere utile se si vogliono aggiungere in futuro -> good practice

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []); //useEffect é come componentDidMount, viene eseguito solo al caricamento del component // perché [] alla fine

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]); //useEffect viene eseguito solo se cambia shippingCountry // perché [shippingCountry] alla fine // if exists

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(
                checkoutToken.id,
                shippingCountry,
                shippingSubdivision
            );
    }, [shippingSubdivision]);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        // console.log("form data: ", allValues);

        setValues(allValues);

        // for (let name of data.keys()) {
        //     console.log("form name: ", name);
        // }
        // for (let value of data.values()) {
        //     console.log("form value: ", value);
        // }
    };

    useEffect(() => {
        if (values) {
            console.log("values in useEffect: ", values);
        }
    }, [values]);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        //creo nuovo oggetto per rimuovere errore precedente
        let newErrObj = { ...errors };

        //validate
        if (name === "firstName") {
            const resp = nameValidation("first name", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (name === "lastName") {
            const resp = nameValidation("last name", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (name === "email") {
            const resp = emailValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (name === "address1" || name === "city" || name === "zip") {
            const resp = requestedValue(name, value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            next(values);
        } else {
            console.log("INVALID INPUTS");
            return;
        }
    };

    return (
        <div className="checkout-form-box">
            <h3 className="second-font">I vostri dati</h3>

            <form
                onChange={(e) => handleForm(e)}
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="form-col-left">
                    <label>Nome *</label>
                </div>
                <div className="form-col-right">
                    <input
                        required
                        type="text"
                        name="firstName"
                        id="firstName"
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>

                <div className="form-col-left">
                    <label>Cognome *</label>
                </div>
                <div className="form-col-right">
                    <input
                        required
                        type="text"
                        name="lastName"
                        id="lastName"
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>

                <div className="form-col-left">
                    <label>Indirizzo *</label>
                </div>
                <div className="form-col-right">
                    <input
                        required
                        type="text"
                        name="address1"
                        id="address1"
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>

                <div className="form-col-left">
                    <label>Email *</label>
                </div>
                <div className="form-col-right">
                    <input
                        required
                        type="text"
                        name="email"
                        id="email"
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>

                <div className="form-col-left">
                    <label>Città *</label>
                </div>
                <div className="form-col-right">
                    <input
                        required
                        type="text"
                        name="city"
                        id="city"
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>

                <div className="form-col-left">
                    <label>CAP *</label>
                </div>
                <div className="form-col-right">
                    <input
                        required
                        type="text"
                        name="zip"
                        id="zip"
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>

                <div className="form-col-left">
                    <label>Stato</label>
                </div>
                <div className="form-col-right">
                    <select
                        required
                        name="country"
                        id="country"
                        value={shippingCountry}
                        onChange={(e) => setShippingCountry(e.target.value)}
                    >
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-col-left">
                    <label>Provincia</label>
                </div>
                <div className="form-col-right">
                    <select
                        required
                        name="region"
                        id="region"
                        value={shippingSubdivision}
                        onChange={(e) => setShippingSubdivision(e.target.value)}
                    >
                        {subdivisions.map((subdivision) => (
                            <option key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-col-left">
                    <label>Metodo di spedizione</label>
                </div>
                <div className="form-col-right">
                    <select
                        required
                        name="shipping"
                        id="shipping"
                        value={shippingOption}
                        onChange={(e) => setShippingOption(e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <div className="row-submit">
                        <Link to="/cart">
                            <button className={"layout-button btn-dark1"}>
                                Torna al carrello
                            </button>
                        </Link>
                        <button
                            className={"layout-button btn-dark1"}
                            type="submit"
                        >
                            Prosegui
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

/*

guardare quali props di input sono reali invece di CustomTextField (ex. "required"?)

*/
