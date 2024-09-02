export const separateCityStateCountry=(inputString) => {
    const parts = inputString?.split("|");

    // Ensure that there are at least three parts (country, state, and city)
    if (parts?.length >= 3) {
        const country = parts[0] === "%" ? "" : parts[0];
        const state = parts[1] === "%" ? "" : parts[1];
        const city = parts[2] === "%" ? "" : parts[2];

        return {
            country,
            state,
            city,
        };
    } else {
        return {
            country: "",
            state: "",
            city: "",
        };
    }
}