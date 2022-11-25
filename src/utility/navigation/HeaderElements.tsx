import React, {ReactNode} from 'react';
import {RootAllMixedParamList} from '../../navigation/navigator/types';
import HeaderRightView from '../../components/app/header/HeaderRightView';
import NavigationOptionProps from '../../models/interfaces/NavigationOptionProps';
import RootNavigation from '../../navigation/RootNavigation';
import {DrawerActions} from '@react-navigation/native';
import Colors from '../../theme/Colors';
import {wp} from '../responsive/ScreenResponsive';
import {StyleSheet} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';

const isHeaderVisible = (routeName: string): boolean => {
  const name = routeName as keyof RootAllMixedParamList;
  switch (name) {
    case 'LoginScreen':
    case 'LocationPermissionScreen':
      return false;
    default:
      return true;
  }
};

const getHeaderRight = (
  canGoBack: boolean,
  routeName: string,
): ReactNode | undefined => {
  const name = routeName as keyof RootAllMixedParamList;
  switch (name) {
    case 'SplashScreen':
    case 'LoginScreen':
    case 'MobileScreen':
    case 'EnterOTPScreen':
    case 'EnterGSTScreen':
    case 'EnterDetailsScreen':
    case 'DocumentUploadScreen':
    case 'ChooseOrganisationScreen':
    case 'CompleteKYCScreen':
    case 'NotificationScreen':
      return undefined;
    case 'InvoiceDetailScreen':
      return (
        <HeaderRightView
          showOffers={false}
          showHelp={true}
          showQRCode={false}
        />
      );
    case 'ProfileScreen':
      return <HeaderRightView showQRCode={false} showOffers={true} />;
    default:
      return <HeaderRightView showQRCode={!canGoBack} />;
  }
};

const getHeaderLeft = (
  canGoBack: boolean,
  navigation: NavigationOptionProps,
  backIconColor: string | undefined,
  routeName: string,
): ReactNode | undefined => {
  const showHeader = isHeaderVisible(routeName);
  if (showHeader == false) {
    return undefined;
  }
  return canGoBack ? (
    <AdaptiveButton
      type="text"
      buttonStyle={styles.headerLeftButton}
      icon="arrow_back"
      iconSize={wp('6%')}
      iconColor={backIconColor ?? Colors.darkBlack}
      onPress={() => navigation.navigation.goBack()}
    />
  ) : (
    <AdaptiveButton
      type="text"
      buttonStyle={styles.headerLeftButton}
      icon="menu"
      iconColor={Colors.black}
      iconSize={wp('7%')}
      onPress={() =>
        RootNavigation.navigation.dispatch(DrawerActions.openDrawer())
      }
    />
  );
};

export default {getHeaderLeft, getHeaderRight};

const styles = StyleSheet.create({
  headerLeftButton: {
    paddingHorizontal: 0,
    height: 'auto',
  },
});
