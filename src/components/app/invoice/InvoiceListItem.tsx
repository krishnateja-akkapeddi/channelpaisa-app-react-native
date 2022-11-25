import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import ImageView from '../../image/ImageView';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import SVGIcon from '../../../utility/svg/SVGIcon';
import InvoiceItem from '../../../models/interfaces/InvoiceItem';
import {getReviewStatusInfo} from '../../../models/enum/ReviewStatus';
import RootNavigation from '../../../navigation/RootNavigation';

interface InvoiceProps {
  item: InvoiceItem;
}

const InvoiceListItem: React.FC<InvoiceProps> = props => {
  const {item} = props;
  const statusInfo = getReviewStatusInfo(item.status);
  const viewStyle: ViewStyle[] = useMemo(
    () => [styles.statusText, {backgroundColor: statusInfo.color}],
    [item.status],
  );
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => RootNavigation.navigate('InvoiceDetailScreen')}>
      <View style={styles.listMainContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.imageContainer}>
            <ImageView source={{uri: item.url}} style={styles.imageStyle} />
          </View>
          <View style={styles.leftContainer}>
            <View style={styles.statusView}>
              <Text style={viewStyle}>{statusInfo.title}</Text>
            </View>
            <Spacer style={{height: hp('0.5%')}} />
            <View style={styles.middleContainer}>
              <View style={styles.commonView}>
                <Text style={styles.titleStyle}>Stockist Name</Text>
                <Text style={styles.commonStyle}>{item.stockistName}</Text>
              </View>
              <Spacer style={{width: wp('2%')}} />
              <View style={styles.leftSection}>
                <Text style={styles.titleStyle}>Invoice Date</Text>
                <Text style={styles.commonStyle}>{item.date}</Text>
              </View>
            </View>
            <Spacer style={{height: hp('2%')}} />
            <View style={styles.middleContainer}>
              <View style={styles.commonView}>
                <Text style={styles.titleStyle}>Customer Name</Text>
                <Text style={styles.commonStyle}>{item.customerName}</Text>
              </View>
              <Spacer style={{width: wp('2%')}} />
              <View style={styles.leftSection}>
                <Text style={styles.titleStyle}>Amount</Text>
                <Text style={styles.commonStyle}>{item.amount}</Text>
              </View>
            </View>
            <View style={styles.middleContainer}></View>
          </View>
        </View>
        <View style={styles.summeryContainer}>
          <SVGIcon name="info" size={hp('2%')} color="red" />
          <Text style={styles.summeryText}>{item.summary}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.informationContainer}
          onPress={() => RootNavigation.navigate('InvoiceDetailScreen')}>
          <Text style={styles.informationTextStyle}>More Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.supportContainer}
          onPress={() => RootNavigation.navigate('ContactSupportScreen')}>
          <Text style={styles.supportTextStyle}>Contact Support</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.starMark}>
        <SVGIcon name="mark" size={hp('3%')} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(InvoiceListItem);

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    position: 'relative',
  },
  listMainContainer: {
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 11,
  },
  imageStyle: {
    width: 90,
    height: 120,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: '#7F7F7F',
    marginVertical: hp('0.5'),
  },
  commonStyle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: '#474747',
    backgroundColor: 'white',
  },
  commonView: {
    flex: 1,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summeryText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginLeft: wp('2%'),
    flex: 1,
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    backgroundColor: '#FF5577',
    paddingHorizontal: hp('1.5%'),
  },
  statusTextSecond: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    backgroundColor: '#F89E1B',
    paddingHorizontal: hp('1.5%'),
  },
  hexCodeText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginBottom: hp('0.6%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {
    flex: 1,
    backgroundColor: '#F7DFC4',
    borderBottomLeftRadius: 10,
  },
  supportContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderBottomRightRadius: 10,
  },
  informationTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: hp('1%'),
  },
  supportTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: hp('1%'),
  },
  summeryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  leftContainer: {
    flex: 1,
    marginLeft: wp('3%'),
    justifyContent: 'center',
  },
  starMark: {
    position: 'absolute',
    zIndex: 10,
    top: -1,
    right: 15,
  },
});
