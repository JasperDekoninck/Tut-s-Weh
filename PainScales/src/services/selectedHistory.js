import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sets the last selected history page in AsyncStorage.
 * @param {string} history_page - The history page to be set.
 * @returns {Promise<void>} - A promise that resolves when the history page is set.
 */
export const setLastSelectedHistory = async (history_page) => {
    try {
        await AsyncStorage.setItem("selected_history_page", history_page);
    } catch (e) {
        console.log("Error in setting category id: " + e);
    }
}

/**
 * Retrieves the last selected history page from AsyncStorage.
 * @returns {Promise<string|null>} The last selected history page, or null if not found.
 */
export const getLastSelectedHistory = async () => {
    try {
        const value = await AsyncStorage.getItem("selected_history_page");
        if (value != null) {
            return value;
        }
    } catch (e) {
        console.log("Error in getting category id: " + e);
    }
    return null;
}