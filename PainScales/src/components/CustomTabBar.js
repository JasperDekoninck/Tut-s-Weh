// CustomTabBar.js
import React from 'react';
import { Text } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import styles from './CustomTabBar.styles';
import { PrimaryColor, SecondaryColor } from '../utils/Constants';

const CustomTabBar = ({ renderStyle, ...props }) => (
  <TabBar
    {...props}
    indicatorStyle={styles.tabBarIndicatorStyle}
    style={styles.tabBarStyle}
    indicatorContainerStyle={styles.tabBarIndicatorContainerStyle}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ 
        ...renderStyle, 
        color: focused ? 'white' : SecondaryColor, 
        backgroundColor: focused ? SecondaryColor : PrimaryColor
      }}>
        {route.title}
      </Text>
    )}
  />
);

export default CustomTabBar;