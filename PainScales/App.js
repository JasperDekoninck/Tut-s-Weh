import React from 'react';
import AppWrapper from './src/components/AppWrapper';
import { PainScaleProvider } from './src/context/PainScaleContext';

export default function App() {
  return (
    <PainScaleProvider>
      <AppWrapper />
    </PainScaleProvider>
  );
}