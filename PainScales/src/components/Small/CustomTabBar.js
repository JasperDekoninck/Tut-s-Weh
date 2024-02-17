// CustomTabBar.js
import React from 'react';
import { Text } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import styles from './CustomTabBar.styles';
import { PrimaryColor, SecondaryColor } from '../../utils/Constants';

/**
 * CustomTabBar component renders a customized tab bar for navigation.
 *
 * @component
 * @param {Object} props - The props object containing the necessary properties.
 * @param {Object} props.renderStyle - The style object for customizing the tab bar labels.
 * @returns {JSX.Element} The rendered CustomTabBar component.
 */
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