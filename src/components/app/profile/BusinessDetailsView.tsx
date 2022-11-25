import {Platform, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo, useState} from 'react';
import ProfileTextInput from './ProfileTextInput';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

interface BusinessDetailsViewProps {
  style?: ViewStyle;
}

const kSpacing = Platform.OS == 'android' ? hp(2.5) : hp(2.5);
const BusinessDetailsView: React.FC<BusinessDetailsViewProps> = props => {
  const {style} = props;
  const [businessName, setBusinessName] = useState('Vijay Medi Corp.');
  const [mobileNo, setMobileNo] = useState('+91-9898 965 965');
  const [DLNo, setDLNo] = useState('ABCDS60000D');
  const [PAN, setPAN] = useState('HUPJA5951K');
  const [GST, setGST] = useState('18AABCU9603R1ZM');

  const styleContainer = useMemo(() => [styles.container, style], [style]);
  return (
    <View style={styleContainer}>
      <ProfileTextInput
        title={AppLocalizedStrings.profile.businessName}
        value={businessName}
        onChangeText={setBusinessName}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.mobileNo}
        value={mobileNo}
        onChangeText={setMobileNo}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.dlNo}
        value={DLNo}
        onChangeText={setDLNo}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.panNo}
        value={PAN}
        onChangeText={setPAN}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        title={AppLocalizedStrings.profile.gstNo}
        value={GST}
        onChangeText={setGST}
      />
    </View>
  );
};

export default BusinessDetailsView;

const styles = StyleSheet.create({
  container: {},
});
