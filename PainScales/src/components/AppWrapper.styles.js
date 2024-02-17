import { PrimaryColor } from '../utils/Constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: '100%',
    },
    header: {
        backgroundColor: PrimaryColor,
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
});