interface IWithDefaultValueParams {
    ogValue: unknown;
    assignValue: unknown;
    condition: (ogValue: unknown) => boolean;
}

export const cn = (...args: (string | boolean | undefined)[]): string => {
    return args.filter((item) => !!item).join(' ');
};

export const isEmpty = (value: unknown): boolean => {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') return !String(value).trim();
    if (typeof value === 'number') return false;
    if (Array.isArray(value)) return !value.length;
    if (typeof value === 'object') return !Object.keys(Object(value)).length;
    return !value;
};

export const withDefaultValue = ({
    ogValue,
    assignValue,
    condition,
}: IWithDefaultValueParams): unknown => {
    if (condition(ogValue)) return assignValue;
    return ogValue;
};
