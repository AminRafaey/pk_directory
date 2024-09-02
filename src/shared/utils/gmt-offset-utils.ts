export const getTimeWithGMTOffset = (gmtOffset: number): Date => {
    const gmtDateTime = new Date();
    const currentOffset = gmtOffset / 100 + new Date().getTimezoneOffset() / 60;
    const schoolLocalTime = new Date(
        gmtDateTime.getTime() + currentOffset * 60 * 60 * 1000,
    );

    return schoolLocalTime;
};
