import axios from "axios";
import { useEffect, useState } from "react";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import styles from "@/components/Forms/Form.module.css";
import { getError } from "@/utils/error";

export default function MultipleSelector({
    label,
    inputID,
    table,
    updateFormState,
    currentState,
    openSection,
    setOpenSection,
}) {
    //💚 listen to click to activate input
    //💚 fetch all table
    //💚 check if any selection exist already
    //💚 render all table (with selection if needed)
    //💚 user can choose and remove many element as needed
    //💚 user can add a new element
    //💚 handle parent state

    let userInfo = useSelector(selectUserState);

    const [inputValue, setInputValue] = useState();
    const [allOptions, setAllOptions] = useState();
    const [availableOptions, setAvailableOptions] = useState();
    const [selection, setSelection] = useState(currentState);
    const [valueIsNew, setValueIsNew] = useState(false);

    useEffect(() => {
        if (openSection === label) {
            fetchData();
        }
    }, [openSection]);

    useEffect(() => {
        // console.log("💚 allOptions:", allOptions);
        // console.log("📝 inputValue:", inputValue);
        // console.log("🧠 selection:", selection);
        selection && updateFormState(selection, label);

        if (allOptions) {
            let parsedData = allOptions;
            if (selection && selection.length) {
                // compare and remove elements already selected
                parsedData = parsedData.filter(
                    (o1) => !selection.some((o2) => o1.id === o2.id)
                );
            }
            if (inputValue && inputValue.length) {
                // search by inputValue
                let pattern = new RegExp(inputValue.toLowerCase());
                parsedData = parsedData.filter(({ name }) =>
                    pattern.test(name.toLowerCase())
                );
            }
            // console.log("🔍 parsedData:", parsedData);
            setAvailableOptions(parsedData);
        }
    }, [allOptions, inputValue, selection]);

    const fetchData = async () => {
        let { data } = await axios.get(`/api/get/all-${label}`);
        setAllOptions(data);
    };

    const handleAddNew = async () => {
        if (inputValue) {
            try {
                let { data } = await axios.post(
                    `/api/admin/new/${table}`,
                    {
                        value: inputValue,
                    },
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
                // console.log("💚 ADD NEW WORKED! ", data);
                fetchData();
                setSelection((prevState) => [...prevState, data]);
                handleInput();
            } catch (err) {
                console.log("🐞 ERROR: ", err);
                alert(getError(err));
            }
        }
    };

    const handleInput = (str) => {
        setInputValue(str);
        // check if it could be a new element for DB
        if (str) {
            let check = allOptions.filter(
                ({ name }) => name.toLowerCase() === str.toLowerCase()
            );
            if (!check.length) {
                setValueIsNew(true);
            } else {
                setValueIsNew(false);
            }
        } else {
            setValueIsNew(false);
        }
    };

    const handleSelect = (el) => {
        let newState = selection ? [...selection, el] : [el];
        setSelection(newState);
    };
    const handleDeselect = async (el) => {
        let newState = selection.filter(({ id }) => id !== el.id);
        setSelection(newState);
    };

    return (
        <>
            <div
                className={styles.input}
                onClick={() =>
                    openSection !== label
                        ? setOpenSection(label)
                        : setOpenSection()
                }
                // className={currentState.length > 0 ? "" : ""}
                style={{
                    color:
                        currentState && currentState.length > 0
                            ? "var(--colorD)"
                            : "var(--colorG)",
                }}
            >
                {currentState && currentState.length > 0
                    ? `${inputID}: ${currentState.length} selezionati`
                    : inputID}
            </div>

            {openSection === label && (
                <div className={styles.optionsWrap}>
                    <div className={styles.addNewWrap}>
                        <input
                            type="text"
                            placeholder="Cerca o crea nuovo"
                            name="new"
                            id="New"
                            onChange={(e) => handleInput(e.target.value)}
                            value={inputValue}
                        />

                        <button
                            type="button"
                            disabled={valueIsNew ? false : true}
                            className={`${
                                valueIsNew ? "button" : "button-disabled"
                            } ${styles["mini-bar-button"]}`}
                            onClick={() => handleAddNew()}
                        >
                            Aggiungi
                        </button>
                    </div>

                    <div className={styles.options}>
                        <div className={styles.column}>
                            <p>Disponibili</p>
                            {availableOptions && availableOptions.length ? (
                                availableOptions.map((el) => (
                                    <option
                                        key={label + " option " + el.id}
                                        value={el}
                                        onClick={() => handleSelect(el)}
                                    >
                                        {el.name}
                                    </option>
                                ))
                            ) : (
                                <p>Nessun risultato</p>
                            )}
                        </div>

                        <div className={styles.column}>
                            <p>Selezionati</p>
                            {selection && selection.length ? (
                                selection.map((el) => (
                                    <option
                                        key={label + " option " + el.id}
                                        value={el}
                                        onClick={() => handleDeselect(el)}
                                    >
                                        {el.name}
                                    </option>
                                ))
                            ) : (
                                <p>Nessun risultato</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
