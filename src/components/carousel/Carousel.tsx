import {
  StyleSheet,
  View,
  ListRenderItemInfo,
  ViewStyle,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Colors from '../../theme/Colors';
import {wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import AppLoader from '../indicator/AppLoader';
import {useCallback} from 'react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  autoplayLoop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const kItemSpacing = 5;
const itemSeparatorComponent = () => <Spacer width={kItemSpacing} />;

const Carousel = <T,>(props: CarouselProps<T>) => {
  const [isLoaded, setIsLoaded] = useState(
    Platform.select({android: false, ios: true}),
  );

  const {
    items,
    autoplay = false,
    autoplayDelay = 2,
    autoplayLoop = false,
  } = props;

  const [swiperWidth, setSwiperWidth] = useState(0);

  const containerStyle: ViewStyle = useMemo(() => {
    if (Platform.OS == 'android') {
      setTimeout(() => {
        setIsLoaded(swiperWidth > 0);
      }, 500);
    }
    return {
      width: swiperWidth,
    };
  }, [swiperWidth]);

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<T>) => {
      return <View style={containerStyle}>{props.renderItem(item)}</View>;
    },
    [containerStyle],
  );

  const snapToOffsets = useMemo(
    () =>
      items.map((x, i) => {
        return i * swiperWidth + kItemSpacing * i;
      }),
    [items, swiperWidth],
  );

  return (
    <View
      style={styles.main}
      onLayout={e => setSwiperWidth(e.nativeEvent.layout.width)}>
      {isLoaded && (
        <SwiperFlatList
          horizontal
          snapToAlignment={'center'}
          pagingEnabled={false}
          decelerationRate={'fast'}
          bounces={false}
          snapToInterval={swiperWidth}
          snapToOffsets={snapToOffsets}
          disableIntervalMomentum={true}
          autoplay={autoplay}
          autoplayDelay={autoplayDelay}
          autoplayLoop={autoplayLoop}
          index={0}
          data={items}
          showPagination
          paginationActiveColor={Colors.primary}
          paginationDefaultColor={'#F89E1B50'}
          paginationStyle={styles.paginationStyle}
          paginationStyleItem={styles.paginationStyleItem}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
        />
      )}
      {!isLoaded && <AppLoader type="none" loading={true} />}
      <Spacer style={styles.spacer} />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  main: {width: '100%'},
  paginationStyle: {
    bottom: -15,
  },
  paginationStyleItem: {
    width: wp(2),
    aspectRatio: 1,
    marginHorizontal: wp(0.8),
  },
  spacer: {paddingBottom: 20, zIndex: -10},
});
