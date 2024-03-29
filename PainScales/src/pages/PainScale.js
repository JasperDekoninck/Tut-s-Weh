import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';
import PainScale from '../components/PainScale/PainScale';
import { FontAwesome } from '@expo/vector-icons'; 
import { SecondaryColor } from '../utils/Constants';
import { setLastSelectedScaleId, getLastSelectedScaleId } from '../services/selectedPainScale';
import styles from './PainScale.styles';

/**
 * Creates a category page component. This is the main page for each category
 * 
 * @param {string} category - The category of the pain scales.
 * @returns {React.Component} - The category page component.
 */
const createCategoryPage = (category) => {
    /**
     * Renders the CategoryPage component.
     * 
     * @returns {JSX.Element} The rendered CategoryPage component.
     */
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
            /**
             * Fetches the last selected scale from AsyncStorage based on the given category.
             * If a last scale is found, it sets the selected scale to that scale.
             * If no last scale is found, it sets the selected scale to the first scale in the scales array.
             */
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
        
         // If displayScaleList is true, display the list of scales
        // allows the user to select the scale
        const scaleList = <ScrollView>
            {scales.map(scale => (
                <TouchableOpacity
                    style={styles.button}
                    key={scale.id}
                    onPress={() => handleScaleSelect(scale.id)}
                >
                    <View style={styles.scale_view}>
                        <Text style={styles.scale_name}>{scale.name}</Text>
                        {selectedScale && selectedScale.id === scale.id && (
                            <FontAwesome name="check" size={30} color={SecondaryColor} />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>;

        // If displayScaleList is false, display the selected scale
        const PainScaleView = <View style={styles.bottom}>
            {selectedScale && (
                <PainScale
                    scale={selectedScale} />
            )}

            <TouchableOpacity
                style={styles.other_scales_button}
                onPress={handleSelectOtherScale}
            >
                <Text style={styles.text_scales_button}>Andere Skala</Text>
            </TouchableOpacity>
        </View>;
      return (
        <View style={styles.container}>
                {displayScaleList ? (
                    scaleList
                ) : (
                    PainScaleView
                )}
        </View>
      );
    }
  
    return CategoryPage;
  }


export const IntensityPage = createCategoryPage('INTENSITY');
export const FeelingPage = createCategoryPage('FEELING');
export const AffectPage = createCategoryPage('EFFECT');
export const TypePage = createCategoryPage('TYPE');