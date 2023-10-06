import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView, Image } from 'react-native';
import { PainScaleContext } from '../context/PainScaleContext';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import {PrimaryColor, SecondaryColor} from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Svg, Circle, G } from 'react-native-svg';
import CircularProgress from 'react-native-circular-progress-indicator';

const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;


function formatDate(isoString) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    const date = new Date(isoString);
    const day = daysOfWeek[date.getUTCDay()];
    const dateOfMonth = String(date.getUTCDate()).padStart(2, '0');
    const month = monthsOfYear[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day}, ${dateOfMonth} ${month} ${year}`;
}

function formatTime(isoString) {
    const date = new Date(isoString);
    let hour = '' + date.getHours();
    let minute = '' + date.getMinutes();
    if (hour.length < 2) 
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;
    return [hour, minute].join(':');
}

const HistoryCombined = () => {
    return (
        <View>
          <Text>Combined Page</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
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
        marginLeft: 20,
        marginBottom: 10,
        width: "30%"
    },
    numericalText: {
        width: "70%",
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
        color: "white"
    },
    dropdownpicker: {
        width: 150,
        height: 20
    },
    dateText: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    entryWrapper: {
        
    },
    smallDate: {
        color: SecondaryColor,
        textAlign: 'center',
        fontSize: 11,
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
        height: 30
    },
    title: {
        fontWeight: "bold",
        color: SecondaryColor,
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 18,
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
        height: 60,
        resizeMode: 'contain',
    },

    optionText: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default HistoryCombined;