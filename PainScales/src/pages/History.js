import React, { useState, useEffect, useRef } from 'react';
import HistoryIndividual from '../components/History/Individual';
import HistoryCombined from '../components/History/Combined';
import { View, useWindowDimensions, Text } from 'react-native';
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
        indicatorStyle={{ backgroundColor: 'white' }} // active tab underline color
        style={{ backgroundColor: PrimaryColor }} // TabBar background
        indicatorContainerStyle={{backgroundColor: PrimaryColor}}
        renderLabel={({ route, focused, color }) => (
          <Text style={{ color: focused ? PrimaryColor : 'white', backgroundColor: focused ? "white" : PrimaryColor, paddingLeft: 12, 
                          paddingRight: 12, paddingTop: 5, paddingBottom: 5, borderRadius: 15, overflow: 'hidden', }}>
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