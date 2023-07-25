import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PainScaleContext = React.createContext();

export const PainScaleProvider = ({ children }) => {
  const [history, setHistory] = React.useState([]);

  const addToHistory = async (data) => {  
    try {
      const previousHistory = await AsyncStorage.getItem('history');
      const previousHistoryParsed = previousHistory != null ? JSON.parse(previousHistory) : [];
      const newHistory = [...previousHistoryParsed, data];
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
      
      setHistory(newHistory);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const savedHistory = await AsyncStorage.getItem('history');
      setHistory(savedHistory != null ? JSON.parse(savedHistory) : []);
    };
    fetchData();
  }, []);

  return (
    <PainScaleContext.Provider value={{ history, addToHistory }}>
      {children}
    </PainScaleContext.Provider>
  );
};