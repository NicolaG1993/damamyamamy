import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
// import CustomTextField from "./CustomTextField";

export default function AddressForm({ checkoutToken }) {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    // const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    console.log("countries: ", countries);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {
            countries,
        } = await commerce.services.localeListShippingCountries(
            checkoutTokenId
        );

        console.log("fetched countries: ", countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]); //questo mi serve perché ricevo un oggetto invece di array (da commerce), e voglio solo i keys "countries" al suo interno // [0] é per avere il primo di questi
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    return (
        <div className={"address-form-box"}>
            <h3>Address Form Comp</h3>
            <form onSubmit={""}>
                {/* <CustomTextField /> */}
                <label>First name *</label>
                <input required type="text" name="firstName" id="firstName" />
                <br />
                <label>Last name *</label>
                <input required type="text" name="lastName" id="lastName" />
                <br />
                <label>Address *</label>
                <input required type="text" name="address1" id="address1" />
                <br />
                <label>Email *</label>
                <input required type="text" name="email" id="email" />
                <br />
                <label>City *</label>
                <input required type="text" name="city" id="city" />
                <br />
                <label>CAP *</label>
                <input required type="text" name="zip" id="zip" />
                <br />
                <label>Choose a coutry *</label>
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
                <br />
                {/* <label>Choose a region *</label>
                <select required name="region" id="region">
                    <option value="lombardia">Lombardia</option>
                    <option value="veneto">Veneto</option>
                    <option value="trentino">Trentino - Alto Adige</option>
                </select>
                <br />
                <label>Shipping options *</label>
                <select required name="shipping" id="shipping">
                    <option value="free">Free</option>
                    <option value="express">Express</option>
                </select>
                <br />
                <input type="submit" value="Submit" /> */}
            </form>
        </div>
    );
}

/*

guardare quali props di input sono reali invece di CustomTextField

*/
