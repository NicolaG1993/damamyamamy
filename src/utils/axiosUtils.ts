import axios from "axios";

// This utility function handles Axios errors, allowing the passing of a default message and handling custom error details.
export const handleAxiosError = (err: Error): string => {
    // Start with the default message
    const defaultMessage = "Errore imprevisto, contattare sviluppatore";
    let errorMessage = defaultMessage;

    console.log("err: ", err);

    if (axios.isAxiosError(err)) {
        // If the error is an Axios error, handle it
        console.error("Error:", err.response?.data.message || err.message);

        // Look for specific error messages in the response
        if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
        } else if (err.message) {
            // If no response message, fall back to the generic message
            errorMessage = err.message;
        }
    } else {
        // Handle non-Axios errors (unexpected errors)
        console.error("Unexpected error:", err);
    }

    return errorMessage;
};
