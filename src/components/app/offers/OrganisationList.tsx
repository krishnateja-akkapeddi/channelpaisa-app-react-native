import {FlatList, StyleSheet, ViewStyle} from 'react-native';
import React, {useState, useMemo} from 'react';
import DepartmentItem from './DepartmentItem';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';

export interface Organisation {
  name: string;
  url: string;
}

interface OrganisationListProps {
  showsHorizontalScrollIndicator?: boolean;
  isRounded?: boolean;
  selectedIds: number[];
  multiSelect?: boolean;
  data: Organisation[];
  showAll: boolean;
  horizontal?: boolean;
  numColumns?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onSelect?: (arg0: number[]) => void;
}

const OrganisationList: React.FC<OrganisationListProps> = props => {
  const [data, setData] = useState(props.data);
  const [selectedIds, setSelectedIds] = useState<number[]>(props.selectedIds);
  const horizontal = props.horizontal ?? true;
  const numColumns = props.numColumns ?? 1;
  const multiSelect = props.multiSelect ?? false;
  const isRounded = props.isRounded ?? true;

  const [listWidth, setListWidth] = useState(0);

  const itemStyle: ViewStyle = useMemo(() => {
    return {
      width: listWidth / numColumns,
      padding: wp('2%'),
    };
  }, [numColumns, listWidth, horizontal]);

  const onItemSelect = (id: number) => {
    const index = selectedIds.indexOf(id);
    let tempIds = [];
    if (index == -1) {
      tempIds = multiSelect ? [...selectedIds, id] : [id];
    } else {
      tempIds = selectedIds.filter(e => e != id);
    }
    setSelectedIds(tempIds);
    props.onSelect?.(tempIds);
  };
  return (
    <FlatList
      onLayout={e => setListWidth(e.nativeEvent.layout.width)}
      style={props.style}
      contentContainerStyle={props.contentContainerStyle}
      numColumns={numColumns}
      data={data}
      horizontal={horizontal}
      ItemSeparatorComponent={() => {
        return horizontal == true ? <Spacer style={styles.seprator} /> : null;
      }}
      showsHorizontalScrollIndicator={
        props.showsHorizontalScrollIndicator ?? false
      }
      renderItem={({item, index}) => {
        return (
          <DepartmentItem
            isRounded={isRounded}
            style={horizontal ? undefined : itemStyle}
            isViewAll={props.showAll ? index == 0 : false}
            name={item.name}
            image={item.url}
            isActive={selectedIds.indexOf(index) != -1}
            onPress={() => onItemSelect(index)}
          />
        );
      }}
    />
  );
};

export default OrganisationList;

const styles = StyleSheet.create({
  seprator: {width: hp('2%'), height: '100%'},
});
