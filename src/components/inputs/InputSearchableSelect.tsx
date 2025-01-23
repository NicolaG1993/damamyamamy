import { useState } from "react";
// import axios from "axios";
import styles from "./InputSearchableSelect.module.css";
import { Option, OptionResponse } from "@/types/form";
import { getInputOptions } from "@/services/form";

interface InputSearchableSelectProps {
    label: string;
    selected: Option[] | Option | null;
    onAdd: (option: Option) => void;
    onRemove?: (option: Option) => void;
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
            const response: OptionResponse = await getInputOptions(term, label);

            setSuggestions(response.options);
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

    const handleRemove = (option: Option) => {
        if (onRemove) {
            onRemove(option);
        }
    };

    const renderSelectedItems = () => {
        if (allowMultiple && Array.isArray(selected)) {
            return (
                <ul className={styles.selectedList}>
                    {selected.map((option) => (
                        <li key={option.id}>
                            {option.name}{" "}
                            {onRemove && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(option)}
                                >
                                    Rimuovi
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            );
        } else if (!allowMultiple && selected) {
            return (
                <p className={styles.selected}>
                    Selezionato: <strong>{(selected as Option).name}</strong>
                </p>
            );
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <label>{label}</label>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={`Search or add ${label.toLowerCase()}`}
            />
            <ul className={styles.suggestions}>
                {suggestions.map((option) => (
                    <li key={option.id} onClick={() => handleAdd(option)}>
                        {option.name}
                    </li>
                ))}
            </ul>
            {renderSelectedItems()}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
