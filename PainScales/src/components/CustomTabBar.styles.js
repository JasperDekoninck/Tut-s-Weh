import { StyleSheet } from 'react-native';
import { PrimaryColor, SecondaryColor } from '../utils/Constants';

export default StyleSheet.create({
    tabBarStyle: {
        backgroundColor: PrimaryColor, 
        height: 50
    },
    tabBarIndicatorContainerStyle: {
        backgroundColor: PrimaryColor
    },
    tabBarIndicatorStyle: { 
        backgroundColor: SecondaryColor, 
        height: 3 
    }
});