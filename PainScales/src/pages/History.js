import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PainScaleContext } from '../context/PainScaleContext';

const History = () => {
  const { history } = React.useContext(PainScaleContext);

  return (
      <ScrollView>
          { history.map((item, index) => (
              <View key={index}>
                  <Text>{JSON.stringify(item, null, 2)}</Text>
              </View>
          ))}
      </ScrollView>
  );
}

export default History;