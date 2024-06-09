class StorageService {
    get = async (key: string): Promise<string> => {
        return new Promise((resolve) => {
            const item = localStorage.getItem(key);
            if (!item) resolve('');
            else resolve(String(item));
        });
    };

    set = async (key: string, value: string | number): Promise<void> => {
        return new Promise((resolve) => {
            localStorage.setItem(key, String(value));
            resolve();
        });
    };
}

export const storageService = new StorageService();
