export const SearchFieldRouteChange = (schoolMartialArts, addressData, push, country, state, city) => {

    if (schoolMartialArts?.type === "MartialArts") {
        push(`/martial-art/${schoolMartialArts?.value}`);
    } else if (schoolMartialArts?.type === "SchoolName") {
        push(`/${schoolMartialArts?.value}`);
    } else if (addressData?.type === "Address") {
        push(`/location/${country}/${state}/${city}`);
    } else if (
        schoolMartialArts?.type === "SchoolName" &&
        addressData?.type === "Address"
    ) {
        push(`/${schoolMartialArts?.value}`);
    } else if (
        schoolMartialArts?.type === "MartialArts" &&
        addressData?.type === "Address"
    ) {
        push(`/martial-art/${schoolMartialArts?.value}`);
    }
}