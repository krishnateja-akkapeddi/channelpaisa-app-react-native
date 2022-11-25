import {Platform, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo, useState} from 'react';
import ProfileTextInput from './ProfileTextInput';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

interface PersonalDetailsViewProps {
  style?: ViewStyle;
}

const kSpacing = Platform.OS == 'android' ? hp(2.5) : hp(2.5);
const PersonalDetailsView: React.FC<PersonalDetailsViewProps> = props => {
  const {style} = props;
  const [emailId, setEmailId] = useState('sandeepsuthar4582@gmail.com');
  const [mobileNo, setMobileNo] = useState('+91-9898 965 965');
  const [whatsAppNo, setWhatsAppNo] = useState('+91-9898 965 965');
  const [address, setAddress] = useState(
    '78, A-Block, Hiranandani Estate, Thane',
  );

  const styleContainer = useMemo(() => [styles.container, style], [style]);
  return (
    <View style={styleContainer}>
      <ProfileTextInput
        title={AppLocalizedStrings.profile.emailId}
        value={emailId}
        onChangeText={setEmailId}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.mobileNo}
        value={mobileNo}
        onChangeText={setMobileNo}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.whatsAppNo}
        value={whatsAppNo}
        onChangeText={setWhatsAppNo}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.address}
        value={address}
        onChangeText={setAddress}
      />
    </View>
  );
};

export default PersonalDetailsView;

const styles = StyleSheet.create({
  container: {},
});
