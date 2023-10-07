import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Slider from '@react-native-community/slider';
import styles from './PainScale.styles';
import { PainScaleContext } from '../../context/PainScaleContext';
import { setOpacity, calculateThumbColor } from '../../utils/PainScaleUtils';

const PainScale = ({ scale }) => {

    const [answer, setAnswer] = React.useState(0);

    const { addToHistory } = React.useContext(PainScaleContext);

    const [fixScaleX, setFixScaleX] = React.useState(true);

    React.useEffect(() => {
        setFixScaleX(false);
        const timer = setTimeout(() => {
          setFixScaleX(true);
        }, 0);
        return () => clearTimeout(timer);
      }, [scale]);

    const handleAnswerSubmit = () => {
        if(answer !== null) {
            var date = new Date();
            const painRecord = {
                date: date,
                scale_id: scale.id,
                answer: answer,
            };
            addToHistory(painRecord);
            showMessage({ // Updates here to display on top
                message: "Your answer has been submitted!",
                type: "success",
                autoHide: true,
                duration: 3000 // 3 seconds
            });
            setAnswer(scale.scaleMin);
        } else {
            showMessage({ // Updates here to display on top
                message: "Please select your pain scale before submitting",
                type: "warning",
                autoHide: true,
                duration: 3000 // 3 seconds
            });
        }
    }

    if (scale.type === 'numerical') {
        React.useEffect(() => {
            setAnswer(scale.scaleMin);
        }
        , []);
    }

    const renderNumericalType = () => {
        return (
            <View style={styles.scaleContainer}>
                <Slider
                    onValueChange={setAnswer}
                    minimumValue={scale.scaleMin}
                    maximumValue={scale.scaleMax}
                    style={ fixScaleX ? styles.slider : [styles.slider, { transform: [{ scaleX: 1 }, {scaleY : 2}, {rotate: "90deg"}] }] } // Add this
                    minimumTrackTintColor={calculateThumbColor(answer, scale)}
                    maximumTrackTintColor={calculateThumbColor(answer, scale)}
                    step={scale.step}
                    thumbTintColor={calculateThumbColor(answer, scale)}
                    value={answer}
                />
                <View style={styles.scaleTextContainer}>
                    <Text style={{
                        fontSize: scale.fontSize,
                        color: '#000',
                        textAlign: 'center',
                        opacity: setOpacity(answer, scale)[0],
                    }}>{scale.scaleMinText}</Text>
                    <Text style={{
                        fontSize: scale.fontSize,
                        color: '#000',
                        textAlign: 'center',
                        opacity: setOpacity(answer, scale)[1],
                    }}>{scale.scaleMidText}</Text>
                    <Text style={{
                        fontSize: scale.fontSize,
                        color: '#000',
                        textAlign: 'center',
                        opacity: setOpacity(answer, scale)[2],
                    }}>{scale.scaleMaxText}</Text>
                </View>
            </View>
            
            
        )
    }

    const renderCategoricalType = () => {
        return (
            <View style={styles.optionsContainer}>
                {scale.options.map(option => 
                    <TouchableOpacity 
                        key={option.id} 
                        onPress={() => setAnswer(option.id)}
                        style={[option.id === answer ? styles.selectedOption : styles.option, {height: styles.option.height * scale.height }]}
                    > 
                        <View style={styles.optionContent}>
                            <Image source={option.image} style={styles.optionImage}/>
                            <Text style={[styles.optionText, {fontSize: styles.optionText.fontSize * scale.fontSize }]}>{option.text}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            
            <Text style={styles.question}>{scale.question}</Text>
            { scale.type === 'numerical' ? renderNumericalType() : renderCategoricalType() }
            <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit} >
                <Text style={styles.text_button}>Submit</Text>
            </TouchableOpacity>

        </View>  
    );
}

export default PainScale;