import {StyleSheet, View} from 'react-native';
import React from 'react';
import PopupContainer from './PopupContainer';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp} from '../../utility/responsive/ScreenResponsive';
import RadioView from '../app/filters/RadioView';
import Spacer from '../layout/Spacer';
import RangeSliderView from '../app/filters/RangeSliderView';
import QuarterView from '../app/filters/QuarterView';
import FilterActionView from '../app/filters/FilterActionView';

const TIMELINE_DATA = AppLocalizedStrings.filter.timeLineValues;
const INVOICE_STATUS = AppLocalizedStrings.filter.invoiceStatusValues;
const REEDEM_STATUS = AppLocalizedStrings.filter.reedemStatusValue;
const TRANSACTION_TYPES = AppLocalizedStrings.filter.transactionValues;

interface TransactionFilterPopupProps {
  pointsRangeTitle?: string;
  showRange?: boolean;
  showInvoiceStatus?: boolean;
  showReedem?: boolean;
  showTransaxtion?: boolean;
  onDismiss?: () => void;
  onApply: () => void;
  onClear: () => void;
}
const TransactionFilterPopup: React.FC<TransactionFilterPopupProps> = props => {
  const {
    showRange = true,
    showInvoiceStatus = true,
    showReedem = true,
    showTransaxtion = true,
    pointsRangeTitle = AppLocalizedStrings.filter.approvedPointsRange,
    onApply,
    onClear,
  } = props;
  return (
    <PopupContainer
      title={AppLocalizedStrings.filter.filters}
      showDismiss={true}
      showLine={false}
      onDismiss={props.onDismiss}>
      <View style={styles.main}>
        {showRange == true && (
          <RangeSliderView
            style={styles.rangeView}
            title={AppLocalizedStrings.filter.amountRange}
            min={0}
            max={100}
            value={[0, 100]}
          />
        )}
        <RadioView
          title={AppLocalizedStrings.filter.timeline}
          data={TIMELINE_DATA}
        />
        <Spacer height={hp(2.5)} />
        <QuarterView
          data={['Q1', 'Q2', 'Q3', 'Q4']}
          selectedIds={[]}
          onValueChange={() => {}}
        />
        <Spacer height={hp(2.5)} />
        <RangeSliderView
          style={styles.rangeView}
          title={pointsRangeTitle}
          min={0}
          max={100}
          value={[0, 100]}
        />
        {showInvoiceStatus == true && (
          <RadioView
            style={styles.radioView}
            title={AppLocalizedStrings.filter.invoiceStatus}
            data={INVOICE_STATUS}
          />
        )}
        {showTransaxtion == true && (
          <RadioView
            style={styles.radioView}
            title={AppLocalizedStrings.filter.transaction}
            data={TRANSACTION_TYPES}
          />
        )}
        {showReedem == true && (
          <RadioView
            style={styles.radioView}
            title={AppLocalizedStrings.filter.reedemStatus}
            data={REEDEM_STATUS}
          />
        )}
        <Spacer height={hp(1)} />
        <FilterActionView onApply={onApply} onClear={onClear} />
      </View>
    </PopupContainer>
  );
};

export default TransactionFilterPopup;

const styles = StyleSheet.create({
  main: {
    paddingTop: hp(1.5),
  },
  rangeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  radioView: {
    marginBottom: hp(2.5),
  },
});
