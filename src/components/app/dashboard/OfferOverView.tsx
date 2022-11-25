import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../button/AdaptiveButton';
import Spacer from '../../layout/Spacer';
import DashboardSectionHeader from './DashboardSectionHeader';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import SubscribeCard from '../../SubscribeCard';
import Carousel from '../../carousel/Carousel';
import {useCallback} from 'react';
import RootNavigation from '../../../navigation/RootNavigation';

const OfferOverView = () => {
  const [data, setData] = useState([
    'Mar 2022',
    'Feb 2022',
    'Jan 2022',
    'Dec 2021',
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const createContent = () => {
    return data.map((item, index) => {
      const isActive = index == selectedIndex;
      const bgColor = isActive ? Colors.white : Colors.lightGrey;
      const borderColor = isActive ? Colors.primary : Colors.lightGrey;
      return (
        <AdaptiveButton
          key={index}
          title={item}
          buttonStyle={{
            ...styles.btnDate,
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
          textStyle={styles.btnDateText}
          onPress={() => setSelectedIndex(index)}
        />
      );
    });
  };

  const renderItem = useCallback((item: string) => {
    const onPressPriceHandler = () => {};

    const onPressUploadHandler = () => {
      RootNavigation.navigate('InvoiceUploadScreen');
    };

    return (
      <SubscribeCard
        leftTitle={AppLocalizedStrings.subscription.upload}
        rightTitle="2,345"
        rightIcon="channelpaisa_logo"
        leftBtnStyle={styles.leftBtnView}
        rightBtnStyle={styles.rightBtnView}
        leftBtnTextStyle={styles.leftBtnText}
        rightBtnTextStyle={styles.rightBtnText}
        onPressLeft={onPressUploadHandler}
        onPressRight={onPressPriceHandler}
      />
    );
  }, []);

  return (
    <View>
      <Spacer height={hp(2.5)} />
      <DashboardSectionHeader
        headerTitle={AppLocalizedStrings.dashboard.offerover}
        iconName={'filter'}
        iconSize={wp(4.6)}
      />
      <Spacer height={hp(1)} />
      <ScrollView
        horizontal
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}>
        {createContent()}
      </ScrollView>
      <Spacer height={hp(2.5)} />
      <Carousel
        items={['1', '2', '3', '4', '5', '6', '7']}
        renderItem={renderItem}
      />
      <Spacer height={hp(2)} />
    </View>
  );
};
export default OfferOverView;

const styles = StyleSheet.create({
  btnDate: {
    height: hp(4.5),
    borderRadius: hp(1.5),
    paddingHorizontal: wp(4),
    marginRight: wp(1),
    borderWidth: 1,
  },
  btnDateText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.black,
    ),
  },
  leftBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 'auto',
  },
  rightBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 'auto',
  },
  leftBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  rightBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
