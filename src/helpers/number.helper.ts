export const isNumber = (value: unknown): boolean => {
    return /^[0-9]+$/.test(String(value));
};