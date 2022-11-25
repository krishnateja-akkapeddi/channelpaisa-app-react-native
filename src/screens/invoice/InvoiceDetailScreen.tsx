import {View, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../../components/layout/Spacer';
import InvoicePointData from '../../mock/InvoicePointData.json';
import {FlatList} from 'react-native-gesture-handler';
import InvoiceDetailView from '../../components/app/invoice/InvoiceDetailView';
import InvoiceDetailHeader from '../../components/app/invoice/InvoiceDetailHeader';
import InvoiceDetailFooter from '../../components/app/invoice/InvoiceDetailFooter';

const InvoiceDetailScreen = () => {
  const [data, setdata] = useState(InvoicePointData);

  const listHeaderView = () => {
    return <InvoiceDetailHeader />;
  };

  const footerComponent = () => {
    return <InvoiceDetailFooter />;
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <Spacer height={hp('1%')} />}
          ListHeaderComponent={listHeaderView}
          ListFooterComponent={footerComponent}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <InvoiceDetailView item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default InvoiceDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    marginHorizontal: hp('2%'),
    marginTop: hp('1.5%'),
  },
});
