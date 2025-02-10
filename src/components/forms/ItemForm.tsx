import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { handleAxiosError } from "@/utils/axiosUtils";
import { InitialItemFormData } from "@/types/item";
import InputSearchableSelect from "../inputs/InputSearchableSelect";
import InputOwner from "../inputs/InputOwner";
import { checkSlugUniqueness } from "@/services/item";
import Image from "next/image";
import { generateSlug, sanitizeName } from "@/utils/slug";

interface ItemFormProps {
    initialData?: InitialItemFormData;
    onSubmit: (data: FormData) => Promise<void>;
    buttonText?: string;
}

export default function ItemForm({
    initialData = {
        name: "",
        brand: null,
        categories: [],
        owner: null,
        condition: "new",
        stock: 1,
        price: 0, // we need float value
        pics: [],
        slug: "",
        description: "",
        // createdAt: "",
        // soldAt: "", // we could add a date when admin confirm the product was sold (not available on creation phase, but a separate button on item page)
    },
    onSubmit,
    buttonText = "Conferma",
}: ItemFormProps) {
    const conditions = [
        { value: "new", key: "Nuovo" },
        { value: "used", key: "Usato" },
        { value: "refurbished", key: "Rigenerato" },
    ];
    const [formData, setFormData] = useState<InitialItemFormData>(initialData);
    const [isSlugCustom, setIsSlugCustom] = useState(false);
    const [isSlugUnique, setIsSlugUnique] = useState(true);
    const [filePreviews, setFilePreviews] = useState<string[]>(
        initialData.pics as string[]
    );
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if ((name === "name" && !isSlugCustom) || !formData.slug) {
            const newSlug = generateSlug(value);
            setFormData((prev) => ({ ...prev, slug: newSlug }));
        }

        if (name === "slug") {
            if (isSlugCustom && !value) {
                setIsSlugCustom(false);
                const newSlug = generateSlug(formData.name);
                setFormData((prev) => ({ ...prev, slug: newSlug }));
            } else {
                setIsSlugCustom(true);
                setFormData((prev) => ({ ...prev, slug: sanitizeName(value) }));
            }
        }
    };

    const handleSlugBlur = async () => {
        if (
            !formData.slug ||
            (initialData.slug && formData.slug === initialData.slug)
        ) {
            setIsSlugUnique(true);
            return;
        }

        try {
            const unique = await checkSlugUniqueness(formData.slug);
            setIsSlugUnique(unique);
            if (!unique) {
                setError(
                    "Il slug non è unico. Per favore, scegli un altro slug."
                );
            }
        } catch (err) {
            console.error("Error checking slug uniqueness:", err);
            setIsSlugUnique(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Pics formData
            const files = Array.from(e.target.files);
            setFormData((prev) => ({
                ...prev,
                pics: [...prev.pics, ...files],
            }));

            // Pics preview
            const previews: string[] = [];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        const result = event.target?.result;
                        if (typeof result === "string") {
                            previews.push(result);
                            setFilePreviews((prev) => [...prev, result]);
                        }
                        // previews.push(event.target.result as string);
                        // setFilePreviews((prev) => [
                        //     ...prev,
                        //     event.target.result as string,
                        // ]);
                    }
                };
                reader.readAsDataURL(file); // Read file as a data URL (suitable for images)
            });
        }
    };

    const handleFileDelete = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            pics: prev.pics.filter((_, i) => i !== index),
        }));
        setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!formData.owner) {
            setError("Proprietario mancante.");
            return;
        }

        if (!isSlugUnique) {
            setError("Il slug non è unico. Per favore, scegli un altro slug.");
            return;
        }

        try {
            // Create a new FormData object directly from the form element
            const formElement = e.target as HTMLFormElement;
            // Create FormData object to handle files upload
            const formDataToSend = new FormData(formElement);

            // Manually serialize the complex fields (brand, owner, categories) before appending
            if (formData.brand) {
                formDataToSend.append("brand", JSON.stringify(formData.brand)); // Serialize brand object
            }

            formDataToSend.append("owner", JSON.stringify(formData.owner)); // Serialize owner object

            formDataToSend.append(
                "categories",
                JSON.stringify(formData.categories)
            ); // Serialize categories object

            if (formData.pics) {
                // Append each pic individually
                formData.pics.forEach((pic: string | File) => {
                    formDataToSend.append("pics", pic);
                });
            }

            await onSubmit(formDataToSend);
            // await onSubmit(formData);
        } catch (err) {
            console.error("Item form submission failed:", err);
            setError(handleAxiosError(err));
        }
    };

    useEffect(() => {
        if (!isSlugCustom && formData.name) {
            const newSlug = generateSlug(formData.name);
            setFormData((prev) => ({ ...prev, slug: newSlug }));
        }
    }, [formData.name, isSlugCustom]);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
                <div className={styles["server-error"]}>
                    <p>{error}</p>
                </div>
            )}

            <div className={styles.inputWrap}>
                <label>Nome*</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Inserisci nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.inputWrap}>
                <label>Prezzo*</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.inputWrap}>
                <label>Descrizione</label>
                <textarea
                    name="description"
                    placeholder="Inserisci maggiori informazioni"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.inputWrap}>
                <label>Slug* (generato automaticamente)</label>
                <input
                    type="text"
                    name="slug"
                    placeholder="Inserisci url articolo"
                    value={formData.slug}
                    onChange={handleChange}
                    onBlur={handleSlugBlur}
                    required
                />
                {!isSlugUnique && (
                    <p className={styles["error-text"]}>
                        Questo slug è già in uso.
                    </p>
                )}
            </div>

            <div className={styles.inputWrap}>
                <label>Numero di articoli</label>
                <input
                    type="number"
                    name="stock"
                    placeholder="Count in Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.inputWrap}>
                <label>Condizioni*</label>
                <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                >
                    {conditions.map((condition) => (
                        <option key={condition.key} value={condition.value}>
                            {condition.key}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.inputWrap}>
                <label>Foto</label>
                <div className={styles.imagesWrap}>
                    <div className={styles.customFileInput}>
                        <label
                            htmlFor="file-upload-button"
                            className={styles.trigger}
                        >
                            <span className={styles.plus}>+</span>
                        </label>
                        <input
                            type="file"
                            name="images"
                            id="file-upload-button"
                            multiple
                            onChange={handleFileUpload}
                            accept="image/*"
                        />
                    </div>

                    {filePreviews.map((pic, i) => (
                        <div
                            key={"picture: " + pic}
                            className={styles.previewPic}
                        >
                            <span
                                className={styles.deletePic}
                                onClick={() => handleFileDelete(i)}
                            >
                                X
                            </span>
                            <Image
                                src={pic}
                                alt={`Preview ${i + 1}`}
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.separator}></div>

            {/* Owner input */}
            <div className={styles.inputWrap}>
                <label>Proprietario*</label>
                <InputOwner
                    selectedOwner={formData.owner}
                    onSelectOwner={(owner) =>
                        setFormData((prev) => ({ ...prev, owner }))
                    }
                />
            </div>

            <div className={styles.separator}></div>

            {/* Brand input */}
            <div className={styles.inputWrap}>
                <label>Brand</label>
                <InputSearchableSelect
                    label="Brand"
                    selected={formData.brand}
                    onAdd={(brand) =>
                        setFormData((prev) => ({ ...prev, brand }))
                    }
                    onRemove={() =>
                        setFormData((prev) => ({ ...prev, brand: null }))
                    }
                    // apiEndpoint="/api/brands"
                    allowMultiple={false}
                />
            </div>

            <div className={styles.separator}></div>

            {/* Categories input */}
            <div className={styles.inputWrap}>
                <label>Categorie</label>
                <InputSearchableSelect
                    label="Category"
                    selected={formData.categories}
                    onAdd={(category) =>
                        setFormData((prev) => ({
                            ...prev,
                            categories: [...prev.categories, category],
                        }))
                    }
                    onRemove={(category) =>
                        setFormData((prev) => ({
                            ...prev,
                            categories: prev.categories.filter(
                                (cat) => cat !== category
                            ),
                        }))
                    }
                    // apiEndpoint="/api/categories"
                    allowMultiple={true}
                />
            </div>

            <div className={styles.buttonWrap}>
                <button type="submit" className="secondary form-button">
                    {buttonText}
                </button>
            </div>
        </form>
    );
}
