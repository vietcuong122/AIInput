import {Dimensions, StyleSheet} from 'react-native';

import colors from '../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {},
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  welcomeTxt: {
    marginTop: 30,
    color: colors.casper,
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
  title: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  btnWrapper: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  menuBtn: {
    margin: 5,
  },
});
