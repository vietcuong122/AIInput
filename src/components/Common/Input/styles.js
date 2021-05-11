import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  inputContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrapper: {
    flex: 1,
    height: 42,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    width: '100%',
    fontFamily: 'Poppins-Regular',
    includeFontPadding: false,
  },
  errorMsg: {
    paddingTop: 5,
    fontSize: 12,
    color: colors.danger,
  },
});
