import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SVGIcon from '../../../utility/svg/SVGIcon';
import Spacer from '../../layout/Spacer';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import ImageView from '../../image/ImageView';
import ProgressBar from '../wallet/ProgressBar';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import AlertView from './AlertView';
import Carousel from '../../carousel/Carousel';

const InvoiceDetailHeader = () => {
  const barItems: {title: string; date: string}[] = [
    {title: 'Upload Date', date: '12 Apr, 4:04 PM'},
    {title: ' Processed Date', date: '13 Apr, 4:04 PM'},
    {title: 'Approval Date', date: '15 Apr, 4:04 PM'},
  ];

  const renderItem = useCallback((item: string) => {
    return (
      <View style={styles.imageView}>
        <ImageView
          style={{height: hp('25%')}}
          source={{
            uri: 'https://i.picsum.photos/id/1016/3844/2563.jpg?hmac=WEryKFRvTdeae2aUrY-DHscSmZuyYI9jd_-p94stBvc',
          }}
        />
      </View>
    );
  }, []);

  return (
    <View>
      <AlertView />
      {/* <View style={styles.rowContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.astraText}>Astrazeneca</Text>
          <Text style={styles.addessText}>
            Govind Mirta Road, Ambika Palace, Patna, Bihar, India - 800004
          </Text>
        </View>
        <View style={styles.iconBox}>
          <SVGIcon name="info" size={16} color={Colors.primary} />
        </View>
        <Text style={styles.supportText}>Help</Text>
      </View> */}
      <View style={styles.invoiceDetail}>
        <View style={styles.starMark}>
          <SVGIcon name="mark" size={hp('3%')} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.detailView}>
            <View style={styles.rowView}>
              <View style={[styles.expand, {alignItems: 'flex-start'}]}>
                <Text style={styles.titleStyle}>Invoice</Text>
                <Text style={styles.valueStyle}>#458-845</Text>
              </View>
              <View style={styles.expand}>
                <Text style={styles.titleStyle}>Uploaded On</Text>
                <Text style={styles.valueStyle}>31 Jul, 2022</Text>
              </View>
              <View style={styles.expand}></View>
            </View>
            <Spacer height={hp('2%')} />
            <View style={styles.rowView}>
              <View style={[styles.expand, {alignItems: 'flex-start'}]}>
                <Text style={styles.titleStyle}>Customer Name</Text>
                <Text style={styles.valueStyle}>Prem Suthar</Text>
              </View>
              <View style={styles.expand}>
                <Text style={styles.titleStyle}>Ammount</Text>
                <Text style={styles.valueStyle}>₹ 12,596</Text>
              </View>
              <View style={[styles.expand, {alignItems: 'flex-end'}]}>
                <Text style={styles.titleStyle}>Invoice Date</Text>
                <Text style={styles.valueStyle}>31 Jul, 2021</Text>
              </View>
            </View>
          </View>
        </View>
        <Carousel
          items={['1', '2', '3', '4', '5', '6', '7']}
          renderItem={renderItem}
        />
        <Spacer height={hp(1.5)} />
        <View>
          <ProgressBar
            items={barItems}
            completedSteps={1}
            style={{paddingHorizontal: 0, width: '100%'}}
          />
        </View>
      </View>
      <View style={styles.lineView} />
      <View style={styles.bottomBar}>
        <View style={{flex: 1}}>
          <Text style={styles.barTitleText}>Products</Text>
        </View>
        <Text style={styles.barTitleText}>Points</Text>
        <Spacer width={wp('14%')} />
        <Text style={styles.barTitleText}>Qty</Text>
      </View>
    </View>
  );
};

export default InvoiceDetailHeader;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  astraText: {
    fontSize: Fonts.getFontSize('headline4'),
    color: '#474747',
    fontFamily: Fonts.getFontFamily('Regular'),
  },
  addessText: {
    fontSize: Fonts.getFontSize('headline6'),
    color: '#474747',
    fontFamily: Fonts.getFontFamily('Regular'),
  },

  iconBox: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: wp('2%'),
  },
  supportText: {
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    fontFamily: Fonts.getFontFamily('Regular'),
  },
  invoiceDetail: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    padding: hp('2%'),
    marginVertical: 20,
    position: 'relative',
  },
  starMark: {
    position: 'absolute',
    zIndex: 10,
    top: -1,
    right: 15,
  },
  detailView: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: '#7F7F7F',
  },
  valueStyle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginTop: hp('0.3%'),
  },
  imageView: {
    borderColor: '#BEBED3',
    borderWidth: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    paddingHorizontal: 4,
  },
  lineView: {
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
  },
  barTitleText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline3'),
    color: Colors.black,
  },
  expand: {
    flex: 1,
    alignItems: 'center',
  },
});
