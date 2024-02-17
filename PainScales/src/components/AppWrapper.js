import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SecondaryColor } from '../utils/Constants';
import styles from './AppWrapper.styles';

import Home from '../pages/Home';
import History from '../pages/History';

const Tab = createBottomTabNavigator();

/**
 * Renders the main wrapper component for the application.
 * @returns {JSX.Element} The rendered AppWrapper component.
 */
export default function AppWrapper() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={require("../../assets/logo-nobg.png")} style={styles.image}/>
            </View>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarLabelPosition: "below-icon",
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                        } else if (route.name === 'Historie') {
                        iconName = focused
                            ? 'history'
                            : 'history';
                        }

                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: SecondaryColor,
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: [
                        styles.tabBarStyle
                    ],
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIconStyle: styles.tabBarIconStyle,
                })}
                >
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Historie" component={History} />
                </Tab.Navigator>
                </NavigationContainer>
        </View>
    );
}