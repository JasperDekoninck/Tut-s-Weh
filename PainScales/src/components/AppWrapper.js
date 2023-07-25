import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../pages/Home';
import History from '../pages/History';
import Info from '../pages/Info';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function AppWrapper() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Pain Scales</Text>
            </View>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                        } else if (route.name === 'History') {
                        iconName = focused
                            ? 'history'
                            : 'history';
                        } else if (route.name === 'Info') {
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
                    tabBarActiveTintColor: 'red',
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
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="History" component={History} />
                    <Tab.Screen name="Info" component={Info} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
                </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: 'red',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }
});