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
import CustomCircularProgress from './circularProgress';


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

const HistoryIndividual = () => {
    const { history, deleteFromHistory } = React.useContext(PainScaleContext);
    
    const scales = PainScaleData;
    // filter history by only selecting the ones where scale_id is the id of a valid scale
    const onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [displayScaleList, setDisplayScaleList] = useState(false);
    const [displayCategoryList, setDisplayCategoryList] = useState(false);

    const { addToHistory } = React.useContext(PainScaleContext);

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

    // DisplayNumericalAnswer = React.memo(DisplayNumericalAnswer);

    function DisplayCategoricalAnswer(answer, scale) {
        // display the image associated with the answer (which is the id of the option) next to the text associated with the option
        let option = scale.options.find(option => option.id === answer);
        return (
            <View style={styles.optionContent}>
                <Image source={option.image} style={styles.optionImage}/>
                <Text style={styles.optionText}>{option.text}</Text>
            </View>
        )
    }

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

    const handleSetSelectedScale = (scale_id) => {
        setSelectedCategory(null);
        setSelectedScale(scale_id);
        setDisplayScaleList(false);
    };

    const handleSetSelectedCategory = (category) => {
        // set selected scale to all
        setSelectedScale(null);
        setSelectedCategory(category);
        setDisplayCategoryList(false);
    };

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

    let scaleItems = scales.map(scale => ({ label: scale.name, value: scale.id }));
    scaleItems.unshift({ label: "Alle", value: null });
    // make sure the all scales comes first

    // CATEGORIES is a dictionary, so we need to convert it to an array

    let categoryItems = Object.keys(CATEGORIES).map(key => ({ label: CATEGORIES[key], value: CATEGORIES[key] }));
    categoryItems.unshift({ label: "Alle", value: null });

    if (displayScaleList) {
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
    } else if (displayCategoryList) {
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
    } else {
        return <View style={{flex : 1}}>
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