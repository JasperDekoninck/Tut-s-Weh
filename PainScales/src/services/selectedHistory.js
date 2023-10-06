import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLastSelectedHistory = async (history_page) => {
    try {
        await AsyncStorage.setItem("selected_history_page", history_page);
    } catch (e) {
        console.log("Error in setting category id: " + e);
    }
}

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