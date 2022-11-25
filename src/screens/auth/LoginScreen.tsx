import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Spacer from '../../components/layout/Spacer';
import Style from '../../constants/Style';
import RootNavigation from '../../navigation/RootNavigation';
import Colors from '../../theme/Colors';
import Validator from '../../utility/validation/Validator';
import AuthBaseScreen from './AuthBaseScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import APIManager from '../../network/APIManager';
import SharedPreference from '../../storage/SharedPreference';

const LoginScreen = () => {
  const [mobileNo, setMobileNo] = useState('7737548212');
  const loginHandler = () => {
    const data = {
      mobile: '8976733351',
      otp: '7197',
    };
    SharedPreference.shared.setItem('otpDetails', JSON.stringify(data));
    RootNavigation.navigate('EnterOTPScreen');
    console.log('Login clicked');
    // if (isLogin) {
    //   RootNavigation.navigate('EnterOTPScreen', {isLogin: true}); // for login
    // } else {
    //   RootNavigation.navigate('MobileScreen'); // for registration
    // }
  };

  const termsHandler = () => {
    RootNavigation.navigate('TermsConditionsScreen');
  };

  const helpHandler = () => {};

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.loginWithMobile}
      iconName="mobile_number">
      <AdaptiveTextInput
        value={mobileNo}
        keyboardType="number-pad"
        onChangeText={setMobileNo}
        // placeholder={AppLocalizedStrings.auth.mobileNo}
        placeholder="Enter your Email"
        style={styles.input}
      />

      <AdaptiveButton
        // isDisable={!Validator.isValidMobileNumber(mobileNo)}
        title={
          AppLocalizedStrings.auth.login +
          ' / ' +
          AppLocalizedStrings.auth.register
        }
        onPress={loginHandler}
        buttonStyle={styles.btn}
      />
      <View style={styles.viewBottom}>
        <AdaptiveButton
          textStyle={styles.btnCondition}
          type="text"
          title={AppLocalizedStrings.auth.termsAndConditions}
          onPress={termsHandler}
        />
        <AdaptiveButton
          icon="info"
          iconColor={Colors.black}
          iconSize={wp(3)}
          textStyle={styles.btnCondition}
          type="text"
          title={AppLocalizedStrings.auth.help}
          onPress={helpHandler}
        />
      </View>
    </AuthBaseScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2.5%'),
  },
  btn: {
    width: '100%',
  },
  btnCondition: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    paddingTop: hp(1),
    flex: 1,
    justifyContent: 'space-between',
  },
  line: {
    backgroundColor: Colors.lightPurple,
    height: 1,
    width: '100%',
    marginVertical: hp('3.5%'),
  },
});
