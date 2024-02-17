import React from 'react';
import HistoryIndividual from '../components/History/Individual';
import HistoryCombined from '../components/History/Combined';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { getLastSelectedHistory, setLastSelectedHistory } from '../services/selectedHistory';
import styles from './History.styles';
import CustomTabBar from '../components/CustomTabBar';

const renderScene = SceneMap({
    individual: HistoryIndividual, 
    averaged: HistoryCombined,
});

/**
 * Renders the History page.
 *
 * @returns {JSX.Element} The rendered History page.
 */
export default function History() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0); // Index of the history
    const [routes] = React.useState([
      { key: 'individual', title: 'Individuell'},
      { key: 'averaged', title: 'Kombiniert' },
    ]);
  
    /**
     * Fetches the last selected history and updates the index accordingly.
     * @returns {Promise<void>} A promise that resolves when the last selected history is fetched and the index is updated.
     */
    const fetchLastHistory = async () => {
      const lastHistory = await getLastSelectedHistory();
      if(lastHistory != null)
      {   
          let new_index = parseInt(lastHistory);
          setIndex(new_index);
      }
      else
      {
          setIndex(0);
      }
      
    } 
  
    React.useEffect(() => {
        fetchLastHistory();               
      }, []); 
  
    /**
     * Sets the index and last selected history value.
     * 
     * @param {number} index - The new index value.
     * @returns {void}
     */
    const handleIndexChange = (index) => {
      setIndex(index);
      setLastSelectedHistory(index.toString());
    }
  
    const renderTabBar = props => (
      <CustomTabBar
        {...props}
        renderStyle={styles.tabBarRenderStyle}
      />
    );
  
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        animationEnabled={false}
      />
    );
  }