import { isEmpty } from './utils.helper';

export const getObjectFieldByKeyChain = (
    object: Record<string, unknown>,
    key: string
): unknown => {
    const splitedKeyChain = (key || '').split('.');
    if (!splitedKeyChain.length) return undefined;

    let current: unknown = object;
    for (let i = 0; i < splitedKeyChain.length; i++) {
        const key = splitedKeyChain[i];
        current = Object(current)[key];
        if (isEmpty(current)) return undefined;
    }

    return current;
};

export const getAllKeyChainsOfObject = (
    object: Record<string, unknown>,
    isLeaf: (data: unknown) => boolean
): string[] => {
    const results: string[] = [];
    Object.keys(object).forEach((key) => {
        if (typeof object[key] !== 'object') return;
        if (isLeaf(object[key] as Record<string, unknown>)) {
            results.push(key);
            return;
        }
        const parentName: string = key;
        const childrenName = getAllKeyChainsOfObject(
            object[key] as Record<string, unknown>,
            isLeaf
        );
        childrenName.forEach((name) => {
            results.push(`${parentName}.${name}`);
        });
    });
    return results;
};
