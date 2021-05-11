import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const MenuButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
      <CustomText style={styles.text}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default MenuButton;
