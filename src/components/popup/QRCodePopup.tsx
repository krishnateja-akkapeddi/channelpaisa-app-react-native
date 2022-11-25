import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PopupContainer from './PopupContainer';
import SVGIcon from '../../utility/svg/SVGIcon';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import AdaptiveButton from '../button/AdaptiveButton';

interface QRCodePopupProps {
  onDismiss: () => void;
}

const QRCodePopup: React.FC<QRCodePopupProps> = props => {
  return (
    <PopupContainer showHeader={false}>
      <View style={styles.main}>
        <SVGIcon name="qrcode" size={wp('45%')} />
        <Text style={styles.info}>{AppLocalizedStrings.QRCodePopup.info}</Text>
        <Text style={styles.codeExpire}>
          {AppLocalizedStrings.QRCodePopup.codeExpire}
          <Text style={styles.timer}>09:29 mins</Text>
        </Text>
        <AdaptiveButton
          buttonStyle={styles.dismiss}
          title={AppLocalizedStrings.dimiss}
          onPress={props.onDismiss}
        />
      </View>
    </PopupContainer>
  );
};

export default QRCodePopup;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('6%'),
  },
  info: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.darkBlack,
    ),
    textAlign: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  codeExpire: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Medium',
      Colors.black,
    ),
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  timer: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Medium',
      Colors.primary,
    ),
  },
  dismiss: {
    marginTop: hp('2.5%'),
    paddingHorizontal: wp('15%'),
  },
});
