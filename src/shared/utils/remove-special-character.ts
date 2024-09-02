export const RemoveSpecialCharacterAndSpace = (data) => {
    return  `${data?.city
        ?.trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")} , ${data?.state
            ?.trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")} , ${data?.country
                ?.trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}`;
}