import { StyleSheet } from 'react-native';
import { SecondaryColor } from '../utils/Constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        minHeight: "100%"
    },
    bottom: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    other_scales_button: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text_scales_button: {
        backgroundColor: "white",
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        overflow: 'hidden',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        color: SecondaryColor
    },
    scale_name: {
        fontSize: 18,
        marginRight: 15
    },
    scale_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: 45,
        paddingRight: 8
    },
    });