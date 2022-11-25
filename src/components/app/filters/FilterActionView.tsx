import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AdaptiveButton from '../../button/AdaptiveButton';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Spacer from '../../layout/Spacer';

interface FilterActionViewProps {
  onApply: () => void;
  onClear: () => void;
}
const FilterActionView: React.FC<FilterActionViewProps> = props => {
  return (
    <View style={styles.btnContainer}>
      <AdaptiveButton
        buttonStyle={styles.btnApplyFilter}
        type="light"
        title={AppLocalizedStrings.filter.clearAllFilter}
        onPress={props.onClear}
      />
      <Spacer width={wp(3)} />
      <AdaptiveButton
        buttonStyle={styles.btnApplyFilter}
        title={AppLocalizedStrings.filter.applyFilters}
        onPress={props.onApply}
      />
    </View>
  );
};

export default FilterActionView;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  },
  btnApplyFilter: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
