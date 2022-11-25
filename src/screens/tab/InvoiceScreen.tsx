import React, {useCallback, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import SearchBar from '../../components/app/SearchBar';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import InvoiceLists from '../../mock/InvoiceList.json';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import InvoiceListItem from '../../components/app/invoice/InvoiceListItem';
import InvoiceCombineCmpt from '../../components/app/invoice/InvoiceCombineCmpt';
import {AppLocalizedStrings} from '../../localization/Localization';
import InvoiceItem from '../../models/interfaces/InvoiceItem';
import TransactionFilterPopup from '../../components/popup/TransactionFilterPopup';

const InvoiceScreen = () => {
  const [invoices, setInvoices] = useState(InvoiceLists);
  const [showFilter, setShowFilter] = useState(false);

  const onFilterHandler = useCallback(() => {
    setShowFilter(val => !val);
  }, []);

  const listHeaderComponent = useCallback(() => {
    return <InvoiceCombineCmpt onFilterHandler={onFilterHandler} />;
  }, []);

  const onApplyHandler = () => {
    setShowFilter(false);
  };
  const onClearHandler = () => {
    setShowFilter(false);
  };
  const onDismissHandler = () => {
    setShowFilter(false);
  };

  const renderItem = useCallback(({item}: ListRenderItemInfo<InvoiceItem>) => {
    return <InvoiceListItem item={item} />;
  }, []);

  const keyExtractor = useCallback(
    (item: InvoiceItem, index: number) => index.toString(),
    [],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.topView}>
        <SearchBar
          placeholder={AppLocalizedStrings.search.enterDepartmentName}
        />
      </View>
      <View style={styles.keyboard}>
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={invoices}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: hp('2%')}} />}
            ListHeaderComponent={listHeaderComponent}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
      {showFilter && (
        <TransactionFilterPopup
          pointsRangeTitle={AppLocalizedStrings.filter.approvedPointsRange}
          showTransaxtion={false}
          showReedem={false}
          onApply={onApplyHandler}
          onClear={onClearHandler}
          onDismiss={onDismissHandler}
        />
      )}
    </SafeAreaView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
  keyboard: {
    flex: 1,
    marginHorizontal: hp('2%'),
  },
  invoiceTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
  listContainer: {flex: 1},
  contentContainerStyle: {paddingBottom: hp(2)},
});
