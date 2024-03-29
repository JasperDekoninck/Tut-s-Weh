import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Slider from '@react-native-community/slider';
import styles from './PainScale.styles';
import { PainScaleContext } from '../../context/PainScaleContext';
import { setOpacity, calculateThumbColor } from '../../utils/PainScaleUtils';

/**
 * PainScale component displays a pain scale with options for the user to select and submit their answer.
 * @param {Object} scale - The pain scale object containing the scale details.
 * @returns {JSX.Element} - The rendered PainScale component.
 */
const PainScale = ({ scale }) => {

    const { addToHistory } = React.useContext(PainScaleContext);

    // set variables
    const [answer, setAnswer] = React.useState(null);
    const [fixScaleX, setFixScaleX] = React.useState(true);

    // fix slider scale
    React.useEffect(() => {
        setFixScaleX(false);
        const timer = setTimeout(() => {
          setFixScaleX(true);
        }, 0);
        return () => clearTimeout(timer);
      }, [scale]);
    
    /**
     * Handles the submission of an answer.
     */
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
                message: "Antwort notiert!",
                type: "success",
                autoHide: true,
                duration: 3000 // 3 seconds
            });
            setAnswer(null);
            if (scale.type === 'numerical') {
                setAnswer(scale.scaleMin);
            }
        } else {
            showMessage({ // Updates here to display on top
                message: "Nicht vergessen: Antwort aussuchen, dann abschicken!",
                type: "warning",
                autoHide: true,
                duration: 3000 // 3 seconds
            });
        }
    }

    // set initial answer
    if (scale.type === 'numerical') {
        React.useEffect(() => {
            setAnswer(scale.scaleMin);
        }
        , []);
    }

    const indices = [
        { text: scale.scaleMinText, opacityIndex: 0 },
        { text: scale.scaleMidText, opacityIndex: 1 },
        { text: scale.scaleMaxText, opacityIndex: 2 },
    ];

    /**
     * Renders the numerical type of the pain scale.
     * @returns {JSX.Element} The rendered numerical pain scale component.
     */
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
                    {indices.map((item, index) => (
                        <Text
                        key={index}
                        style={{
                            fontSize: scale.fontSize,
                            color: '#000',
                            textAlign: 'center',
                            opacity: setOpacity(answer, scale)[item.opacityIndex],
                        }}
                        >
                        {item.text}
                        </Text>
                    ))}
                </View>
            </View>
        )
    }

    /**
     * Renders the categorical type of pain scale options.
     * 
     * @returns {JSX.Element} The rendered categorical type options.
     */
    const renderCategoricalType = () => {
        return (
            <View style={styles.optionsContainer}>
                {scale.options.map(option => 
                    <TouchableOpacity 
                        key={option.id} 
                        onPress={() => setAnswer(option.id)}
                        style={[option.id === answer ? styles.selectedOption : styles.option, 
                            {height: styles.option.height * scale.height }]}
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
                <Text style={styles.text_button}>Senden</Text>
            </TouchableOpacity>

        </View>  
    );
}

export default PainScale;