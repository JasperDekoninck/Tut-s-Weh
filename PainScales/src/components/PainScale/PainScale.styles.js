import { StyleSheet } from 'react-native';
import { SecondaryColor } from '../../utils/Constants';
import { Dimensions } from 'react-native'

const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;

const imageWidth = Math.min(vh * 0.1, vw * 0.2);

const widthContainer = vw * 0.4;
const heightContainer = 0.18 * vh;

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingLeft: 10,
        paddingRight: 10,
        maxHeight: "90%",
        minHeight: "90%",
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
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
        width: widthContainer,
        height: heightContainer,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },

    selectedOption: {
        width: widthContainer,
        height: heightContainer,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SecondaryColor,
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },

    optionContent: {
        alignItems: 'center',
    },

    optionImage: {
        width: imageWidth,
        height: imageWidth,
        resizeMode: 'contain',
        marginBottom: 10,
    },

    optionText: {
        fontSize: 20,
        textAlign: 'center',
    },

})