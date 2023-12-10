import { StyleSheet } from 'react-native';
import { SecondaryColor, PrimaryColor, TertiaryColor } from '../../utils/Constants';
import { Dimensions } from 'react-native'

const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;

const imageWidth = Math.min(vh * 0.24, vw * 0.4);

const widthContainer = vw * 0.47;
const heightContainer = 0.2 * vh;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
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
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 20,
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
        paddingBottom: 15,
    },
    
    option: {
        width: widthContainer,
        height: heightContainer,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
    },

    selectedOption: {
        width: widthContainer,
        height: heightContainer,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 20,
        paddingTop: 20,
        marginBottom: 5,
        backgroundColor: TertiaryColor,
        borderRadius: 10,
    },

    optionContent: {
        alignItems: 'center',
    },

    optionImage: {
        width: imageWidth + 15,
        height: imageWidth - 10,
        resizeMode: 'contain',
    },

    optionText: {
        fontSize: 20,
        textAlign: 'center',
    },

})