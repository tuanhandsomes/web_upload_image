// src/utils/storage.js

export const getData = (key, defaultValue = []) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (err) {
        console.error("Error reading LocalStorage:", err);
        return defaultValue;
    }
};

export const saveData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error("Error saving LocalStorage:", err);
        throw err;
    }
};
