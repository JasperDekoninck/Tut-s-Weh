import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView, Image } from 'react-native';
import { PainScaleContext } from '../../context/PainScaleContext';
import { CATEGORIES, PainScaleData } from '../../services/PainScaleData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SecondaryColor } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons'; 
import styles from './Individual.styles';
import { FontAwesome } from '@expo/vector-icons'; 
import { setOpacity, calculateThumbColor } from '../../utils/PainScaleUtils';
import CustomCircularProgress from '../Small/circularProgress';


/**
 * Formats an ISO string into a localized date format.
 * @param {string} isoString - The ISO string representing the date.
 * @returns {string} The formatted date string.
 */
function formatDate(isoString) {
    const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const monthsOfYear = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const date = new Date(isoString);
    const day = daysOfWeek[date.getDay()];
    const dateOfMonth = String(date.getDate()).padStart(2, '0');
    const month = monthsOfYear[date.getMonth()];
    const year = date.getUTCFullYear();
    return `${day}, ${dateOfMonth} ${month} ${year}`;
}

/**
 * Formats the given ISO string into a time format (HH:mm).
 * @param {string} isoString - The ISO string representing the date and time.
 * @returns {string} The formatted time string.
 */
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

/**
 * Represents a component for displaying individual history entries.
 *
 * @component
 * @returns {JSX.Element} JSX element representing the HistoryIndividual component.
 */
