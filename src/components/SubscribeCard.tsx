import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import React, {useMemo} from 'react';
import ImageView from './image/ImageView';
import {hp} from '../utility/responsive/ScreenResponsive';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import AdaptiveButton from './button/AdaptiveButton';

interface SubscribeCardProps {
  leftTitle: string;
  rightTitle?: string;
  leftBtnStyle?: ViewStyle;
  rightBtnStyle?: ViewStyle;
  leftBtnTextStyle?: TextStyle;
  rightBtnTextStyle?: TextStyle;
  rightIcon?: string;
  onPressLeft: () => void;
  onPressRight: () => void;
}

const SubscribeCard = (props: SubscribeCardProps) => {
  const {
    leftTitle,
    rightTitle,
    leftBtnStyle,
    rightBtnStyle,
    leftBtnTextStyle,
    rightBtnTextStyle,
    onPressLeft,
    onPressRight,
    rightIcon,
  } = props;

  const leftBtnViewStyle = useMemo(() => {
    return {...styles.leftBtnView, ...leftBtnStyle};
  }, [leftBtnStyle]);

  const rightBtnViewStyle = useMemo(() => {
    return {...styles.rightBtnView, ...rightBtnStyle};
  }, [rightBtnStyle]);

  const leftBtnText = useMemo(() => {
    return {...styles.leftBtnText, ...leftBtnTextStyle};
  }, [leftBtnTextStyle]);
  const rightBtnText = useMemo(() => {
    return {...styles.rightBtnText, ...rightBtnTextStyle};
  }, [rightBtnTextStyle]);

  return (
    <View style={styles.bottomContainer}>
      <ImageView
        style={styles.imageStyle}
        source={require('../assets/images/offer.png')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.offerText}>
          25 channel partners are subscribed to this offer in your district
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AdaptiveButton
          title={leftTitle}
          buttonStyle={leftBtnViewStyle}
          textStyle={leftBtnText}
          onPress={onPressLeft}
        />
        <AdaptiveButton
          icon={rightIcon}
          title={rightTitle}
          buttonStyle={rightBtnViewStyle}
          textStyle={rightBtnText}
          onPress={onPressRight}
        />
      </View>
    </View>
  );
};

export default SubscribeCard;

const styles = StyleSheet.create({
  imageStyle: {
    height: 275,
    resizeMode: 'cover',
    width: '100%',
  },
  offerText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.bold,
    color: '#474747',
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: '#E5E5E5',
    paddingVertical: hp('1%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBtnView: {
    flex: 1,
    backgroundColor: '#F7DFC4',
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  rightBtnView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  leftBtnText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: hp('2%'),
  },
  rightBtnText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: hp('2%'),
  },
  bottomContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
