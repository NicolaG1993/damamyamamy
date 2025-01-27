import { useState } from "react";
import styles from "./InputSearchableSelect.module.css";
import { Option } from "@/types/form";
import { createOption, getInputOptions } from "@/services/form";

interface InputSearchableSelectProps {
    label: string;
    selected: Option[] | Option | null;
    onAdd: (option: Option) => void;
    onRemove?: (option?: Option) => void;
    // apiEndpoint: string;
    allowMultiple: boolean;
}

export default function InputSearchableSelect({
    label,
    selected,
    onAdd,
    onRemove,
    // apiEndpoint,
    allowMultiple,
}: InputSearchableSelectProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Option[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setSuggestions([]);
            return;
        }
        try {
            const response: Option[] = await getInputOptions(term, label);
            console.log("InputSearchableSelect response: ", response);

            setSuggestions(response);
        } catch (err) {
            setError("Failed to fetch suggestions.");
        }
    };

    const handleAdd = (option: Option) => {
        if (allowMultiple) {
            if (
                Array.isArray(selected) &&
                !selected.find((i) => i.id === option.id)
            ) {
                onAdd(option);
            }
        } else if (!selected || (selected as Option).id !== option.id) {
            onAdd(option);
        }
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleRemove = (option?: Option) => {
        if (onRemove) {
            onRemove(option);
        }
    };

    const handleNew = async (name: string) => {
        const response: Option = await createOption(name, label);
        if (response?.id) {
            handleAdd(response);
        } else {
            throw new Error("Failed to create option");
        }
    };

    const renderSelectedItems = () => {
        if (allowMultiple && Array.isArray(selected)) {
            return (
                <ul className={styles.selectedList}>
                    {selected.map((option) => (
                        <li key={option.id} className={styles.selected}>
                            <p>{option.name}</p>
                            {onRemove && (
                                <span onClick={() => handleRemove(option)}>
                                    Rimuovi
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            );
        } else if (!allowMultiple && selected) {
            return (
                <div className={styles.selected}>
                    <p>{(selected as Option).name}</p>
                    <span onClick={() => handleRemove()}>Rimuovi</span>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {!allowMultiple && selected ? (
                <></>
            ) : (
                <>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={`Cerca o crea ${label.toLowerCase()}`}
                    />
                    <ul className={styles.suggestions}>
                        {searchTerm &&
                            !suggestions.some(
                                (option) =>
                                    option.name.toLowerCase() ===
                                    searchTerm.toLowerCase()
                            ) && (
                                <li
                                    className={styles.addOption}
                                    onClick={() => handleNew(searchTerm)}
                                >{`+ Aggiungi "${searchTerm}"`}</li>
                            )}
                        {suggestions.map((option: Option) => (
                            <li
                                key={option.id}
                                onClick={() => handleAdd(option)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {renderSelectedItems()}
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
}
