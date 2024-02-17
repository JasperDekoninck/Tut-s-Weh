import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

/**
 * CustomCircularProgress component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.value - The value of the progress.
 * @param {string} props.color - The color of the progress.
 * @param {Object} props.scale - The scale object containing scaleMin and scaleMax values.
 * @param {number} props.radius - The radius of the progress.
 * @returns {JSX.Element} The rendered CustomCircularProgress component.
 */
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