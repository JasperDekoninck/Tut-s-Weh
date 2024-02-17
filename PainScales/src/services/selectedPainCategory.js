import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sets the last selected pain category ID in AsyncStorage.
 * 
 * @param {string} category_id - The ID of the selected pain category.
 * @returns {Promise<void>} - A promise that resolves when the category ID is successfully set.
 */
export const setLastSelectedCategoryId = async (category_id) => {
    try {
        await AsyncStorage.setItem("selected_pain_category", category_id);
    } catch (e) {
        console.log("Error in setting category id: " + e);
    }
}

/**
 * Retrieves the last selected pain category ID from AsyncStorage.
 * @returns {Promise<string|null>} The last selected pain category ID, or null if not found.
 */
export const getLastSelectedCategoryId = async () => {
    try {
        const value = await AsyncStorage.getItem("selected_pain_category");
        if (value != null) {
            return value;
        }
    } catch (e) {
        console.log("Error in getting category id: " + e);
    }
    return null;
}