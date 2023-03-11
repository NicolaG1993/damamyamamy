import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ItemForm from "@/components/Forms/ItemForm";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";
import {
    decimalValidation,
    numberValidation,
    textValidation,
} from "@/utils/validateForms";
import { createObjectURL, revokeObjectURL } from "@/utils/useLocalImages";
import { parseFormRelationsEdit } from "@/utils/custom/parsers";
import axios from "axios";

export default function ModificaArticolo() {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const { id } = router.query;
    let userInfo = useSelector(selectUserState);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});
    const [newImages, setNewImages] = useState([]);
    const [storedImages, setStoredImages] = useState([]);
    const [formState, setFormState] = useState({});
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        setIsAdmin(false);
        handleAuth(userInfo);
    }, [userInfo]);

    useEffect(() => {
        if (id && isAdmin) {
            fetchData();
        }
    }, [id, isAdmin]);

    const handleAuth = async () => {
        let res = await checkUser(userInfo);
        if (res) {
            setIsAdmin(true);
        } else {
            router.push("/");
        }
    };

    //================================================================================
    // Handle Form Data
    //================================================================================
    const updateFormState = (val, topic) => {
        setFormState({
            ...formState,
            [topic]: val,
        });
    };

    const addLocalImages = (e) => {
        // we need this to display pics before they get uploaded to bucket
        // console.log("e.target.files: ", e.target.files); // use the spread syntax to get it as an array
        const files = [...e.target.files].map((el) => ({
            location: createObjectURL(el),
            key: el.name,
            file: el,
        }));
        setNewImages([...newImages, ...files]);
    };

    const deleteImage = (img) => {
        const newArr = newImages.filter((el) => img.key !== el.key);
        setNewImages(newArr);
        revokeObjectURL(img.file);
    };

    const deleteStoredImage = (str) => {
        let newState = storedImages.filter((x) => x !== str);
        setStoredImages(newState);
    };

    const validateData = async (e) => {
        const { id, name, value } = e.target;
        let newErrObj = { ...errors };

        //validate values
        if (id === "Name") {
            const resp = textValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Price") {
            const resp = decimalValidation("Prezzo", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Stock") {
            const resp = numberValidation("Quantità", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                let { data } = await uploadImages(newImages);
                if (data.length) {
                    data = data.map((obj) => obj.Location);
                }
                const res = await editItem({
                    ...formState,
                    pics: [...data, ...storedImages],
                });
                console.log("res!", res.data);
                router.push("/admin/lista/articoli");
            } catch (err) {
                alert(getError(err));
            }
        }
    };

    //================================================================================
    // API
    //================================================================================
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/get/item/${id}`);
            console.log("💚🔍 data", data);
            setFormState(data);
            setOriginalData(data);
            setStoredImages(data.pics);
        } catch (err) {
            console.log("ERROR!", err);
        }
    };

    const uploadImages = (files) => {
        if (files) {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("arrOfFiles", file.file);
            });
            formData.append("folder", "item");
            console.log("💚🔍 formData", formData);
            return axios.post("/api/admin/upload-pic", formData, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
        } else {
            return [];
        }
    };

    const editItem = async (obj) => {
        console.log("💚 obj: ", obj);
        let relatedData = {};
        let relations = [
            { topic: "tags", label: "tag" },
            { topic: "categories", label: "category" },
            { topic: "brands", label: "brand" },
        ];

        // reduce "obj" arrays to only IDs and store them into relatedData
        relations.map(
            ({ topic, label }) =>
                (relatedData[topic] = obj[topic]
                    ? obj[topic].map(({ id }) => id)
                    : [])
        );

        // check and parse new arrays of IDs for DB
        let addedRelations = {};
        let removedRelations = {};

        Object.entries(relatedData).map(([key, arr], i) => {
            console.log("💚 arr: ", arr);
            console.log("💚 relatedData: ", relatedData);
            // console.log("💚 originalData: ", originalData);

            // reduce originalData array to only IDs
            let ogIDs = originalData[key]
                ? originalData[key].map(({ id }) => id)
                : [];

            // set final arrays of IDs for DB
            if (arr.length) {
                addedRelations[key] = arr.filter((n) => !ogIDs.includes(n));
                removedRelations[key] = ogIDs.filter((n) => !arr.includes(n));
            } else {
                addedRelations[key] = [];
                removedRelations[key] = ogIDs;
            }
        });

        return axios.post(
            `/api/admin/edit/item`,
            {
                ...obj,
                addedRelations,
                removedRelations,
            },
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
        );

        //....

        // 🧠 find addedRelations and removedRelations for DB req
        // 🧨 need to check changes in pics too (remove deleted and merge with the rest)
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <section className="page">
                <h1>Modifica Articolo</h1>
                {isAdmin ? (
                    <ItemForm
                        formState={formState}
                        updateFormState={updateFormState}
                        validateData={validateData}
                        confirmChanges={handleSubmit}
                        newImages={newImages}
                        storedImages={storedImages}
                        addLocalImages={addLocalImages}
                        deleteImage={deleteImage}
                        deleteStoredImage={deleteStoredImage}
                        errors={errors}
                    />
                ) : (
                    <p>Caricamento...</p>
                )}
            </section>
        </main>
    );
}