const HistoryIndividual = () => {
    const { history, deleteFromHistory } = React.useContext(PainScaleContext);
    
    const scales = PainScaleData;
    // filter history by only selecting the ones where scale_id is the id of a valid scale
    const onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [displayScaleList, setDisplayScaleList] = useState(false);
    const [displayCategoryList, setDisplayCategoryList] = useState(false);

    /**
     * Displays a numerical answer with a circular progress bar and corresponding text.
     * @param {number} answer - The numerical answer value.
     * @param {object} scale - The scale object containing scaleMinText, scaleMidText, and scaleMaxText.
     * @returns {JSX.Element} - The JSX element representing the numerical answer display.
     */
    function DisplayNumericalAnswer(answer, scale) {
        let opacity = setOpacity(answer, scale);
        let color = calculateThumbColor(answer, scale);
        // copy the normalized value

        return (
            <View style={styles.numericalStyleContainer}>
                <View style={styles.numericalStyle}>
                    <View style={styles.circularProgressStyle}>
                        <CustomCircularProgress value={answer} color={color} scale={scale} radius={40}/>
                    </View>
                
            
                    <View style={styles.numericalText}>
                        <Text style={{ opacity: opacity[0], marginBottom: 5 }}>{scale.scaleMinText}</Text>
                        <Text style={{ opacity: opacity[1], marginBottom: 5 }}>{scale.scaleMidText}</Text>
                        <Text style={{ opacity: opacity[2] }}>{scale.scaleMaxText}</Text>
                    </View>
                </View>
            </View>
            
            );
    }

    /**
     * Displays the categorical answer along with the associated image and text.
     * @param {string} answer - The id of the selected option.
     * @param {object} scale - The scale object containing the options.
     * @returns {JSX.Element} - The JSX element displaying the image and text.
     */
    function DisplayCategoricalAnswer(answer, scale) {
        let option = scale.options.find(option => option.id === answer);
        return (
            <View style={styles.optionContent}>
                <Image source={option.image} style={styles.optionImage}/>
                <Text style={styles.optionText}>{option.text}</Text>
            </View>
        )
    }

    /**
     * Displays the answer based on the given scale type.
     * 
     * @param {any} answer - The answer to be displayed.
     * @param {object} scale - The scale object containing the scale type.
     * @returns {any} The displayed answer.
     */
    function displayAnswer(answer, scale) {
        if (scale.type === "numerical") {
            return DisplayNumericalAnswer(answer, scale);
        } else {
            return DisplayCategoricalAnswer(answer, scale);
        }
    }

    // DisplayCategoricalAnswer = React.memo(DisplayCategoricalAnswer);

    useEffect(() => {
        if (selectedDate !== null) {
            scrollToSelectedDate();
        }
        
    }, [selectedDate]);

    const flatListRef = useRef();

    /**
     * Scrolls to the lowest date higher than the currently selected date.
     */
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

    /**
     * Handles the confirmation of a selected date.
     * @param {Date} date - The selected date.
     * @returns {void}
     */
    const handleConfirmDate = (date) => {
        setDatePickerVisibility(false);
        setSelectedDate(date);
    };

    /**
     * Deletes an entry from the history.
     * @param {number} id - The ID of the entry to be deleted.
     */
    const handleDelete = (id) => {
        const entryToDelete = filteredHistory[id];
        Alert.alert(
            'Eintrag löschen',
            'Bist du sicher, dass du diesen Eintrag löschen willst?',
            [
                {
                    text: 'Abbrechen',
                    style: 'abbrechen',
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

    /**
     * Sets the selected scale and updates the state accordingly.
     * @param {number} scale_id - The ID of the selected scale.
     */
    const handleSetSelectedScale = (scale_id) => {
        setSelectedCategory(null);
        setSelectedScale(scale_id);
        setDisplayScaleList(false);
    };

    /**
     * Sets the selected category and updates the display accordingly.
     * @param {string} category - The category to be selected.
     * @returns {void}
     */
    const handleSetSelectedCategory = (category) => {
        // set selected scale to all
        setSelectedScale(null);
        setSelectedCategory(category);
        setDisplayCategoryList(false);
    };

    const [filteredHistory, setFilteredHistory] = useState(onlyCorrectHistory);

    // filter the history based on the selected scale and category
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

    let scaleItems = scales.map(scale => ({ label: scale.name, value: scale.id }));
    scaleItems.unshift({ label: "Alle", value: null });
    // make sure the all scales comes first

    // CATEGORIES is a dictionary, so we need to convert it to an array

    let categoryItems = Object.keys(CATEGORIES).map(key => ({ label: CATEGORIES[key], value: CATEGORIES[key] }));
    categoryItems.unshift({ label: "Alle", value: null });

    if (displayScaleList) { // if displayScaleList is true, display the list of scales
        return <ScrollView>
            {scaleItems.map(scale => (
                    <TouchableOpacity 
                        style={styles.scale_category_button} 
                        key={scale.value} 
                        onPress={() => handleSetSelectedScale(scale.value)}  
                    >   
                        <View style={styles.scale_view}>
                            <Text style={styles.scale_label}>{scale.label}</Text>
                            {selectedScale === scale.value && (
                            <FontAwesome name="check" size={30} color={SecondaryColor} />
                            )}
                        </View>
                    </TouchableOpacity>
                    ))
            }
        </ScrollView>
    } else if (displayCategoryList) { // if displayCategoryList is true, display the list of categories
        return <ScrollView>
            {categoryItems.map(scale => (
                    <TouchableOpacity 
                        style={styles.scale_category_button} 
                        key={scale.value} 
                        onPress={() => handleSetSelectedCategory(scale.value)}  
                    >   
                        <View style={styles.scale_view}>
                            <Text style={styles.scale_label}>{scale.label}</Text>
                            {selectedCategory === scale.value && (
                            <FontAwesome name="check" size={30} color={SecondaryColor} />
                            )}
                        </View>
                    </TouchableOpacity>
                    ))
            }
        </ScrollView>
    } else { // show all the answers
        return <View style={styles.container}>
                <View style={styles.form}>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateSelector}>
                        <Text style={styles.dataSelectorText}>Datum</Text>
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

                    <TouchableOpacity onPress={() => setDisplayScaleList(true)} style={styles.dateSelector}>
                        <Text style={styles.dataSelectorText}>Skala</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setDisplayCategoryList(true)} style={styles.dateSelector}>
                        <Text style={styles.dataSelectorText}>Kategorie</Text>
                    </TouchableOpacity>

                </View>

                <FlatList
                    ref={flatListRef}
                    data={filteredHistory}
                    style={styles.flatListStyle}
                    keyExtractor={item => item.id}
                    removeClippedSubviews
                    maxToRenderPerBatch={6}
                    initialNumToRender={5}
                    windowSize={6}
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
                                        {displayAnswer(item.answer, scale)}
                                    </View>
                                    <TouchableOpacity style={styles.iconContainer} onPress={() => handleDelete(index)}>
                                        <Icon name="close" size={35} color="red" style={styles.bin}/>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        ) : null;
                    }}
                />
            </View>
    }
}

export default HistoryIndividual;