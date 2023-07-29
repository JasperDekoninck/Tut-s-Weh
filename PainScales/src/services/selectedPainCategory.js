import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLastSelectedCategoryId = async (category_id) => {
    try {
        await AsyncStorage.setItem("selected_pain_category", category_id);
    } catch (e) {
        console.log("Error in setting category id: " + e);
    }
}

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