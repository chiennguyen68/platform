export const upperCaseFirstLetter = (str: string): string => {
    if (!str || !str.length) return '';
    return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
};

export const randomString = (length: number): string => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
};
