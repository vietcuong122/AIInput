import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Container from '../../../../../components/Common/Container';
import Input from '../../../../../components/Common/Input';
import CustomButton from '../../../../../components/Common/CustomButton';

import styles from './styles';
import UserCard from './UserCard';

const HomeComponent = ({
  onChange,
  onSubmit,
  onSave,
  onStop,
  onPressScanButton,
  form,
  errors,
}) => {
  return (
    <Container>
      <Image
        style={styles.logo}
        source={require('../../../../../assets/images/logo.png')}
      />
      {!form.showQrSection && (
        <View>
          <Input
            label={'User'}
            value={form.userCode}
            onChangeText={value => {
              onChange({name: 'userCode', value});
            }}
            error={errors.userCode}
            editable={form.editable}
            maxLength={15}
          />
          <Input
            label={'Zone'}
            value={form.zone}
            onChangeText={value => {
              onChange({name: 'zone', value});
            }}
            error={errors.zone}
            editable={form.editable}
            maxLength={9 - form.alley?.length || 8}
          />
          <Input
            label={'Alley'}
            value={form.alley}
            onChangeText={value => {
              onChange({name: 'alley', value});
            }}
            error={errors.alley}
            editable={form.editable}
            maxLength={9 - form.zone?.length || 1}
          />

          <CustomButton
            onPress={onSubmit}
            style={{marginTop: 20}}
            title={'Start'}
            primary
          />
        </View>
      )}
      {form.showQrSection && (
        <View>
          <UserCard
            userCode={form.userCode}
            zone={form.zone}
            alley={form.alley}
            onStop={onStop}
          />
          <View style={styles.qrWrapper}>
            <Input
              label={'Barcode'}
              value={form.barcode}
              icon={
                <TouchableOpacity onPress={() => onPressScanButton()}>
                  <Image
                    style={styles.qrBtn}
                    source={require('../../../../../assets/images/qrcode.png')}
                  />
                </TouchableOpacity>
              }
              iconPosition={'right'}
              onChangeText={value => {
                onChange({name: 'barcode', value});
              }}
              error={errors.barcode}
              keyboardType={'numeric'}
            />
            <Input
              value={form.qty}
              label={'QTy'}
              onChangeText={value => {
                onChange({name: 'qty', value});
              }}
              error={errors.qty}
              maxLength={8}
              keyboardType={'numeric'}
            />

            <CustomButton
              onPress={onSave}
              style={{marginTop: 20}}
              title={'Save'}
              primary
            />
          </View>
        </View>
      )}
    </Container>
  );
};

export default HomeComponent;
