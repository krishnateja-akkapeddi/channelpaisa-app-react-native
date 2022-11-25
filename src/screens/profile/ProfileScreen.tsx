import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import KeyboardAvoidingView from '../../components/keyboard/KeyboardAvoidingView';
import ImageView from '../../components/image/ImageView';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import SVGIcon from '../../utility/svg/SVGIcon';
import BusinessDetailsView from '../../components/app/profile/BusinessDetailsView';
import PersonalDetailsView from '../../components/app/profile/PersonalDetailsView';
import SegmentBar from '../../components/app/SegmentBar';
import {AppLocalizedStrings} from '../../localization/Localization';

enum ProfileMode {
  Personal,
  Business,
}
const ProfileScreen = () => {
  const segmentBarItems = [
    AppLocalizedStrings.profile.personalDetails,
    AppLocalizedStrings.profile.businessDetails,
  ];
  const [mode, setMode] = useState(ProfileMode.Personal);
  const onValueChange = (index: number) => {
    setMode(index);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.container}>
          <View style={styles.upperView}>
            <ImageView
              style={styles.profilePic}
              source={'https://picsum.photos/seed/picsum/200/300'}
            />
            <Text style={styles.name}>Mr. Rakesh Mishra</Text>
            <Text style={styles.company}>Vijay Medi Corp., Thane</Text>
            <SVGIcon name="qrcode" size={wp(25)} color={Colors.black} />
          </View>
          <SegmentBar
            containerStyle={styles.bar}
            selectedIndex={mode}
            items={segmentBarItems}
            onValueChange={onValueChange}
          />
          {mode == ProfileMode.Business ? (
            <BusinessDetailsView style={styles.details} />
          ) : (
            <PersonalDetailsView style={styles.details} />
          )}
          <Text style={styles.appVersion}>
            {AppLocalizedStrings.profile.appVersion + 'v2.6'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyboard: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: hp(6),
  },
  container: {
    width: '100%',
    paddingHorizontal: wp(5),
  },
  upperView: {alignItems: 'center'},
  profilePic: {
    marginTop: hp(2),
    width: wp(20),
    aspectRatio: 1,
    borderRadius: wp(20) / 2,
  },
  name: {
    marginTop: hp(2.3),
    ...Style.getTextStyle(Fonts.getFontSize('headline2'), 'Bold', Colors.black),
  },
  company: {
    marginTop: hp(0.2),
    marginBottom: hp(3),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
  },
  details: {
    marginTop: hp(3),
    marginBottom: hp(5),
  },
  bar: {
    marginTop: hp(4),
  },
  appVersion: {
    alignSelf: 'flex-end',
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.grey,
    ),
    marginBottom: hp(3),
  },
});
