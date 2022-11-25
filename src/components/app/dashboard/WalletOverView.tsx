import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import PriceChipView from '../wallet/PriceChipView';
import DashboardSectionHeader from './DashboardSectionHeader';
import EarningDetailSectionView from './EarningDetailSectionView';
import OrganisationList from '../offers/OrganisationList';
import OrganisationJson from '../../../mock/Organisation.json';
import Slider from '../../slider/Slider';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import RootNavigation from '../../../navigation/RootNavigation';

const WalletOverView = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const goToWalletHandler = () => {
    RootNavigation.navigate('WalletScreen');
  };
  return (
    <View>
      <DashboardSectionHeader
        headerTitle={AppLocalizedStrings.dashboard.walletover}
        title={AppLocalizedStrings.dashboard.gotowallet}
        iconName={'rightarrow'}
        onPress={goToWalletHandler}
      />
      <Spacer height={hp(1)} />
      <View style={styles.mainView}>
        <PriceChipView
          title={AppLocalizedStrings.dashboard.redeemablepoints}
          titleNumberLine={2}
          price="850.00"
          isTitleColorActive={true}
          titleColor={'#FFFFFF'}
          isPriceColorActive={true}
          priceColor={'#FFFFFF'}
          backGroundColor={'#474747'}
          onPress={() => {
            console.log('SuccesFull');
          }}
        />
        <Spacer width={wp(2.5)} />
        <PriceChipView
          title={AppLocalizedStrings.dashboard.pendingpoints}
          titleNumberLine={2}
          price="50.00"
          isTitleColorActive={false}
          backGroundColor={'#E5E5E5'}
          onPress={() => {
            console.log('SuccesFull');
          }}
        />
      </View>
      <EarningDetailSectionView />
      <DashboardSectionHeader
        headerTitle={AppLocalizedStrings.dashboard.target}
      />
      <Spacer height={hp(1)} />
      <OrganisationList
        isRounded={false}
        selectedIds={selectedIds}
        horizontal={true}
        showAll={false}
        data={OrganisationJson}
        onSelect={ids => setSelectedIds(ids)}
      />
      <Spacer height={hp(2)} />
      <Slider
        showValue={true}
        min={0}
        max={100}
        value={50}
        // disabled={true}
        thumbText="3 days left"
        trackStyle={styles.trackStyle}
        thumbStyle={styles.thumbStyle}
        textStyle={styles.valueText}
      />
      <Spacer height={hp(1)} />
    </View>
  );
};
export default WalletOverView;

const styles = StyleSheet.create({
  mainView: {flexDirection: 'row', justifyContent: 'space-between'},
  rangeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  trackStyle: {
    height: wp(1.8),
    borderRadius: wp(1.8) / 2,
  },
  thumbStyle: {
    height: wp(6.5),
    width: 'auto',
    aspectRatio: 1,
    borderRadius: wp(6.5) / 2,
    backgroundColor: Colors.white,
    borderWidth: 3.2,
    borderColor: Colors.primary,
  },
  valueText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.black,
    ),
  },
});
