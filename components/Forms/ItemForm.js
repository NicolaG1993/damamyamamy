import styles from "@/components/Forms/Form.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import MultipleSelector from "./Selectors/MultipleSelector";

/*
    Questo form va utilizzato sia per creare nuovo che per modificare
    Si modifica quando riceviamo prop
*/

export default function ItemForm({
    formState,
    updateFormState,
    validateData,
    confirmChanges,
    newImages,
    storedImages,
    addLocalImages,
    deleteImage,
    deleteStoredImage,
    errors,
    parentRef,
    processing,
}) {
    const [openSection, setOpenSection] = useState(false);

    const handleParentState = (val, topic) => {
        updateFormState(val, topic);
    };
    return (
        <form
            className={styles.form}
            onSubmit={(e) => confirmChanges(e)}
            // onClick={() => openSection && setOpenSection()}
        >
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    placeholder="Titolo*"
                    name="name"
                    id="Name"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.name}
                />
                {errors.name && (
                    <div className={styles["form-error"]}>• {errors.name}</div>
                )}
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Prezzo*"
                    name="price"
                    id="Price"
                    onChange={(e) =>
                        updateFormState(
                            Number(parseFloat(e.target.value).toFixed(2)),
                            e.target.name
                        )
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.price}
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="number"
                    min="0"
                    placeholder="Quantità*"
                    name="count_in_stock"
                    id="Stock"
                    onChange={(e) =>
                        updateFormState(Number(e.target.value), e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.count_in_stock}
                />
            </div>
            <div className={styles.inputWrap}>
                <select
                    name="condition"
                    id="Condition"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.condition}
                    className={!formState.condition && styles.placeholder}
                >
                    <option
                        value=""
                        selected={formState.condition ? false : true}
                        disabled
                        hidden
                    >
                        Condizioni
                    </option>
                    <option value={"new"}>Come nuovo</option>
                    <option value={"used"}>Usato</option>
                    <option value={"bad"}>Rovinato</option>
                </select>
            </div>
            <div className={styles.inputWrap}>
                <label
                    className={styles.picsInput}
                    style={{
                        color:
                            (formState.pics ? formState.pics.length : 0) +
                                (newImages ? newImages.length : 0) >
                            0
                                ? "var(--colorD)"
                                : "var(--colorG)",
                    }}
                >
                    {(formState.pics ? formState.pics.length : 0) +
                        (newImages ? newImages.length : 0) >
                    0
                        ? `Immagini: ${
                              (formState.pics ? formState.pics.length : 0) +
                              (newImages ? newImages.length : 0)
                          } selezionate`
                        : "Immagini"}
                    <input
                        type="file"
                        multiple
                        placeholder="Immagini"
                        name="pics"
                        id="Pics"
                        // ref={parentRef}
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => addLocalImages(e)}
                        onClick={(e) => setOpenSection(e.target.name)}

                        // value={formState.pics}
                    />
                </label>

                {storedImages && storedImages.length && (
                    <div className={styles["imagesWrap"]}>
                        <p>Foto</p>
                        <div>
                            {storedImages.map((str, i) => (
                                <div
                                    key={"DB pic " + i}
                                    className={styles["formImage"]}
                                >
                                    <Image
                                        src={str}
                                        alt={`Picture`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span
                                        className={styles["deleteImage"]}
                                        onClick={() => deleteStoredImage(str)} // 🧠 serve un'altra fn qui
                                    >
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {newImages && newImages.length > 0 && (
                    <div className={styles["imagesWrap"]}>
                        <p>Nuove foto</p>
                        <div>
                            {newImages.map((pic) => (
                                <div
                                    key={pic.key}
                                    className={styles["formImage"]}
                                >
                                    <Image
                                        src={pic.location}
                                        alt={`Picture`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span
                                        className={styles["deleteImage"]}
                                        onClick={() => deleteImage(pic)}
                                    >
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.inputWrap}>
                {/* <input
                    disabled
                    placeholder="Brand"
                    name="brand"
                    id="Brand"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    // onBlur={(e) => validateData(e)}
                    // value={formState.pics}
                /> */}
                <MultipleSelector
                    label="brands"
                    inputID="Brands"
                    table="brand"
                    currentState={formState.brands}
                    updateFormState={handleParentState}
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                />
            </div>
            <div className={styles.inputWrap}>
                {/* <input
                    disabled
                    placeholder="Categorie"
                    name="categories"
                    id="Categories"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    // onBlur={(e) => validateData(e)}
                    // value={formState.pics}
                /> */}
                <MultipleSelector
                    label="categories"
                    inputID="Categories"
                    table="category"
                    currentState={formState.categories}
                    updateFormState={handleParentState}
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                />
            </div>
            <div className={styles.inputWrap}>
                {/* <input
                    disabled
                    placeholder="Tags"
                    name="tags"
                    id="Tags"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    // onBlur={(e) => validateData(e)}
                    // value={formState.pics}
                /> */}
                <MultipleSelector
                    label="tags"
                    inputID="Tags"
                    table="tag"
                    currentState={formState.tags}
                    updateFormState={handleParentState}
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                />
            </div>
            <div className={styles.inputWrap}>
                <textarea
                    placeholder="Informazioni aggiuntive"
                    name="info"
                    id="Info"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.info}
                />
            </div>
            <div className={styles.inputWrap}>
                <textarea
                    placeholder="Descrizione"
                    name="description"
                    id="Description"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.description}
                />
            </div>
            <div className={styles.buttonWrap}>
                <button
                    type="submit"
                    onClick={() => setOpenSection()}
                    disabled={
                        Object.keys(errors).length === 0 &&
                        formState.name &&
                        formState.price &&
                        !processing
                            ? false
                            : true
                    }
                    className={`${
                        Object.keys(errors).length === 0 &&
                        formState.name &&
                        formState.price &&
                        !processing
                            ? "button form-button"
                            : "button-disabled form-button"
                    }`}
                >
                    {processing ? "Attendere..." : "Conferma"}
                </button>
            </div>
        </form>
    );
}
