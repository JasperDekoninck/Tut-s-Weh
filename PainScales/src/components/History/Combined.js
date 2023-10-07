import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { PainScaleContext } from '../../context/PainScaleContext';
import { CATEGORIES, PainScaleData } from '../../services/PainScaleData';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import {PrimaryColor, SecondaryColor} from '../../utils/Constants';
import { calculateThumbColor, lerpColor } from '../../utils/PainScaleUtils';
import CustomCircularProgress from './circularProgress';


function formatDate(isoString) {
    // format as dd/mm/yyyy
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // make sure to add a 0 in front of the day and month if they are only 1 digit
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
}

const HistoryCombined = () => {
    const { history } = React.useContext(PainScaleContext);
    const scales = PainScaleData;

    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // default to last week
    const [endDate, setEndDate] = useState(new Date(Date.now())); // default to today

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

    let onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));
    const [filteredHistory, setFilteredHistory] = useState(onlyCorrectHistory);

    useEffect(() => {
        onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));
        let newHistory = onlyCorrectHistory.filter(item => {
            const itemDate = new Date(item.date);
            // make sure to return true as soon as the date is correct, disregard the time
            // to do so we need to set the time to 00:00:00
            itemDate.setHours(0,0,0,0);
            startDate.setHours(0,0,0,0);
            endDate.setHours(0,0,0,0);
            return itemDate >= startDate && itemDate <= endDate;
        });

        setFilteredHistory(newHistory);

    }, [history, startDate, endDate]);

    const displayNumericalAnswer = (item, scale) => {
        let colorMin = calculateThumbColor(item.min, scale);
        let colorMid = calculateThumbColor(item.mean, scale);
        let colorMax = calculateThumbColor(item.max, scale);
        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{scale.question}</Text>
                    <Text style={styles.subtitle}>Entries: {item.totalCounts} </Text>
                </View>
                <View style={styles.numericalStats}>
                    <View style={styles.circularProgressStyle}>
                        <CustomCircularProgress value={item.min} color={colorMin} scale={scale} radius={30}/>
                        <Text style={styles.numericalTextTitle}>Minimum</Text>

                        
                    
                    </View>
                    <View style={styles.circularProgressStyle}>
                        <CustomCircularProgress value={item.mean} color={colorMid} scale={scale} radius={40}/>
                        <Text style={styles.numericalTextTitle}>Mean</Text>
                    </View>
                    <View style={styles.circularProgressStyle}>
                        <CustomCircularProgress value={item.max} color={colorMax} scale={scale} radius={30}/>
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
            const mean = Math.round(answers.reduce((a, b) => a + b, 0) / answers.length);
            const totalCounts = answers.length;
            return { scale, min, mean, max, totalCounts };
        } else if (scale.type === "categorical") {
            const optionCounts = scale.options.map(option => {
                const count = scaleHistory.filter(item => item.answer === option.id).length;
                const percentage = Math.round(count / scaleHistory.length * 100);
                // round percentage 
                return { option, count, percentage };
            });
            const totalCounts = optionCounts.reduce((a, b) => a + b.count, 0);
            return { scale, optionCounts, totalCounts};
        }
    });

    // make sure the percentage adds up to 100, if not add the difference to the highest option
    scaleStats.forEach(item => {
        if (item.scale.type === "categorical") {
            const totalPercentage = item.optionCounts.reduce((a, b) => a + b.percentage, 0);
            if (totalPercentage !== 100 && item.optionCounts.length > 0 && totalPercentage !== 0) {
                const highestPercentage = Math.max(...item.optionCounts.map(optionCount => optionCount.percentage));
                const highestOption = item.optionCounts.find(optionCount => optionCount.percentage === highestPercentage);
                if (highestOption) {
                    highestOption.percentage += 100 - totalPercentage;
                }
            }
        }
    }
    );

    // sort the scalestats by amount of entries
    scaleStats.sort((a, b) => b.totalCounts - a.totalCounts);

    return <View style={{flex : 1}}>
        <View style={styles.form}>
            <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)} style={styles.dateSelector}>
                <Text style={styles.dataSelectorText}>From: {formatDate(startDate)}</Text>
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
                <Text style={styles.dataSelectorText}>To: {formatDate(endDate)}</Text>
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
                // if scale has no history, don't display it
                if (item.scale.type === "numerical" && item.totalCounts === 0) {
                    return null;
                } else if (item.scale.type === "categorical" && item.totalCounts === 0) {
                    return null;
                }
                const scale = item.scale;
                if (scale.type === "numerical") {
                    return displayNumericalAnswer(item, scale);
                } else if (scale.type === "categorical") {
                    return (
                        <View style={styles.card}>
                            <Text style={styles.title}>{scale.question}</Text>
                            <Text style={styles.subtitle}>Entries: {item.totalCounts} </Text>
                            <FlatList
                                data={item.optionCounts}
                                style={styles.optionList}
                                numColumns={2}
                                keyExtractor={optionCount => optionCount.option.id}
                                renderItem={({ item: optionCount }) => (
                                    <View style={styles.optionCount} key={optionCount.option.id}>
                                        <Image source={optionCount.option.image} style={styles.optionImage}/>
                                        <Text style={styles.optionText}>{optionCount.option.text}</Text>
                                        <Text style={styles.percentage}>{optionCount.percentage}%</Text>
                                    </View>
                                )}
                            />
                        </View>
                    );
                }
            }}
        />
    </View>
}

const styles = StyleSheet.create({
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
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
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
        fontSize: 12,
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
        width: 120,
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

    optionImage: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
    },

    optionText: {
        fontSize: 12,
        width: 180,
        height: 60,
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

export default HistoryCombined;