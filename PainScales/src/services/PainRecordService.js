import AsyncStorage from '@react-native-async-storage/async-storage';

// Store pain records with AsyncStorage as stringified json
export const storePainRecord = async (painRecord) => {
    try {
        const jsonValue = JSON.stringify(painRecord)
        await AsyncStorage.setItem('@painRecord', jsonValue)
    } catch (e) {
        // saving error
        console.error(e);
    }
}

// Get pain record
export const getPainRecords = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@painRecord')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.error(e);
    }
}