import { StyleSheet } from 'react-native';
import { PrimaryColor, SecondaryColor } from '../utils/Constants';

export default StyleSheet.create({
    tabBarRenderStyle: { 
        paddingLeft: 10, 
        fontSize: 17, 
        paddingRight: 10, 
        paddingTop: 5, 
        paddingBottom: 5, 
        borderRadius: 20, 
        overflow: 'hidden', 
        marginLeft: -8, 
        marginRight:-8, 
        fontWeight: 500
    },
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
    },
    FlashMessageStyle: {
        marginTop: 50, 
        paddingTop: 10, 
        paddingBottom: 10
    },
    title: {
        fontSize: 19
    }
    });