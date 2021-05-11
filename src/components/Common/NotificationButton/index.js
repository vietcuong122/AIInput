import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import {View, Text} from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';
import colors from '../../../assets/theme/colors';

const NotificationButton = ({count}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity>
        <Icon name="notifications" color={colors.pomegranate} size={30} />
        {count > 0 && (
          <CustomText
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              borderRadius: 8,
              overflow: 'hidden',
              paddingHorizontal: 3,
              paddingVertical: 0,
              margin: 5,
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {count}
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NotificationButton;
