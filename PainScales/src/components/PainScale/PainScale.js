import React from 'react';
import { View, Text, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './PainScale.styles';

const PainScale = ({ type, question, scaleMin, scaleMax, categories, onValueChange }) => {

    const [answer, setAnswer] = React.useState(null);  // Add this line

    const renderNumericalType = () => {
        return (
            <View>
                <Text>{scaleMin}</Text>
                <Slider
                    onValueChange={onValueChange}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    // ...rest of the props
                />
                <Text>{scaleMax}</Text>
            </View>
        )
    }

    const renderCategoricalType = () => {
        return categories.map(category => 
            <TouchableOpacity key={category.id} onPress={() => onValueChange(category.text)}> 
                <View>
                    <Image source={category.image} />
                    <Text>{category.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            {
                type === 'numerical' ? renderNumericalType() : renderCategoricalType()
            }
        </View>
        
    );
}

export default PainScale;