export const convertPhoneNumberForWhatsApp = (phoneNumber?: any) => {
    const cleanedNumber = phoneNumber?.replace(/\D/g, '');
    return cleanedNumber;
}