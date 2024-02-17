import { StyleSheet } from 'react-native';
import { SecondaryColor } from '../../utils/Constants';

export default StyleSheet.create({
    container: {
        flex : 1
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    numericalStyle: {
        flexDirection: 'row', // Arrange the circular progress and text side by side.
        alignItems: 'center', // Center the children vertically.
    },
    numericalStyleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Add this to center horizontally.
    },
    scale_category_button : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    circularProgressStyle: {
        marginBottom: 10,
        marginRight: 20
    },
    numericalText: {
        // center text vertically
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 10,
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: 'lightgrey',
    },
    flatListStyle: {
        zIndex: -1
    },
    form: {
        flexDirection: 'row',
        marginTop: 15,
        alignContent: 'center',
        justifyContent: 'center',
    },
    dateSelector: {
        backgroundColor: SecondaryColor,
        color: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    dataSelectorText: {
        color: "white",
        width: 90,
        fontSize: 18,
        textAlign: 'center'
    },
    dateText: {
        color: '#737373',
        textAlign: 'center',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    smallDate: {
        color: SecondaryColor,
        textAlign: 'center',
        fontSize: 14,
        marginBottom: -3,
        marginTop: -3
    },
    leftCard: {
        width: "100%"
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        overflow: 'hidden',
    },
    iconContainer: {
        backgroundColor: "white",
        padding: 5,
        position: 'absolute',
        right: 0,
        top: 0,
        height: 40
    },
    title: {
        fontWeight: "bold",
        color: SecondaryColor,
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 20,
        textAlign: 'center',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        padding: 10
    },
    optionContent: {
        alignItems: 'center',
    },

    optionImage: {
        height: 100,
        resizeMode: 'contain',
    },

    optionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    scale_label: {
        fontSize: 18,
        width: '90%',
    },
    scale_view: {
        height: 45,
        paddingRight: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
    },
});