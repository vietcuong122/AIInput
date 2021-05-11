import React from 'react';
import {View, Text, TextInput} from 'react-native';
import colors from '../../../assets/theme/colors';
import CustomText from '../CustomText';
import styles from './styles';

const Input = ({
  label,
  icon,
  iconPosition,
  onChangeText,
  value,
  style,
  error,
  editable,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) return colors.danger;
    return focused ? colors.primary : colors.grey;
  };
  return (
    <View style={styles.inputContainer}>
      {label && (
        <CustomText style={{width: '20%', fontWeight: '500'}}>
          {label}
        </CustomText>
      )}
      <View style={{flex: 1}}>
        <View
          style={[
            styles.wrapper,
            {
              alignItems: icon ? 'center' : 'center',
              flexDirection: getFlexDirection(),
              borderColor: getBorderColor(),
              backgroundColor: editable === 'false' ? '#BDC3C7' : colors.white,
            },
          ]}>
          <View>{icon && icon}</View>
          <TextInput
            style={[styles.textInput, style]}
            onChangeText={onChangeText}
            value={value?.toUpperCase()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            editable={editable}
            {...props}
          />
        </View>
        {error && <Text style={[styles.errorMsg]}>{error}</Text>}
      </View>
    </View>
  );
};

export default Input;
