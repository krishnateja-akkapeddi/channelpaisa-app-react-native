import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import OfferJson from '../../mock/Offers.json';
import OfferListComponent from '../../components/app/offers/OfferListComponent';
import OfferHeaderComponent from '../../components/app/offers/OfferHeaderComponent';
import OfferCalculatorPopup from '../../components/popup/OfferCalculatorPopup';

interface Offer {
  name: string;
  image: string;
  pointText: string;
  percentage: string;
  minOrder: string;
}

const OffersScreen = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [tab, setTab] = useState(OfferJson);
  const header = useCallback(() => {
    return <OfferHeaderComponent />;
  }, []);

  const renderItem: ListRenderItem<Offer> = useCallback(({item}) => {
    const onItemPress = () => {
      setShowCalculator(val => !val);
    };
    return (
      <TouchableOpacity onPress={onItemPress} style={styles.itemContainer}>
        <OfferListComponent item={item} />
      </TouchableOpacity>
    );
  }, []);

  const itemSeprator = useCallback(
    () => <View style={styles.itemSeparatorStyle} />,
    [],
  );

  const onDismissCalculator = useCallback(() => {
    setShowCalculator(val => !val);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        alwaysBounceVertical={false}
        data={tab}
        removeClippedSubviews={false}
        ListHeaderComponent={header}
        ItemSeparatorComponent={itemSeprator}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      {showCalculator && (
        <OfferCalculatorPopup onDismiss={onDismissCalculator} />
      )}
    </SafeAreaView>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemSeparatorStyle: {
    height: hp('2.5%'),
  },
  itemContainer: {marginHorizontal: hp(2)},
});
