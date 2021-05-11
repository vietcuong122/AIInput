import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import colors from '../../../assets/theme/colors';
import CustomText from '../CustomText';
import styles from './styles';

const CustomButton = ({
  onPress,
  title,
  loading,
  disabled,
  primary,
  secondary,
  danger,
  style,
}) => {
  const getBgColor = () => {
    if (disabled) return colors.grey;

    if (primary) return colors.primary;

    if (secondary) return colors.secondary;

    if (danger) return colors.danger;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrapper, {backgroundColor: getBgColor()}, style]}>
      <View style={styles.loadingSection}>
        {loading && (
          <ActivityIndicator
            color={primary ? colors.secondary : colors.primary}
          />
        )}
        {title && (
          <CustomText
            style={{
              color: disabled ? 'black' : colors.white,
              paddingLeft: loading ? 5 : 0,
              fontSize: 16,
              fontWeight: '600',
            }}>
            {loading ? 'Please wait...' : title}
          </CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
