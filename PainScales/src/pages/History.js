import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { PainScaleContext } from '../context/PainScaleContext';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import {PrimaryColor, SecondaryColor} from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons'; 

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

const History = () => {

    // const { addToHistory } = React.useContext(PainScaleContext);
    // React.useEffect(() => {
    //     addToHistory({
    //         date: new Date("2023-06-06T00:00:00.000Z"),
    //         scale_id: "1",
    //         answer: 5,
    //     });
    //     addToHistory({
    //         date: new Date("2023-06-07T00:00:00.000Z"),
    //         scale_id: "1",
    //         answer: 5,
    //     });
    // }
    // , []);


    const { history, deleteFromHistory } = React.useContext(PainScaleContext);
    
    const scales = PainScaleData;
    // filter history by only selecting the ones where scale_id is the id of a valid scale
    const onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (selectedDate !== null) {
            scrollToSelectedDate();
        }
        
    }, [selectedDate]);

    const flatListRef = useRef();

    const scrollToSelectedDate = () => {
        // get the ref of the item to scroll to, which is the lowest date higher than the currently selected date.
        const existingDates = filteredHistory.map(item => item.date);
        const existingIndices = filteredHistory.map((item, index) => index);
        const sortedDates = existingIndices.sort((a, b) => {
            const dateA = new Date(existingDates[a]);
            const dateB = new Date(existingDates[b]);
            return dateA - dateB;
        });

        const index = sortedDates.find(date => new Date(existingDates[date]) > selectedDate);
        if (index) {
            const actualIndex = existingDates.findIndex(date => formatDate(date) === formatDate(existingDates[index]));
            flatListRef.current.scrollToIndex({ index: actualIndex, animated: true });
        }
        
    };

    const handleConfirmDate = (date) => {
        setDatePickerVisibility(false);
        setSelectedDate(date);
    };

    const handleDelete = (id) => {
        const entryToDelete = filteredHistory[id];
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => {
                    
                    const newData = [...filteredHistory];
                    newData.splice(id, 1);
                    setFilteredHistory(newData);
                    deleteFromHistory(entryToDelete);
                }},
            ],
            { cancelable: true },
        );
    };


    const [selectedScale, setSelectedScale] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [filteredHistory, setFilteredHistory] = useState(onlyCorrectHistory);

    useEffect(() => {
        let newHistory = [...onlyCorrectHistory];
        if (selectedScale !== null) {
          newHistory = newHistory.filter(item => item.scale_id === selectedScale)
        }
        if (selectedCategory !== null) {
            newHistory = newHistory.filter(item => scales.find(scale => scale.id === item.scale_id).category === selectedCategory)
        }
        
        newHistory = newHistory.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        setFilteredHistory(newHistory);

    }, [history, selectedScale, selectedCategory]);

    const [open, setOpen] = useState(false);
    let scaleItems = scales.map(scale => ({ label: scale.name, value: scale.id }));
    scaleItems.push({ label: "All", value: null });
    // CATEGORIES is a dictionary, so we need to convert it to an array

    let categoryItems = Object.keys(CATEGORIES).map(key => ({ label: CATEGORIES[key], value: CATEGORIES[key] }));
    categoryItems.push({ label: "All", value: null });

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <Text>Select a date</Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => handleConfirmDate(date)}
                />
            )}

            <DropDownPicker
                items={scaleItems}
                value={selectedScale}
                defaultValue={selectedScale}
                containerStyle={{height: 40}}
                style={{backgroundColor: 'white'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: 'white'}}
                setValue={setSelectedScale}
                open={open}
                setOpen={setOpen}
                placeholder="Select a scale"
                zIndex={9999}
            />

            <DropDownPicker
                items={categoryItems}
                value={selectedCategory}
                defaultValue={selectedCategory}
                containerStyle={{height: 40}}
                style={{backgroundColor: 'white'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: 'white'}}
                setValue={setSelectedCategory}
                open={open}
                setOpen={setOpen}
                placeholder="Select a category"
                zIndex={9999}
            />

            <FlatList
                ref={flatListRef}
                data={filteredHistory}
                style={styles.flatListStyle}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    const scale = scales.find(scale => scale.id === item.scale_id);
                    const date = formatDate(item.date);
                    const time = formatTime(item.date);
                    let isNewDate = false;
                    if (index == 0) {
                        isNewDate = true;
                    } else {
                        const oldDate = formatDate(filteredHistory[index - 1].date);
                        isNewDate = (date != oldDate);
                    }
                    
                    return scale ? (
                        <View style={styles.entryWrapper} key={index}>
                                {isNewDate && 
                            <View style={styles.dateContainer}>
                                <View style={styles.line}/>
                                <Text style={styles.dateText}>{date}</Text>
                                <View style={styles.line}/>
                            </View>}
                            <View style={styles.card}>
                                <View style={styles.leftCard}>
                                    <View style={styles.header}>
                                        <Text style={styles.smallDate}>{time}</Text>
                                        <Text style={styles.title}>{scale.question}</Text>
                                    </View>
                                    
                                    <Text style={styles.text}>Answer: {item.answer}</Text>
                                </View>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => handleDelete(index)}>
                                    <Icon name="close" size={20} color="red" style={styles.bin}/>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    ) : null;
                }}
            />
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
    line: {
        flex: 1,
        height: 2,
        backgroundColor: 'lightgrey',
    },
    flatListStyle: {
        zIndex: -1
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
});

export default History;