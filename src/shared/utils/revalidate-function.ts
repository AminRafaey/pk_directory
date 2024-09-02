
export const RevalidateFunction = async (data, pageRoute, res) => {
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        const pathToRevalidate = batch.map((item) => `/${item.slug}/${pageRoute}`);
        // @ts-ignore
        await res.revalidate(...pathToRevalidate);
    }
    res.send({ revalidated: true });
}