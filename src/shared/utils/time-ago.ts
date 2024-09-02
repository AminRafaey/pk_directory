import dayjs from "dayjs";

export const timeAgo = (date) => {
    const now = dayjs();
    const created = dayjs(date);
    const diff = now.diff(created, 'month');

    if (diff >= 12) {
        const years = Math.floor(diff / 12);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (diff > 0) {
        return `${diff} ${diff === 1 ? 'month' : 'months'} ago`;
    } else {
        return 'just now';
    }
}