import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {getListStatusInfo} from '../../../models/enum/InvoiceProductStatus';
import InvoiceProduct from '../../../models/interfaces/InvoiceProduct';

interface InvoiceDetailViewProps {
  item: InvoiceProduct;
}

const InvoiceDetailView: React.FC<InvoiceDetailViewProps> = props => {
  const {item} = props;
  const statusInfo = getListStatusInfo(item.status);
  const ViewStyle: ViewStyle[] = useMemo(
    () => [styles.mainView, {backgroundColor: statusInfo.color}],
    [item.status],
  );
  return (
    <View style={ViewStyle}>
      <View style={styles.secondView}>
        <View style={styles.nameView}>
          <Text style={styles.valueText}>{item.name}</Text>
        </View>
        <Text style={styles.valueText}>{item.points}</Text>
        <Spacer width={wp('20%')} />
        <Text style={styles.valueText}>{item.qty}</Text>
      </View>
      {item.reason != '' && <Text style={styles.reason}>{item.reason}</Text>}
    </View>
  );
};

export default InvoiceDetailView;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 8,
    backgroundColor: 'pink',
    borderRadius: 10,
    paddingVertical: hp('1%'),
  },
  secondView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameView: {
    flex: 1,
  },
  valueText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
  reason: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.black,
  },
});
