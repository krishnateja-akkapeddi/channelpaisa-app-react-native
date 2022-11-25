import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';

const EarningDetailSectionView = () => {
  return (
    <View>
      <Spacer height={hp('2')} />
      <View style={[styles.detailsTopView]}>
        <View style={[styles.titleView]}>
          <Text style={styles.btnDateText}>
            {AppLocalizedStrings.dashboard.currenearning}
          </Text>
          <Text style={[styles.walletRate, {color: Colors.darkBlack}]}>
            ₹ 5050.00
          </Text>
        </View>
        <View style={styles.spacerLine} />
        <View style={[styles.titleView]}>
          <Text style={styles.btnDateText}>
            {AppLocalizedStrings.dashboard.lastearning}
          </Text>
          <Text style={[styles.walletRate, {color: Colors.darkBlack}]}>
            ₹ 1250.00
          </Text>
        </View>
      </View>
      <Spacer height={hp('3')} />
    </View>
  );
};

export default EarningDetailSectionView;
const styles = StyleSheet.create({
  detailsTopView: {
    height: wp('21%'),
    backgroundColor: Colors.lightYellow,
    borderRadius: 12,
  },
  titleView: {
    height: wp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  btnDateText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.black,
    ),
  },
  walletRate: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
  spacerLine: {
    height: wp('0.3%'),
    backgroundColor: Colors.white,
    marginHorizontal: 20,
  },
});
