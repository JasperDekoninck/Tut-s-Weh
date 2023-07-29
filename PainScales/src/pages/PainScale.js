import React, { useState, useEffect } from 'react';
import { ScrollView, Button, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';
import PainScale from '../components/PainScale/PainScale';
import { FontAwesome } from '@expo/vector-icons'; 
import {PrimaryColor, SecondaryColor} from '../utils/Constants';
import FlashMessage from 'react-native-flash-message';
import { setLastSelectedScaleId, getLastSelectedScaleId } from '../services/selectedPainScale';

const createCategoryPage = (category) => {
    const CategoryPage = () => {
      const [selectedScale, setSelectedScale] = React.useState(null);
      const [displayScaleList, setDisplayScaleList] = React.useState(false);
      
      const scales = PainScaleData.filter(scale => scale.category === CATEGORIES[category]);

      // Load each Pain Scale statically from the beginning
        
  
      const handleScaleSelect = (id) => {
        setSelectedScale(scales.find(scale => scale.id === id));
        setLastSelectedScaleId(category, id); // Save the selected Scale ID
        setDisplayScaleList(false);
    }
  
      const handleSelectOtherScale = () => {
        setDisplayScaleList(true);
      }
      
      React.useEffect(() => {
            const fetchLastScale = async () => {
                const lastScaleId = await getLastSelectedScaleId(category);
                if(lastScaleId!==null)
                {
                    setSelectedScale(scales.find(scale => scale.id === lastScaleId));
                }
                else
                {
                    setSelectedScale(scales[0]);
                }
                
            } 
            fetchLastScale();               
        }, []); 
      
      return (
        <View style={styles.container}>
            <FlashMessage position="top" />
                {displayScaleList ? (
                    <ScrollView>
                        {scales.map(scale => (
                                <TouchableOpacity 
                                    style={styles.button} 
                                    key={scale.id} 
                                    onPress={() => handleScaleSelect(scale.id)}  
                                >
                                    <Text>{scale.name}</Text>
                                    {selectedScale && selectedScale.id === scale.id && (
                                    <FontAwesome name="check" size={20} color={SecondaryColor} />
                                    )}
                                </TouchableOpacity>
                                ))
                        }
                    </ScrollView>
                ) : (
                <View style={styles.bottom}>
                    {selectedScale && (
                        <PainScale 
                            scale={selectedScale}
                        />
                    )}
                    <TouchableOpacity 
                        style={styles.other_scales_button} 
                        onPress={handleSelectOtherScale} 
                    >
                    <Text style={styles.text_scales_button}>Select Other Scale</Text>
                    </TouchableOpacity>
                </View>
                )}
        </View>
      );
    }
  
    return CategoryPage;
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    minHeight: "100%"
},
bottom: {
    flex: 1,
},
button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
},
other_scales_button: {
    justifyContent: 'center',
    alignItems: 'center',
    
},
text_scales_button: {
    backgroundColor: "white",
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    paddingLeft: 20,
    paddingRight: 20,
    color: SecondaryColor
}
});

export const IntensityPage = createCategoryPage('INTENSITY');
export const FeelingPage = createCategoryPage('FEELING');
export const AffectPage = createCategoryPage('AFFECT');
export const TypePage = createCategoryPage('TYPE');