import React from 'react';
import AppWrapper from './src/components/AppWrapper';
import { PainScaleProvider } from './src/context/PainScaleContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // AsyncStorage.clear();
  
  return (
    <PainScaleProvider>
      <AppWrapper />
    </PainScaleProvider>
    
    
  );
}