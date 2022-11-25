import React, {useCallback, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text,
} from 'react-native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import OrganisationList from '../../components/app/offers/OrganisationList';
import {AppLocalizedStrings} from '../../localization/Localization';
import OrganisationJson from '../../mock/Organisation.json';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import Picker, {DropDownItem} from '../../components/picker/Picker';
import WalletPointsView from '../../components/app/wallet/WalletPointsView';
import RedeemPoint from '../../components/app/wallet/RedeemPoint';
import RedeemPointDetail from '../../components/app/wallet/RedeemPointDetail';
import Spacer from '../../components/layout/Spacer';
import SegmentBar from '../../components/app/SegmentBar';
import Transactions from '../../mock/Transactions.json';
import Coupons from '../../mock/Coupons.json';
import TransactionCard from '../../components/app/wallet/TransactionCard';
import Transaction from '../../models/interfaces/Transaction';
import Coupon from '../../models/interfaces/Coupon';
import CouponCard from '../../components/app/wallet/CouponCard';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import TransactionFilterPopup from '../../components/popup/TransactionFilterPopup';
import ReedemRequestPopup from '../../components/popup/ReedemRequestPopup';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';

enum WalletMode {
  Transaction,
  Redeem,
  RedeemDetails,
}

enum TransactionMode {
  AllTransaction,
  CouponCode,
}

const kOrganisations = [
  {name: AppLocalizedStrings.viewAll, url: ''},
  ...OrganisationJson,
];

const pickerData: DropDownItem[] = [
  {label: 'Value 1', value: 1},
  {label: 'Value 2', value: 2},
  {label: 'Value 3', value: 3},
  {label: 'Value 4', value: 4},
  {label: 'Value 5', value: 5},
  {label: 'Value 6', value: 6},
];

const kScreenPadding = wp(5);
const segmentBarItems = [
  AppLocalizedStrings.wallet.allTransactions,
  AppLocalizedStrings.wallet.couponsCode,
];

