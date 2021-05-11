import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Container from '../../components/Common/Container';
import CustomText from '../../components/Common/CustomText';
import MenuButton from '../../components/Common/MenuButton/MenuButton';
import {AI_INPUT_SCREEN} from '../../constants/routeName';
import styles from './styles';
import NotificationButton from '../../components/Common/NotificationButton';

const HomeScreen = () => {
  const {navigate} = useNavigation();
  let applications = [];
  for (let i = 0; i < 7; i++) {
    applications.push(
      <MenuButton
        style={styles.menuBtn}
        title="AI Input"
        onPress={() => navigate(AI_INPUT_SCREEN)}
      />,
    );
  }
  return (
    <Container style={styles.wrapper}>
      {/* <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      /> */}
      <View style={styles.headerBar}>
        <Image
          style={{width: 40, height: 40, borderRadius: 10}}
          source={require('../../assets/images/avatar.png')}
        />
        <NotificationButton count={5} />
      </View>
      <CustomText style={styles.welcomeTxt}>Our</CustomText>
      <CustomText style={styles.username}>Applications</CustomText>

      <View style={styles.btnWrapper}>
        <MenuButton
          style={styles.menuBtn}
          title="AI Input"
          onPress={() => navigate(AI_INPUT_SCREEN)}
        />
      </View>
    </Container>
  );
};

export default HomeScreen;
