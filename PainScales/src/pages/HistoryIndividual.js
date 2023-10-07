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
import CircularProgress from 'react-native-circular-progress-indicator';
import { setOpacity, calculateThumbColor } from '../utils/PainScaleUtils';

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

const HistoryIndividual = () => {

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

    const [displayScaleList, setDisplayScaleList] = useState(false);
    const [displayCategoryList, setDisplayCategoryList] = useState(false);

    // initialize dict of normalized values for each scale
    const [normalizedValues, setNormalizedValues] = useState({})

    const displayNumericalAnswer = (answer, item_id, scale) => {
        let opacity = setOpacity(answer, scale);
        let color = calculateThumbColor(answer, scale)
        // copy the normalized value

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.circularProgressStyle}>
                    <CircularProgress
                        value={(answer-scale.scaleMin) / (scale.scaleMax-scale.scaleMin) * 100}
                        maxValue={100}
                        duration={0}
                        
                        showProgressValue={false}
                        title={answer.toString()}
                        inActiveStrokeColor={color}
                        inActiveStrokeOpacity={0.2}
                        titleColor={"black"}
                        titleFontSize={20}
                        titleStyle={{fontWeight: 'bold'}}
                        activeStrokeColor={color}
                        radius={40}
                />
                </View>
              
        
              <View style={styles.numericalText}>
                <Text style={{ opacity: opacity[0], marginBottom: 5 }}>{scale.scaleMinText}</Text>
                <Text style={{ opacity: opacity[1], marginBottom: 5 }}>{scale.scaleMidText}</Text>
                <Text style={{ opacity: opacity[2] }}>{scale.scaleMaxText}</Text>
              </View>
            </View>
            );
    }

    const displayCategoricalAnswer = (answer, item_id, scale) => {
        // display the image associated with the answer (which is the id of the option) next to the text associated with the option
        let option = scale.options.find(option => option.id === answer);
        return (
            <View style={styles.optionContent}>
                <Image source={option.image} style={styles.optionImage}/>
                <Text style={styles.optionText}>{option.text}</Text>
            </View>
        )
    }
                

    const displayAnswer = (answer, item_id, scale) => {
        if (scale.type === "numerical") {
            return displayNumericalAnswer(answer, item_id, scale);
        } else if (scale.type === "categorical") {
            return displayCategoricalAnswer(answer, item_id, scale);
        }
    }

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

    const handleSetSelectedScale = (scale_id) => {
        setSelectedScale(scale_id);
        setDisplayScaleList(false);
    };

    const handleSetSelectedCategory = (category) => {
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
    scaleItems.unshift({ label: "All", value: null });
    // make sure the all scales comes first

    // CATEGORIES is a dictionary, so we need to convert it to an array

    let categoryItems = Object.keys(CATEGORIES).map(key => ({ label: CATEGORIES[key], value: CATEGORIES[key] }));
    categoryItems.unshift({ label: "All", value: null });

    if (displayScaleList) {
        return <ScrollView>
            {scaleItems.map(scale => (
                    <TouchableOpacity 
                        style={styles.scale_category_button} 
                        key={scale.value} 
                        onPress={() => handleSetSelectedScale(scale.value)}  
                    >
                        <Text>{scale.label}</Text>
                        {selectedScale === scale.value && (
                        <FontAwesome name="check" size={20} color={SecondaryColor} />
                        )}
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
                        <Text>{scale.label}</Text>
                        {selectedCategory === scale.value && (
                        <FontAwesome name="check" size={20} color={SecondaryColor} />
                        )}
                    </TouchableOpacity>
                    ))
            }
        </ScrollView>
    } else {
        return <View style={{flex : 1}}>
                <View style={styles.form}>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateSelector}>
                        <Text style={styles.dataSelectorText}> Set Date</Text>
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
                        <Text style={styles.dataSelectorText}> Set Scale</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setDisplayCategoryList(true)} style={styles.dateSelector}>
                        <Text style={styles.dataSelectorText}> Set Category</Text>
                    </TouchableOpacity>

                </View>

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
                                        
                                        {displayAnswer(item.answer, item.id, scale)}
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
    }
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

export default HistoryIndividual;