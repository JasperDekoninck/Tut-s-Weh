import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES, PainScaleData } from '../services/PainScaleData';

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
      // const scales = PainScaleData;
      // var newHistory = [...history];
      // for (let i = 0; i < 10000; i++) {
      //   const randomScale = scales[Math.floor(Math.random() * scales.length)];
  
      //   const randomAnswer =
      //     randomScale.type === 'numerical'
      //       ? Math.floor(
      //           Math.random() *
      //             (randomScale.scaleMax - randomScale.scaleMin + 1)
      //         ) + randomScale.scaleMin
      //       : Math.floor(Math.random() * randomScale.options.length) + 1;
  
      //   const randomDate = new Date(
      //     Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      //   );
  
      //   const newEntry = {
      //     id: i + max_id + 1,
      //     scale_id: randomScale.id,
      //     answer: randomAnswer,
      //     date: randomDate.toISOString(),
      //   };
      //   newHistory = [...newHistory, newEntry];
      // }
      // setHistory(newHistory);
      // // store history in AsyncStorage
      // await AsyncStorage.setItem('history', JSON.stringify(history)).catch((error) => {
      //   // Error saving data
      //   console.error(error);
      // });

      // max_id = history.reduce((max, item) => Math.max(max, item.id), 0);
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