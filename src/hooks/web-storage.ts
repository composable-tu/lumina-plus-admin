import {useEffect, useState} from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

function useWebStorage<T>(key: string, initialValue: T, storageType: StorageType = 'localStorage') {
    // 获取存储对象
    const storage = typeof window !== 'undefined' ? (storageType === 'localStorage' ? window.localStorage : window.sessionStorage) : null;

    /**
     * 初始化状态
     */
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = storage?.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading ${storageType} key "${key}":`, error);
            return initialValue;
        }
    });

    /**
     * 更新状态并保存到存储中
     * @param value 新值
     */
    const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
        try {
            // 允许值为一个函数，以便我们有相同的行为
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if (typeof window !== 'undefined' && storage) storage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting ${storageType} key "${key}":`, error);
        }
    };

    /**
     * 监听存储变化
     */
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.storageArea === storage) try {
                setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
            } catch (error) {
                console.error(`Error parsing ${storageType} key "${key}":`, error);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, initialValue, storage]);

    /**
     * 删除值
     */
    const removeValue = () => {
        try {
            if (typeof window !== 'undefined' && storage) {
                storage.removeItem(key);
                setStoredValue(initialValue);
            }
        } catch (error) {
            console.error(`Error removing ${storageType} key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue] as const;
}

/**
 * 用于 Local Storage 的 hook
 * @param key 键
 * @param initialValue 初始值
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    return useWebStorage<T>(key, initialValue, 'localStorage');
}

/**
 * 用于 Session Storage 的 hook
 * @param key 键
 * @param initialValue 初始值
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
    return useWebStorage<T>(key, initialValue, 'sessionStorage');
}

export default useWebStorage;
