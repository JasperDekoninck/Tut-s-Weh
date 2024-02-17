import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sets the last selected scale ID for a given category in the database.
 * @param {string} category - The category of the pain scale.
 * @param {string} scaleId - The ID of the selected pain scale.
 * @returns {Promise<void>} - A promise that resolves when the scale ID is successfully set.
 */
export const setLastSelectedScaleId = async (category, scaleId) => {
    try {
        await AsyncStorage.setItem("selected_pain_scale_" + category, scaleId);
    } catch (e) {
        console.log("Error in setting scale id: " + e);
    }
}

/**
 * Retrieves the last selected scale ID for a given category in the database.
 * @param {string} category - The category of the pain scale.
 * @returns {Promise<string|null>} - The last selected scale ID, or null if not found.
 */
export const getLastSelectedScaleId = async (category) => {
    try {
        const value = await AsyncStorage.getItem("selected_pain_scale_" + category);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("Error in getting scale id: " + e);
    }
    return null;
}