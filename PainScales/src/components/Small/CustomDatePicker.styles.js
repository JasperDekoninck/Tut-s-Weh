import { StyleSheet } from 'react-native';
import { SecondaryColor } from '../../utils/Constants';

export default StyleSheet.create({
    dateSelector: {
        backgroundColor: SecondaryColor,
        color: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    dataSelectorText: {
        color: "white",
        width: 150,
        fontSize: 17,
        textAlign: 'center',
    },
});