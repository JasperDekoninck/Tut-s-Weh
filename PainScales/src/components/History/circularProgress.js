import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

const CustomCircularProgress = ({ value, color, scale, radius }) => {
  const calculatedValue = (value - scale.scaleMin) / (scale.scaleMax - scale.scaleMin) * 100;
  
  return (
    <CircularProgress
      value={calculatedValue}
      maxValue={100}
      duration={0}
      showProgressValue={false}
      title={`${value}`}
      inActiveStrokeColor={color}
      inActiveStrokeOpacity={0.2}
      titleColor={"black"}
      titleFontSize={20}
      titleStyle={{fontWeight: 'bold'}}
      activeStrokeColor={color}
      radius={radius}
    />
  );
};

export default CustomCircularProgress;