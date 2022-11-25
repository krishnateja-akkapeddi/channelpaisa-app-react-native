import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp} from '../../../utility/responsive/ScreenResponsive';

interface ProfileTextInputProps {
  title?: string;
  placeholder?: string;
  style?: ViewStyle;
  value?: string;
  onChangeText?: (arg0: string) => void;
}

const ProfileTextInput: React.FC<ProfileTextInputProps> = props => {
  const {placeholder, title, style, value, onChangeText} = props;
  const [editable, setEditable] = useState(false);
  const onEdit = useCallback(() => {
    setEditable(val => !val);
  }, []);

  const styleContainer = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={styleContainer}>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>{title}</Text>
        <AdaptiveButton
          buttonStyle={styles.edit}
          textStyle={styles.editText}
          type="text"
          title={editable ? AppLocalizedStrings.save : AppLocalizedStrings.edit}
          onPress={onEdit}
        />
      </View>
      <TextInput
        value={value}
        editable={editable}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default ProfileTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  upperContainer: {
    paddingHorizontal: 4,
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: Math.min(hp('5%'), 35),
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    paddingBottom: Platform.OS == 'android' ? 7 : 0,
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.grey),
  },
  title: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
  },
  edit: {
    height: 'auto',
  },
  editText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.primary,
    ),
  },
});
