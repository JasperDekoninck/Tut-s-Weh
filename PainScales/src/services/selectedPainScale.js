import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLastSelectedScaleId = async (category, scaleId) => {
    try {
        await AsyncStorage.setItem("selected_pain_scale_" + category, scaleId);
    } catch (e) {
        console.log("Error in setting scale id: " + e);
    }
}

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