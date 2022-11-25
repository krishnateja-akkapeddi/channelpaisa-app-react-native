import {StyleSheet, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import ImageView from '../../components/image/ImageView';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';
import PriorityNotificationList from '../../components/app/dashboard/PriorityNotificationList';
import WalletOverView from '../../components/app/dashboard/WalletOverView';
import SuggestionList from '../../components/app/dashboard/SuggestionList';
import OfferOverView from '../../components/app/dashboard/OfferOverView';
import Carousel from '../../components/carousel/Carousel';

const DashboardScreen: React.FC<
  BottomTabScreenProps<'DashboardScreen'>
> = props => {
  const notificatios = [
    AppLocalizedStrings.dashboard.kycpending,
    AppLocalizedStrings.dashboard.targetachi,
  ];
  const suggestionData = [
    AppLocalizedStrings.dashboard.youproductx,
    AppLocalizedStrings.dashboard.youproductx,
  ];

  const renderItem = useCallback((item: string) => {
    return (
      <ImageView
        style={styles.banner}
        source={'https://picsum.photos/seed/picsum/500/200'}
      />
    );
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Carousel
        autoplay={true}
        autoplayLoop={true}
        autoplayDelay={4}
        items={['1', '2', '3']}
        renderItem={renderItem}
      />
      <PriorityNotificationList items={notificatios} />
      <OfferOverView />
      <WalletOverView />
      <SuggestionList items={suggestionData} />
    </ScrollView>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
    paddingTop: hp(1),
  },
  banner: {
    height: wp(34),
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
});
