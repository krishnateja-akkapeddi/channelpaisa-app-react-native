import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import InvoiceDateList from './InvoiceDateList';
import InvoiceStatusCardList from './InvoiceStatusCardList';
import InvoiceFilterView from './InvoiceFilterView';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
interface InvoiceCombineCmptProps {
  onFilterHandler: () => void;
}

const InvoiceCombineCmpt = (props: InvoiceCombineCmptProps) => {
  return (
    <>
      <View style={styles.invoiceContainer}>
        <Text>{AppLocalizedStrings.invoice.invoiceOverview}</Text>
      </View>
      <InvoiceDateList />
      <InvoiceStatusCardList />
      <InvoiceFilterView onFilterHandler={props.onFilterHandler} />
    </>
  );
};

export default memo(InvoiceCombineCmpt);

const styles = StyleSheet.create({
  invoiceContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1.8%'),
  },
});
