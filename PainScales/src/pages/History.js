import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PainScaleContext } from '../context/PainScaleContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [persistedHistory, setPersistedHistory] = React.useState([]);

  React.useEffect(() => {
      const fetchHistory = async () => {
          const value = await AsyncStorage.getItem('history');
          if (value !== null) {
              // we have data!!
              setPersistedHistory(JSON.parse(value));
          }
      }

      fetchHistory();
  }, []);

  return (
      <ScrollView>
          { persistedHistory.map((item, index) => (
              <View key={index}>
                  <Text>{JSON.stringify(item, null, 2)}</Text>
              </View>
          ))}
      </ScrollView>
  );
}

export default History;