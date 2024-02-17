import React from 'react';
import HistoryIndividual from '../components/History/Individual';
import HistoryCombined from '../components/History/Combined';
import { useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getLastSelectedHistory, setLastSelectedHistory } from '../services/selectedHistory';
import { PrimaryColor, SecondaryColor } from '../utils/Constants';

const renderScene = SceneMap({
    individual: HistoryIndividual, 
    averaged: HistoryCombined,
});

export default function History() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'individual', title: 'Individuell'},
      { key: 'averaged', title: 'Kombiniert' },
    ]);
  
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
  
    const handleIndexChange = (index) => {
      setIndex(index);
      setLastSelectedHistory(index.toString());
      }
  
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: SecondaryColor, height: 3 }} // active tab underline color
        style={{ backgroundColor: PrimaryColor }} // TabBar background
        indicatorContainerStyle={{backgroundColor: PrimaryColor}}
        renderLabel={({ route, focused, color }) => (
          <Text style={{ color: focused ? 'white' : SecondaryColor, backgroundColor: focused ? SecondaryColor : PrimaryColor, paddingLeft: 9, fontSize: 18,
                        paddingRight: 9, paddingTop: 5, paddingBottom: 5, borderRadius: 20, overflow: 'hidden', marginLeft: -5, marginRight:-5, fontWeight: 500}}>
          {route.title}
        </Text>
        )}
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