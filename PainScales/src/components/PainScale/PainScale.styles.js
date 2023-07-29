import { StyleSheet } from 'react-native';
import { SecondaryColor } from '../../utils/Constants';
import { Dimensions } from 'react-native'

const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        maxHeight: "90%",
        minHeight: "90%",
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_button: {
        backgroundColor: SecondaryColor,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        overflow: 'hidden',
        paddingLeft: 20,
        paddingRight: 20,
        color: "white"
    },
    scaleContainer: {
        flexDirection: 'row',
        minHeight: "70%",
    },

    scaleTextContainer: {
        justifyContent: 'space-between',
        height: "80%",
        position: "absolute",
        textAlign: 'center',
        top: 0.03 * vh,
        left: 0.3 * vw,
        width: 0.6 * vw
    },
          
    slider: {
        width: 0.25 * vh, 
        transform: [{scale: 2}, { rotate: '90deg'}],
        padding: 0,
        margin: 0,
        position: "absolute",
        top: 0.25 * vh,
        left:  -0.125 * vh + 0.2 * vw
    },
    
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: "80%",
    },
    
    option: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        margin: 5,
        borderRadius: 5,
    },

    selectedOption: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SecondaryColor,
        margin: 5,
        borderRadius: 5,
    },

    optionContent: {
        alignItems: 'center',
    },

    optionImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },

    optionText: {
        fontSize: 20,
        textAlign: 'center',
    },

})