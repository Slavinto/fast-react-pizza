export function formatCurrency(value: number) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR",
    }).format(value);
}

export function formatDate(dateStr: Date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr: Date) {
    const d1 = new Date().getTime();
    const d2 = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
}

export const isValidPhone = (str: string) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );
