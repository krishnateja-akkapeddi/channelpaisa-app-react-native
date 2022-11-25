import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import OTPView from '../../components/app/auth/OTPView';
import ResendOTPMode from '../../components/app/auth/ResendOTPMode';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Spacer from '../../components/layout/Spacer';
import {Slices} from '../../constants/Slices';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import APIMethod from '../../models/enum/APIMethod';
import RootNavigation from '../../navigation/RootNavigation';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import APIManager from '../../network/APIManager';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {authSlice} from '../../store/slices/AuthSlice';
import {store} from '../../store/Store';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {hp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';

const EnterOTPScreen: React.FC<
  AuthStackScreenProps<'EnterOTPScreen'>
> = props => {
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  useEffect(() => {
    Snackbar.show({
      text: 'OTP sent successfully',
      backgroundColor: Colors.green,
      textColor: Colors.white,
    });
  }, []);

  const onRequestHandler = () => {};

  const onSubmitHandler = async () => {
    console.log('Submit called', mobile, otp);
    // const isLogin = props.route.params?.isLogin ?? false;
    try {
      var raw = {
        mobile: '8976733351',
        otp: '7197',
      };
      const data: any = await APIManager.makeRequest({
        url: '/auth/verify-otp',
        method: APIMethod.post,
        body: raw,
      });

      store.dispatch(authSlice.actions.storeAuthResult(data.data));
    } catch (errror: any) {
      console.log(errror);
    }

    // if (isLogin == true) {
    //   await SharedPreference.shared.setItem(kSharedKeys.userDetails, '');
    //   RootNavigation.replace('Drawer');
    // } else {
    //   RootNavigation.navigate('EnterGSTScreen');
    // }
  };
  console.log('Auth state', store.getState().auth.data);
  useEffect(() => {
    const otpOb = async () => {
      let sm = await SharedPreference.shared.getItem('otpDetails');
      let rn = JSON.parse(sm);
      setMobile(rn.mobile);
      console.log('RNA', rn);
    };
    !mobile && otpOb();
  }, [mobile]);
  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.enterOTP}
      iconName="enter_otp">
      <OTPView onSelect={setOtp} />
      <Spacer height={hp('3')} />
      <Text style={styles.resendOTP}>
        {AppLocalizedStrings.auth.requestOTPIn}
        <Text style={styles.timer}>00:00</Text>
      </Text>
      <Text style={styles.or}>{AppLocalizedStrings.auth.or}</Text>
      <View style={styles.resendOTPContainer}>
        <Text style={styles.resendOTP}>
          {AppLocalizedStrings.auth.dontReceiveOTP}
        </Text>
        <AdaptiveButton
          type="text"
          title={AppLocalizedStrings.auth.requestOn}
          textStyle={styles.requestOnText}
          buttonStyle={styles.requestOnBtn}
          onPress={onRequestHandler}
        />
      </View>
      <Spacer height={hp('3%')} />
      <ResendOTPMode />
      <AdaptiveButton
        isDisable={otp.length < 4}
        title={AppLocalizedStrings.submit}
        onPress={onSubmitHandler}
        buttonStyle={styles.btnSubmit}
      />
    </AuthBaseScreen>
  );
};

export default EnterOTPScreen;

const styles = StyleSheet.create({
  btnSubmit: {
    width: '100%',
    marginVertical: hp('5%'),
  },
  btnCondition: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  resendOTP: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  timer: {
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Bold', Colors.blue),
  },
  or: {
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.lightPurple,
    ),
  },
  requestOnText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  requestOnBtn: {
    height: undefined,
  },
  resendOTPContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
