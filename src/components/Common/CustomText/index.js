import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomText = ({style, ...props}) => {
  const getFontStyle = () => {
    if (style?.fontWeight && style.fontWeight === 'bold') {
      return styles.boldFont;
    }
    return styles.regularFont;
  };
  return (
    <Text style={[getFontStyle(), style]} {...props}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  regularFont: {
    fontFamily: 'Poppins-Regular',
    includeFontPadding: false,
  },
  boldFont: {
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
  },
});
