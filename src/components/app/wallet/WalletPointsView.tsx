import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PriceChipView from './PriceChipView';
import Spacer from '../../layout/Spacer';
import AdaptiveButton from '../../button/AdaptiveButton';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';

interface WalletPointsViewProps {
  onPress: () => void;
}

const WalletPointsView: React.FC<WalletPointsViewProps> = props => {
  const {onPress} = props;

  return (
    <View style={styles.mainCardStyle}>
      <Text style={styles.textSelectTitel}>Pfizer</Text>
      <Spacer height={hp(2)} />
      <View style={styles.viewStyle}>
        <PriceChipView
          title={AppLocalizedStrings.wallet.pointRecive}
          titleNumberLine={2}
          price="850.00"
          backGroundColor={Colors.lightGreen}
          onPress={() => {
            console.log('SuccesFull');
          }}
        />
        <Spacer width={wp(2.5)} />
        <PriceChipView
          title={AppLocalizedStrings.wallet.pendingPoint}
          titleNumberLine={2}
          price="850.00"
          backGroundColor={Colors.lightPink}
          onPress={() => {
            console.log('SuccesFull');
          }}
        />
      </View>
      <Spacer height={hp(1)} />
      <View style={[styles.viewStyle]}>
        <PriceChipView
          title={AppLocalizedStrings.wallet.redeemablePoints}
          titleNumberLine={2}
          price="850.00"
          backGroundColor={Colors.lightYellow}
          onPress={() => {
            console.log('SuccesFull');
          }}
        />
        <Spacer width={wp(2.5)} />
        <AdaptiveButton
          buttonStyle={styles.btn}
          type="light"
          title={AppLocalizedStrings.wallet.redeemNow}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default WalletPointsView;

const styles = StyleSheet.create({
  textSelectTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
  viewStyle: {
    flexDirection: 'row',
  },
  mainCardStyle: {
    flexDirection: 'column',
  },
  btn: {
    height: wp(13),
    flex: 1,
    paddingHorizontal: 0,
  },
});