const WalletScreen: React.FC<BottomTabScreenProps<'WalletScreen'>> = props => {
  const [transactions, setTransactions] = useState(
    Transactions as Transaction[],
  );
  const [coupons, setCoupons] = useState(Coupons as Coupon[]);
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const [mode, setMode] = useState(WalletMode.Transaction);
  const [redeemSelectTitle, setRedeemTitle] = useState('');
  const [transactionMode, setTransactionMode] = useState(
    TransactionMode.AllTransaction,
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);

  const onFilterHandler = useCallback(() => {
    setShowFilter(val => !val);
  }, []);

  const onTransactionModeChange = useCallback((index: number) => {
    setTransactionMode(index);
  }, []);

  const changeMode = useCallback((mode: WalletMode) => {
    setMode(mode);
  }, []);

  const onRedeemHandler = useCallback(() => {
    changeMode(WalletMode.Redeem);
  }, [changeMode]);

  const onRedeemSuccessHandler = useCallback(() => {
    setShowRedeem(true);
  }, []);

  const onGoToDashboardHandler = useCallback(
    (toDashboard = false) => {
      setShowRedeem(false);
      setMode(WalletMode.Transaction);
      if (toDashboard == true) {
        props.navigation.jumpTo('DashboardScreen');
      }
    },
    [props],
  );

  const onCompanySelect = (title: string) => {
    setRedeemTitle(title);
    changeMode(WalletMode.RedeemDetails);
  };

  const onApplyHandler = () => {
    setShowFilter(false);
  };
  const onClearHandler = () => {
    setShowFilter(false);
  };
  const onDismissHandler = () => {
    setShowFilter(false);
  };

  const organisationList = useMemo(() => {
    return (
      <View style={styles.topContainer}>
        <OrganisationList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          selectedIds={selectedIds}
          horizontal={true}
          showAll={true}
          data={kOrganisations}
          onSelect={ids => setSelectedIds(ids)}
        />
      </View>
    );
  }, [selectedIds]);

  const pickerView = useMemo(() => {
    return (
      <>
        <Text style={styles.selectDivision}>
          {AppLocalizedStrings.wallet.selectDivision}
        </Text>
        <Picker
          textStyle={styles.pickerText}
          style={styles.picker}
          items={pickerData}
        />
        <WalletPointsView onPress={onRedeemHandler} />
        <Spacer height={hp(2)} />
      </>
    );
  }, [onRedeemHandler]);

  const segmentContainer = useMemo(() => {
    return (
      <View style={styles.segmentContainer}>
        <SegmentBar
          containerStyle={styles.bar}
          selectedIndex={transactionMode}
          items={segmentBarItems}
          onValueChange={onTransactionModeChange}
        />
        <AdaptiveButton
          type="text"
          isReverse
          title={AppLocalizedStrings.filter.filter}
          icon="filter"
          iconSize={hp('2.3')}
          iconColor={Colors.primary}
          buttonStyle={styles.btnFilter}
          textStyle={styles.btnFilterText}
          onPress={onFilterHandler}
        />
      </View>
    );
  }, [transactionMode, onTransactionModeChange, onFilterHandler]);

  const listHeaderComponent = useCallback(() => {
    return (
      <>
        {organisationList}
        <View style={styles.bottomContainer}>
          {pickerView}
          {mode === WalletMode.Transaction && segmentContainer}
          {mode === WalletMode.Redeem && (
            <RedeemPoint
              onCompanySelect={onCompanySelect}
              onDismiss={changeMode.bind(this, WalletMode.Transaction)}
            />
          )}
          {mode === WalletMode.RedeemDetails && (
            <RedeemPointDetail
              onRedeem={onRedeemSuccessHandler}
              onDismiss={changeMode.bind(this, WalletMode.Redeem)}
              title={redeemSelectTitle}
            />
          )}
        </View>
      </>
    );
  }, [mode, organisationList, pickerView, onRedeemSuccessHandler]);

  const getDataSource = () => {
    return mode == WalletMode.Transaction
      ? transactionMode == TransactionMode.AllTransaction
        ? transactions
        : coupons
      : [];
  };

  const itemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparatorStyle} />;
  }, []);

  const keyExtractor = useCallback(
    (item: Transaction, index: number) => index.toString(),
    [],
  );

  const renderItem: ListRenderItem<Transaction | Coupon> = useCallback(
    ({item, index}) => {
      return (
        <View style={styles.listItem}>
          {transactionMode == TransactionMode.AllTransaction ? (
            <TransactionCard item={item} />
          ) : (
            <CouponCard item={item} />
          )}
        </View>
      );
    },
    [transactionMode],
  );

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <FlatList
        windowSize={2}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        ListHeaderComponent={listHeaderComponent}
        data={getDataSource()}
        ItemSeparatorComponent={itemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {showFilter && (
        <TransactionFilterPopup
          pointsRangeTitle={
            transactionMode === TransactionMode.AllTransaction
              ? AppLocalizedStrings.filter.approvedPointsRange
              : AppLocalizedStrings.filter.rewardPointsRange
          }
          showRange={transactionMode == TransactionMode.AllTransaction}
          showInvoiceStatus={transactionMode == TransactionMode.AllTransaction}
          showTransaxtion={transactionMode == TransactionMode.AllTransaction}
          showReedem={transactionMode == TransactionMode.CouponCode}
          onApply={onApplyHandler}
          onClear={onClearHandler}
          onDismiss={onDismissHandler}
        />
      )}
      {showRedeem && (
        <ReedemRequestPopup
          onDismiss={onGoToDashboardHandler.bind(this, false)}
          goToDashboard={onGoToDashboardHandler.bind(this, true)}
        />
      )}
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    paddingRight: wp(4),
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    shadowColor: Colors.darkBlack,
    backgroundColor: Colors.white,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 1},
  },
  flatList: {
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },
  flatListContent: {
    paddingHorizontal: kScreenPadding,
  },
  bottomContainer: {
    flex: 1,
    paddingVertical: kScreenPadding,
    marginHorizontal: kScreenPadding,
  },
  searchBarView: {
    marginBottom: hp(2),
  },

  pickerText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  picker: {
    height: hp(5),
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: wp(3),
    borderRadius: Style.kBorderRadius,
    marginBottom: hp(2),
  },
  details: {
    marginVertical: hp(2),
  },
  bar: {
    marginTop: hp(1),
  },
  itemSeparatorStyle: {
    height: hp(1.8),
  },
  listItem: {
    marginHorizontal: kScreenPadding,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFilter: {paddingHorizontal: 0, height: 'auto'},
  btnFilterText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.black,
    ),
    paddingEnd: wp(2),
  },
  selectDivision: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
    marginBottom: wp(2),
  },
});
