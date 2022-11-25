import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import FilterSectionTitle from './FilterSectionTitle';
import Spacer from '../../layout/Spacer';
import Slider from '../../slider/Slider';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

interface RangeSliderViewProps {
  title?: string;
  style?: ViewStyle;
  min?: number;
  max?: number;
  value?: number[] | number;
}
const RangeSliderView: React.FC<RangeSliderViewProps> = props => {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const value = props.value ?? [min, max];
  const styleContainer = useMemo(
    () => [styles.container, props.style],
    [props.style],
  );
  return (
    <View style={styleContainer}>
      <View style={styles.title}>
        <FilterSectionTitle title={props.title ?? ''} />
      </View>
      <Spacer width={wp(6)} />
      <Slider min={min} max={max} value={value} />
    </View>
  );
};

export default RangeSliderView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {width: wp(30)},
});
