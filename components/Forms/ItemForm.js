import styles from "@/components/Forms/Form.module.css";
import { useState } from "react";
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
    addLocalImages,
    deleteImage,
    errors,
}) {
    const [openSection, setOpenSection] = useState(false);
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
                    name="title"
                    id="Title"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.title}
                />
                {errors.title && (
                    <div className={styles["form-error"]}>• {errors.title}</div>
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
                    name="conditions"
                    id="Conditions"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onClick={(e) => setOpenSection(e.target.name)}
                    defaultValue={formState.conditions}
                    className={!formState.conditions && styles.placeholder}
                >
                    <option value="" selected disabled hidden>
                        Condizioni
                    </option>
                    <option value={"new"}>Come nuovo</option>
                    <option value={"used"}>Usato</option>
                    <option value={"bad"}>Rovinato</option>
                </select>
            </div>
            <div className={styles.inputWrap}>
                <input
                    disabled
                    placeholder="Immagini"
                    name="pics"
                    id="Pics"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    onBlur={(e) => validateData(e)}
                    onClick={(e) => setOpenSection(e.target.name)}
                    value={formState.pics}
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    disabled
                    placeholder="Brand"
                    name="brand"
                    id="Brand"
                    onChange={(e) =>
                        updateFormState(e.target.value, e.target.name)
                    }
                    // onBlur={(e) => validateData(e)}
                    // value={formState.pics}
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
                        formState.title &&
                        formState.price &&
                        formState.count_in_stock
                            ? false
                            : true
                    }
                    className={`${
                        Object.keys(errors).length === 0 &&
                        formState.title &&
                        formState.price &&
                        formState.count_in_stock
                            ? "button form-button"
                            : "button-disabled form-button"
                    }`}
                >
                    Conferma
                </button>
            </div>
        </form>
    );
}
