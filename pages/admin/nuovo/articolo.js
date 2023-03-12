import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ItemForm from "@/components/Forms/ItemForm";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";
// import styles from "@/components/Forms/Form.module.css";
import {
    decimalValidation,
    numberValidation,
    textValidation,
} from "@/utils/validateForms";
import { createObjectURL, revokeObjectURL } from "@/utils/useLocalImages";
// import { parseFormRelationsEdit } from "@/utils/custom/parsers";
import axios from "axios";
import Head from "next/head";

export default function NuovoArticolo() {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    let userInfo = useSelector(selectUserState);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});
    const [newImages, setNewImages] = useState([]);
    const [formState, setFormState] = useState({});
    // const fileInput = useRef();
    // const [formState, setFormState] = useState({
    //     categories: [],
    //     tags: [],
    //     // condition: "used",
    //     // price: 0,
    //     // count_in_stock: 1,
    // });

    useEffect(() => {
        console.log("💚 formState: ", formState);
    }, [formState]);

    useEffect(() => {
        setIsAdmin(false);
        handleAuth(userInfo);
    }, [userInfo]);

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
                // const file = e.target.files[0];
                let { data } = await uploadImages(newImages);

                if (data.length) {
                    data = data.map((obj) => obj.Location);
                }
                // let { files } = fileInput.current;
                // const { data } = await uploadImages(files);
                const res = await createItem({ ...formState, pics: data });

                router.push("/admin/lista/articoli");
            } catch (err) {
                alert(getError(err));
            }
        }
    };

    //================================================================================
    // API
    //================================================================================
    const uploadImages = (files) => {
        if (files) {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("arrOfFiles", file.file);
            });
            formData.append("folder", "item");

            return axios.post("/api/admin/upload-pic", formData, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
        } else {
            return [];
        }
    };

    const createItem = (obj) => {
        // parse data and relations for db
        let relatedData = {};
        let relations = [
            { topic: "tags", label: "tag" },
            { topic: "categories", label: "category" },
            { topic: "brands", label: "brand" },
        ];
        relations.map(
            ({ topic, label }) =>
                // per ogni formState item che key corrisponde a topic di relations
                // ridurre ad array di IDs
                (relatedData[topic] = obj[topic]
                    ? obj[topic].map(({ id }) => id)
                    : [])
        );
        // console.log("💚🔍 createItem activated", {
        //     ...obj,
        //     ...relatedData,
        // });
        return axios.post(
            `/api/admin/new/item`,
            {
                ...obj,
                ...relatedData,
            },
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
        );
        // if props exist return put req to db
        /*
        // IO QUI FACCIO SOLO ADD, non EDIT
        // else return post req
        if (propsData) {
            // find addedRelations and removedRelations for DB req
            const relationsObj = parseFormRelationsEdit(relatedData, propsData);
            return axios.put(`/api/admin/edit/item`, {
                ...obj,
                ...relationsObj,
            });
            // 🧨🧨🧨 Probably Broken Parse and TODO API
            // 🧨🧨🧨 need to check changes in pics too (remove deleted and merge with the rest)
        } else {
            return axios.post(`/api/admin/new/item`, {
                ...obj,
                ...relatedData,
            });
        } */
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <Head>
                <title>Admin • Nuovo articolo • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Admin • Nuovo articolo • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>Nuovo Articolo</h1>
                {isAdmin ? (
                    <ItemForm
                        formState={formState}
                        updateFormState={updateFormState}
                        validateData={validateData}
                        confirmChanges={handleSubmit}
                        newImages={newImages}
                        addLocalImages={addLocalImages}
                        deleteImage={deleteImage}
                        errors={errors}
                        // parentRef={fileInput}
                    />
                ) : (
                    <p>Caricamento...</p>
                )}
            </section>
        </main>
    );
}
