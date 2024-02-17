import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { PainScaleContext } from '../../context/PainScaleContext';
import { PainScaleData } from '../../services/PainScaleData';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Combined.styles';
import { calculateThumbColor } from '../../utils/PainScaleUtils';
import CustomCircularProgress from '../Small/circularProgress';
import CustomDatePicker from '../Small/CustomDatePicker';

/**
 * Calculates the number of unique days in the given history.
 * @param {Array} history - The history array containing items with date property.
 * @returns {number} - The number of unique days.
 */
function numberOfUniqueDays(history) {
    const uniqueDays = [];
    history.forEach(item => {
        const itemDate = new Date(item.date);
        // make sure to return true as soon as the date is correct, disregard the time
        // to do so we need to set the time to 00:00:00
        itemDate.setHours(0,0,0,0);
        const found = uniqueDays.find(day => day.getTime() === itemDate.getTime());
        if (!found) {
            uniqueDays.push(itemDate);
        }
    });
    return uniqueDays.length;
}

/**
 * Represents a component that displays combined history data.
 * @returns {JSX.Element} The rendered component.
 */
const HistoryCombined = () => {
    const { history } = React.useContext(PainScaleContext);
    const scales = PainScaleData;

    const [startDate, setStartDate] = useState(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)); // default to last week
    const [endDate, setEndDate] = useState(new Date(Date.now())); // default to today
    const [nDays, setNDays] = useState(7); // default to last week [7 days]

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    /**
     * Handles the confirmation of the start date.
     * @param {Date} date - The selected start date.
     * @returns {void}
     */
    const handleConfirmStartDate = (date) => {
        setStartDatePickerVisibility(false);
        setStartDate(date);
    };

    /**
     * Sets the end date and hides the end date picker.
     * @param {Date} date - The selected end date.
     */
    const handleConfirmEndDate = (date) => {
        setEndDatePickerVisibility(false);
        setEndDate(date);
    };

    // filter history to only include scales that are in the scales array
    let onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));
    const [filteredHistory, setFilteredHistory] = useState(onlyCorrectHistory);

    useEffect(() => {
        onlyCorrectHistory = history.filter(item => scales.find(scale => scale.id === item.scale_id));
        // filter history to only include items between start and end date
        let newHistory = onlyCorrectHistory.filter(item => { 
            const itemDate = new Date(item.date);
            // make sure to return true as soon as the date is correct, disregard the time
            // to do so we need to set the time to 00:00:00
            itemDate.setHours(0,0,0,0);
            startDate.setHours(0,0,0,0);
            endDate.setHours(0,0,0,0);
            return itemDate >= startDate && itemDate <= endDate;
        });
        // get number of days between start date and end date
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setNDays(diffDays);

        setFilteredHistory(newHistory);

    }, [history, startDate, endDate]);

    /**
     * Renders the numerical answer section for a given item and scale.
     * 
     * @param {Object} item - The item containing numerical data.
     * @param {Object} scale - The scale object.
     * @returns {JSX.Element} - The rendered numerical answer section.
     */
    const displayNumericalAnswer = (item, scale) => {
        // Define an array of objects representing each statistical measure
        const stats = [
            { label: 'Minimum', value: item.min, radius: 30 },
            { label: 'Mittelwert', value: item.mean, radius: 40 },
            { label: 'Maximum', value: item.max, radius: 30 },
            { label: '25% Perzentil', value: item.percentile25, radius: 30 },
            { label: 'Median', value: item.median, radius: 40 },
            { label: '75% Perzentil', value: item.percentile75, radius: 30 }
        ];
    
        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{scale.question}</Text>
                    <Text style={styles.subtitle}>Einträgen: {item.totalCounts}</Text>
                    <Text style={styles.subtitle}>Tage mit Einträgen: {item.days} / {nDays}</Text>
                </View>
                {/* Use two `map` calls for two rows, first for the initial 3 stats, second for the last 3 stats */}
                {[0, 3].map((startIndex) => (
                    <View key={startIndex} style={styles.numericalStats}>
                        {stats.slice(startIndex, startIndex + 3).map((stat, index) => (
                            <View key={index} style={styles.circularProgressStyle}>
                                <CustomCircularProgress value={stat.value} color={calculateThumbColor(stat.value, scale)} 
                                                        scale={scale} radius={stat.radius}/>
                                <Text style={styles.numericalTextTitle}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    /**
     * Renders a categorical answer component.
     * 
     * @param {Object} item - The item containing the categorical answer data.
     * @param {Object} scale - The scale object containing the question.
     * @returns {JSX.Element} The rendered categorical answer component.
     */
    const displayCategoricalAnswer = (item, scale) => {
        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{scale.question}</Text>
                    <Text style={styles.subtitle}>Einträgen: {item.totalCounts} </Text>
                </View>
                <View style={styles.optionsContainer}>
                    {item.optionCounts.map(optionCount => 
                        <View style={styles.optionCount} key={optionCount.option.id}>
                            <Image source={optionCount.option.image} style={styles.optionImage}/>
                            <Text style={styles.optionText}>{optionCount.option.text}</Text>
                            <Text style={styles.percentage}>{optionCount.percentage}%</Text>
                            <Text style={styles.subtitle}>Tage: {optionCount.daysOption} / {nDays} </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };
    

    // calculate the statistics for each scale
    const scaleStats = scales.map(scale => {
        // filter the history to only include items for the current scale
        const scaleHistory = filteredHistory.filter(item => item.scale_id === scale.id);
        const days = numberOfUniqueDays(scaleHistory);
        if (scale.type === "numerical") {
            // calculate the statistics for the numerical scale
            const answers = scaleHistory.map(item => item.answer);
            const min = Math.min(...answers);
            const max = Math.max(...answers);
            const mean = Math.round(answers.reduce((a, b) => a + b, 0) / answers.length);
            const median = answers.sort((a, b) => a - b)[Math.floor(answers.length / 2)];
            const percentile25 = answers.sort((a, b) => a - b)[Math.floor(answers.length / 4)];
            const percentile75 = answers.sort((a, b) => a - b)[Math.floor(answers.length * 3 / 4)];
            const totalCounts = answers.length;
            return { scale, min, mean, max, totalCounts, days, median, percentile25, percentile75 };
        } else if (scale.type === "categorical") {
            // calculate the statistics for the categorical scale
            const optionCounts = scale.options.map(option => {
                const count = scaleHistory.filter(item => item.answer === option.id).length;
                const percentage = Math.round(count / scaleHistory.length * 100);
                const daysOption = numberOfUniqueDays(scaleHistory.filter(item => item.answer === option.id));
                return { option, count, percentage, daysOption };
            });
            const totalCounts = optionCounts.reduce((a, b) => a + b.count, 0);
            return { scale, optionCounts, totalCounts, days};
        }
    });

    // make sure the percentage adds up to 100 for categorical, if not add the difference to the highest option
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

    return <View style={styles.container}>
        <View style={styles.form}>
            <CustomDatePicker
                label="Von"
                date={startDate}
                setDateVisibility={setStartDatePickerVisibility}
                isVisible={isStartDatePickerVisible}
                onConfirm={(date) => handleConfirmStartDate(date)}
            />

            <CustomDatePicker
                label="Bis"
                date={endDate}
                setDateVisibility={setEndDatePickerVisibility}
                isVisible={isEndDatePickerVisible}
                onConfirm={(date) => handleConfirmEndDate(date)}
            />
        </View>

        <FlatList
            data={scaleStats}
            style={styles.flatListStyle}
            removeClippedSubviews
            maxToRenderPerBatch={10}
            initialNumToRender={5}
            windowSize={7}
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
                    return displayCategoricalAnswer(item, scale);
                }
            }}
        />
    </View>
}

export default HistoryCombined;