import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { PainScaleContext } from '../context/PainScaleContext';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import {PrimaryColor, SecondaryColor} from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { FontAwesome } from '@expo/vector-icons'; 
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
    const { history } = React.useContext(PainScaleContext);
    const scales = PainScaleData;

    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // default to last week
    const [endDate, setEndDate] = useState(new Date()); // default to today

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const handleConfirmStartDate = (date) => {
        setStartDatePickerVisibility(false);
        setStartDate(date);
    };

    const handleConfirmEndDate = (date) => {
        setEndDatePickerVisibility(false);
        setEndDate(date);
    };

    const lerpColor = (color1, color2, t) => {
        let r = color1[0] + t * (color2[0] - color1[0]);
        let g = color1[1] + t * (color2[1] - color1[1]);
        let b = color1[2] + t * (color2[2] - color1[2]);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const calculateThumbColor = (t, scale) => {
        if (t < 0.5) {
            return lerpColor(scale.startColor, scale.midColor, t*2); // lerp from startColor to midColor
        }
        else {
            return lerpColor(scale.midColor, scale.endColor, (t-0.5)*2); // lerp from midColor to endColor
        }
    }

    const setOpacity = (t, scale) => {
        let startValue = 0.1;
        let opacityMin = startValue;
        let opacityMax = startValue;
        let opacityMid = startValue;
        if (t < 0.5) {
            opacityMid += ((1 - startValue) * t * 2);
            opacityMin += ((1 - startValue) * (1 - t * 2)); 
        } else {
            opacityMax += ((1 - startValue) * (t - 0.5) * 2);
            opacityMid += ((1 - startValue) * (1 - (t - 0.5) * 2));
        }
        return [opacityMin, opacityMid, opacityMax];
    }

    const filteredHistory = history.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    const displayNumericalAnswer = (item, scale) => {
        let colorMin = calculateThumbColor((item.min-scale.scaleMin) / (scale.scaleMax-scale.scaleMin), scale);
        let colorMid = calculateThumbColor((item.mean-scale.scaleMin) / (scale.scaleMax-scale.scaleMin), scale);
        let colorMax = calculateThumbColor((item.max-scale.scaleMin) / (scale.scaleMax-scale.scaleMin), scale);
        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{scale.question}</Text>
                </View>
                <View style={styles.numericalStats}>
                    <View style={styles.circularProgressStyle}>
                        <CircularProgress
                            value={(item.min-scale.scaleMin) / (scale.scaleMax-scale.scaleMin) * 100}
                            maxValue={100}
                            duration={0}
                            showProgressValue={false}
                            title={`${item.min}`}
                            inActiveStrokeColor={colorMin}
                            inActiveStrokeOpacity={0.2}
                            titleColor={"black"}
                            titleFontSize={20}
                            titleStyle={{fontWeight: 'bold'}}
                            activeStrokeColor={colorMin}
                            radius={30}
                        />
                        <Text style={styles.numericalTextTitle}>Minimum</Text>

                        
                    
                    </View>
                    <View style={styles.circularProgressStyle}>
                        <CircularProgress
                            value={(item.mean-scale.scaleMin) / (scale.scaleMax-scale.scaleMin) * 100}
                            maxValue={100}
                            duration={0}
                            showProgressValue={false}
                            title={`${item.mean}`}
                            inActiveStrokeColor={colorMid}
                            inActiveStrokeOpacity={0.2}
                            titleColor={"black"}
                            titleFontSize={20}
                            titleStyle={{fontWeight: 'bold'}}
                            activeStrokeColor={colorMid}
                            radius={40}
                        />
                        <Text style={styles.numericalTextTitle}>Mean</Text>
                    </View>
                    <View style={styles.circularProgressStyle}>
                        <CircularProgress
                            value={(item.max-scale.scaleMin) / (scale.scaleMax-scale.scaleMin) * 100}
                            maxValue={100}
                            duration={0}
                            showProgressValue={false}
                            title={`${item.max}`}
                            inActiveStrokeColor={colorMax}
                            inActiveStrokeOpacity={0.2}
                            titleColor={"black"}
                            titleFontSize={20}
                            titleStyle={{fontWeight: 'bold'}}
                            activeStrokeColor={colorMax}
                            radius={30}
                        />
                        <Text style={styles.numericalTextTitle}>Maximum</Text>
                    </View>
                </View>
            </View>
        );
    };

    const scaleStats = scales.map(scale => {
        const scaleHistory = filteredHistory.filter(item => item.scale_id === scale.id);
        if (scale.type === "numerical") {
            const answers = scaleHistory.map(item => item.answer);
            const min = Math.min(...answers);
            const max = Math.max(...answers);
            const mean = answers.reduce((a, b) => a + b, 0) / answers.length;
            return { scale, min, mean, max };
        } else if (scale.type === "categorical") {
            const optionCounts = scale.options.map(option => {
                const count = scaleHistory.filter(item => item.answer === option.id).length;
                const percentage = count / scaleHistory.length * 100;
                return { option, count, percentage };
            });
            return { scale, optionCounts };
        }
    });

    return <View style={{flex : 1}}>
        <View style={styles.form}>
            <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)} style={styles.dateSelector}>
                <Text style={styles.dataSelectorText}> Set Start Date</Text>
            </TouchableOpacity>
            {isStartDatePickerVisible && (
                <DateTimePicker
                    value={startDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => handleConfirmStartDate(date)}
                />
            )}

            <TouchableOpacity onPress={() => setEndDatePickerVisibility(true)} style={styles.dateSelector}>
                <Text style={styles.dataSelectorText}> Set End Date</Text>
            </TouchableOpacity>
            {isEndDatePickerVisible && (
                <DateTimePicker
                    value={endDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => handleConfirmEndDate(date)}
                />
            )}
        </View>

        <FlatList
            data={scaleStats}
            style={styles.flatListStyle}
            keyExtractor={item => item.scale.id}
            renderItem={({ item }) => {
                const scale = item.scale;
                if (scale.type === "numerical") {
                    return displayNumericalAnswer(item, scale);
                } else if (scale.type === "categorical") {
                    return (
                        <View style={styles.card}>
                            <Text style={styles.title}>{scale.question}</Text>
                            {item.optionCounts.map(optionCount => (
                                <View style={styles.optionCount} key={optionCount.option.id}>
                                    <Text>{optionCount.option.text}: {optionCount.percentage}%</Text>
                                </View>
                            ))}
                        </View>
                    );
                }
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    numericalStats: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-end',

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
        flexDirection: 'column',
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
    numericalTextTitle: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
    },
});

export default HistoryCombined;