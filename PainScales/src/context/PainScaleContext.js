import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PainScaleContext = React.createContext();

/**
 * PainScaleProvider component provides a context for managing pain scale history.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
export const PainScaleProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const maxIdRef = useRef(0);

  useEffect(() => {
    /**
     * Fetches data from AsyncStorage and updates the history state.
     * @returns {Promise<void>} A promise that resolves when the data is fetched and the state is updated.
     */
    const fetchData = async () => {
      const savedHistory = await AsyncStorage.getItem('history');
      const historyParsed = savedHistory != null ? JSON.parse(savedHistory) : [];
      setHistory(historyParsed);
      

      var max_id = historyParsed.reduce((max, item) => Math.max(max, item.id), 0);
      maxIdRef.current = max_id;
    };
    fetchData();
  }, []);

  /**
   * Adds data to the history and updates the maximum ID.
   * @param {Object} data - The data to be added to the history.
   * @returns {Promise<void>} - A promise that resolves when the data is saved.
   */
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

  /**
   * Deletes an item from the history and updates the history state.
   * @param {Object} data - The item to be deleted from the history.
   * @returns {Promise<void>} - A promise that resolves when the item is deleted and the history state is updated.
   */
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