import { StyleSheet } from 'react-native';
import { SecondaryColor } from '../../utils/Constants';

export default StyleSheet.create({
    optionCount: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    percentage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: SecondaryColor,
    },
    optionList: {
        flex: 1,
        justifyContent: 'center',
        
        alignItems: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },
    numericalStats: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-end',

    },
    circularProgressStyle: {
        marginHorizontal: 5,
        marginBottom: 10,
        width: "30%",
        alignItems: "center",
        flexDirection: 'column',
    },
    numericalText: {
        width: "70%",
        // center text vertically
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: SecondaryColor,
        textAlign: 'center',
        fontSize: 16,
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
        width: 150,
        fontSize: 17,
        textAlign: 'center',
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        overflow: 'hidden',
    },
    title: {
        fontWeight: "bold",
        color: SecondaryColor,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        padding: 10
    },
    optionImage: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
    },

    optionText: {
        fontSize: 16,
        width: 180,
        height: 65,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    numericalTextTitle: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
    },
});