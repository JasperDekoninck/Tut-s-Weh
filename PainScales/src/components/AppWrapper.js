import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { PrimaryColor, SecondaryColor } from '../utils/Constants';

import Home from '../pages/Home';
import History from '../pages/History';
import Info from '../pages/Info';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

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
                        } else if (route.name === 'Infos') {
                        iconName = focused
                            ? 'info'
                            : 'info';
                        } else if (route.name === 'Settings') {
                        iconName = focused
                            ? 'settings'
                            : 'settings';
                        }

                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: SecondaryColor,
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: [
                        {
                            display: 'flex',
                        }
                    ],
                    tabBarLabelStyle: {marginBottom: 5},
                    tabBarIconStyle: { marginTop: 5 },
                })}
                >
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Historie" component={History} />
                    {/* <Tab.Screen name="Infos" component={Info} /> */}
                    {/* <Tab.Screen name="Settings" component={Settings} /> */}
                </Tab.Navigator>
                </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: PrimaryColor,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    image: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
    },
});