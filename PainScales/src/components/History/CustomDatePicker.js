import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './CustomDatePicker.styles';

const CustomDatePicker = ({ label, date, setDateVisibility, isVisible, onConfirm }) => {
    /**
     * Formats the given ISO string into a dd/mm/yyyy format.
     * @param {string} isoString - The ISO string representing a date.
     * @returns {string} The formatted date string in dd/mm/yyyy format.
     */
    function formatDate(isoString) {
        // format as dd/mm/yyyy
        const date = new Date(isoString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        // make sure to add a 0 in front of the day and month if they are only 1 digit
        return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
    }

    return (
        <View>
        <TouchableOpacity onPress={() => setDateVisibility(true)} style={styles.dateSelector}>
            <Text style={styles.dataSelectorText}>{label}: {formatDate(date)}</Text>
        </TouchableOpacity>
        {isVisible && (
            <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
                setDateVisibility(false); // Assuming you want to hide the picker on date selection
                onConfirm(selectedDate);
            }}
            />
        )}
        </View>
  );
};


export default CustomDatePicker;