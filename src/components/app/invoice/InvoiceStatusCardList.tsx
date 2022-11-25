import {View, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import InvoiceCard from './InvoiceCard';
import InvoiceCardData from '../../../mock/InvoiceCard.json';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const InvoiceStatusCardList = () => {
  const [card, setCard] = useState(InvoiceCardData);
  return (
    <View style={styles.cardlistContainer}>
      <FlatList
        data={card}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: wp('5%')}} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <InvoiceCard
            status={item.status}
            totalInvoice={item.totalInvoice}
            invoiceText={item.invoiceText}
            rupees={item.rupees}
            rewardPointText={item.rewardPoint}
            buttonStyle={{backgroundColor: item.color}}
          />
        )}
      />
    </View>
  );
};

export default InvoiceStatusCardList;

const styles = StyleSheet.create({
  cardlistContainer: {
    marginTop: hp('2%'),
  },
});
