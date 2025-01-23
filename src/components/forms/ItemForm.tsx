import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { handleAxiosError } from "@/utils/axiosUtils";
import { ItemFormData } from "@/types/item";
import InputSearchableSelect from "../inputs/InputSearchableSelect";
import InputOwner from "../inputs/InputOwner";
import { checkSlugUniqueness } from "@/services/item";

interface ItemFormProps {
    initialData?: ItemFormData;
    onSubmit: (data: ItemFormData) => Promise<void>;
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
        soldAt: "", // we could add a date when admin confirm the product was sold (not available on creation phase, but a separate button on item page)
    },
    onSubmit,
    buttonText = "Conferma",
}: ItemFormProps) {
    const conditions = [
        { key: "new", value: "nuovo" },
        { key: "used", value: "usato" },
        { key: "refurbished", value: "rigenerato" },
    ];
    const [formData, setFormData] = useState<ItemFormData>(initialData);
    const [isSlugCustom, setIsSlugCustom] = useState(false);
    const [isSlugUnique, setIsSlugUnique] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
    };

    // const checkSlugUniqueness = async (slug: string) => {
    //     if (slug === initialData.slug) {
    //         return true;
    //     }

    //     try {
    //         const response = await axios.get(`/api/check-slug`, {
    //             params: { slug },
    //         });
    //         return response.data.isUnique;
    //     } catch (err) {
    //         console.error("Error checking slug uniqueness:", err);
    //         return false;
    //     }
    // };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "name" && !isSlugCustom) {
            const newSlug = generateSlug(value);
            setFormData((prev) => ({ ...prev, slug: newSlug }));
        }

        if (name === "slug") {
            setIsSlugCustom(true);
            setFormData((prev) => ({ ...prev, slug: value }));
        }
    };

    const handleSlugBlur = async () => {
        if (initialData.slug && formData.slug === initialData.slug) {
            return true;
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
            const files = Array.from(e.target.files);
            setFormData((prev) => ({
                ...prev,
                pics: [...prev.pics, ...files.map((file) => file.name)],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            await onSubmit(formData);
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
                <input
                    type="text"
                    name="name"
                    placeholder="Nome*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.inputWrap}>
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
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.inputWrap}>
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug*"
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

            <div className={styles.inputWrap}>
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleFileUpload}
                />
            </div>

            {/* Brand input */}
            <InputSearchableSelect
                label="Brand"
                selected={formData.brand}
                onAdd={(brand) => setFormData((prev) => ({ ...prev, brand }))}
                // apiEndpoint="/api/brands"
                allowMultiple={false}
            />

            {/* Categories input */}
            <InputSearchableSelect
                label="Categorie"
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

            {/* Owner input */}
            <InputOwner
                selectedOwner={formData.owner}
                onSelectOwner={(owner) =>
                    setFormData((prev) => ({ ...prev, owner }))
                }
            />

            <div className={styles.buttonWrap}>
                <button type="submit" className="secondary form-button">
                    {buttonText}
                </button>
            </div>
        </form>
    );
}
