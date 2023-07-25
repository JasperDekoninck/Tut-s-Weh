import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PainScaleContext = React.createContext();

export const PainScaleProvider = ({ children }) => {
  const [history, setHistory] = React.useState([]);

  const addToHistory = async (data) => {
    setHistory([...history, data]);

    try {
      await AsyncStorage.setItem('history', JSON.stringify([...history, data]));
    } catch (error) {
        // Error saving data
        console.log(error);
    }
  };

  return (
    <PainScaleContext.Provider value={{ history, addToHistory }}>
      {children}
    </PainScaleContext.Provider>
  );
};