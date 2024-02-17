import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PainScaleContext = React.createContext();

export const PainScaleProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const maxIdRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const savedHistory = await AsyncStorage.getItem('history');
      const historyParsed = savedHistory != null ? JSON.parse(savedHistory) : [];
      setHistory(historyParsed);
      

      var max_id = historyParsed.reduce((max, item) => Math.max(max, item.id), 0);
      maxIdRef.current = max_id;
    };
    fetchData();
  }, []);

  const addToHistory = async (data) => { 
    // update id directly in data object
    maxIdRef.current = maxIdRef.current + 1;
    data.id = maxIdRef.current;
    const newHistory = [...history, data];
    
    // save data asynchronously, no need to wait for it to finish
    await AsyncStorage.setItem('history', JSON.stringify(newHistory)).catch((error) => {
        // Error saving data
        console.error(error);
    });

    setHistory(newHistory);
    
  };

  const deleteFromHistory = async (data) => {
    const newHistory = history.filter(item => item.id !== data.id);
  
    // save data asynchronously, no need to wait for it to finish
    await AsyncStorage.setItem('history', JSON.stringify(newHistory)).catch((error) => {
        // Error saving data
        console.error(error);
    });

    setHistory(newHistory);
  };

  return (
    <PainScaleContext.Provider value={{ history, addToHistory, deleteFromHistory }}>
      {children}
    </PainScaleContext.Provider>
  );
};