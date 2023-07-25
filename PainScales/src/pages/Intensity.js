import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';
import PainScale from '../components/PainScale/PainScale';
import { storePainRecord } from '../services/PainRecordService';
import { PainScaleContext } from '../context/PainScaleContext';

const IntensityPage = () => {
    const { addToHistory } = React.useContext(PainScaleContext);
    const [selectedScale, setSelectedScale] = React.useState(null);

    const intensityScales = PainScaleData.filter(scale => scale.category === CATEGORIES.INTENSITY);

    const handleScaleSelect = (id) => {
        setSelectedScale(intensityScales.find(scale => scale.id === id));
    }

    const [answer, setAnswer] = React.useState(null);

    const handleAnswerSubmit = () => {
        if(answer) {
            const painRecord = {
                date: new Date(),
                category: CATEGORIES.INTENSITY,
                question: selectedScale.question,
                answer: answer,
            };
            addToHistory(painRecord);
            alert('Your answer has been submitted!');
            setAnswer(null);   // Reset answer after submit
        } else {
            alert('Please select your pain scale before submitting');
        }
    }

    return (
        <ScrollView>
            {/* List available scales with button to select */}
            {intensityScales.map(scale => (
                <Button key={scale.id} title={scale.question} onPress={() => handleScaleSelect(scale.id)} />
            ))}
            
            {/* Show selected scale */}
            {selectedScale && (
                <PainScale 
                    type={selectedScale.type}
                    question={selectedScale.question}
                    scaleMin={selectedScale.scaleMin}
                    scaleMax={selectedScale.scaleMax}
                    categories={selectedScale.categories}
                    onValueChange={setAnswer}
                />
            )}
            <Button title="Submit" onPress={handleAnswerSubmit} />
        </ScrollView>
    );
} 

export default IntensityPage;