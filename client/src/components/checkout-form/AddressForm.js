import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
            id: code,
            label: name,
        })
    );
    console.log("subdivisions: ", subdivisions);
    const options = shippingOptions.map((sO) => ({
        id: sO.id,
        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
    }));
    console.log("options: ", options);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {
            countries,
        } = await commerce.services.localeListShippingCountries(
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
                <label>Choose a region *</label>
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
                <br />
                <label>Shipping options *</label>
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
                <div>
                    <Link to="/cart">
                        <button>Torna al carrello</button>
                    </Link>
                    <button type="submit">Prosegui</button>
                </div>
            </form>
        </div>
    );
}

/*

guardare quali props di input sono reali invece di CustomTextField (ex. "required"?)

*/
