import styles from "./InputCheckbox.module.css";

interface InputCheckboxProps {
    name: string;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string; // Optional: Pass a custom label for the checkbox
}

export default function InputCheckbox({
    name,
    isChecked,
    onChange,
    label,
}: InputCheckboxProps) {
    return (
        <div className={styles["checkbox-wrapper-1"]}>
            <input
                id={name}
                name={name}
                className={styles["substituted"]}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                aria-hidden={true}
            />
            <label htmlFor={name}>{label || "Checkbox"}</label>
        </div>
    );
}
