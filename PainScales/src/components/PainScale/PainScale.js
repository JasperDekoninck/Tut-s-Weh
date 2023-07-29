import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Slider from '@react-native-community/slider';
import styles from './PainScale.styles';
import { PainScaleContext } from '../../context/PainScaleContext';

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
            const painRecord = {
                date: new Date(),
                category: scale.category,
                question: scale.question,
                answer: answer,
            };
            addToHistory(painRecord);
            showMessage({ // Updates here to display on top
                message: "Your answer has been submitted!",
                type: "success",
                autoHide: true,
                duration: 3000 // 3 seconds
                
            });
            setAnswer(scale.ScaleMin);
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

    const lerpColor = (color1, color2, t) => {
        let r = color1[0] + t * (color2[0] - color1[0]);
        let g = color1[1] + t * (color2[1] - color1[1]);
        let b = color1[2] + t * (color2[2] - color1[2]);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const calculateThumbColor = (value) => {
        let t = (value-scale.scaleMin) / (scale.scaleMax-scale.scaleMin); // normalize value
        if (t < 0.5) {
            return lerpColor(scale.startColor, scale.midColor, t*2); // lerp from startColor to midColor
        }
        else {
            return lerpColor(scale.midColor, scale.endColor, (t-0.5)*2); // lerp from midColor to endColor
        }
    }

    const setOpacity = (value) => {
        let t = (value-scale.scaleMin) / (scale.scaleMax-scale.scaleMin); // normalize value
        let opacityMin = 0.2;
        let opacityMax = 0.2;
        let opacityMid = 0.2;
        if (t < 0.5) {
            opacityMid += (0.8 * t * 2);
            opacityMin += (0.8 * (1 - t * 2)); 
        } else {
            opacityMax += (0.8 * (t - 0.5) * 2);
            opacityMid += (0.8 * (1 - (t - 0.5) * 2));
        }
        return [opacityMin, opacityMid, opacityMax];
    }

    const renderNumericalType = () => {
        return (
            <View style={styles.scaleContainer}>
                <Slider
                    onValueChange={setAnswer}
                    minimumValue={scale.scaleMin}
                    maximumValue={scale.scaleMax}
                    style={ fixScaleX ? styles.slider : [styles.slider, { transform: [{ scaleX: 1 }, {scaleY : 2}, {rotate: "90deg"}] }] } // Add this
                    minimumTrackTintColor={calculateThumbColor(answer)}
                    maximumTrackTintColor={calculateThumbColor(answer)}
                    step={scale.step}
                    thumbTintColor={calculateThumbColor(answer)}
                    value={answer}
                />
                <View style={styles.scaleTextContainer}>
                    <Text style={{
                        fontSize: scale.fontSize,
                        color: '#000',
                        textAlign: 'center',
                        opacity: setOpacity(answer)[0],
                    }}>{scale.scaleMinText}</Text>
                    <Text style={{
                        fontSize: scale.fontSize,
                        color: '#000',
                        textAlign: 'center',
                        opacity: setOpacity(answer)[1],
                    }}>{scale.scaleMidText}</Text>
                    <Text style={{
                        fontSize: scale.fontSize,
                        color: '#000',
                        textAlign: 'center',
                        opacity: setOpacity(answer)[2],
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
                        style={option.id === answer ? styles.selectedOption : styles.option} 
                    > 
                        <View style={styles.optionContent}>
                            <Image source={option.image} style={styles.optionImage}/>
                            <Text style={styles.optionText}>{option.text}</Text>
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