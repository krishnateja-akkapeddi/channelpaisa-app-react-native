import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import InvoiceMonth from './InvoiceMonth';
import InvoiceDate from '../../../mock/InvoiceDate.json';

const InvoiceDateList = () => {
  const [data, setData] = useState(InvoiceDate);
  const [num, setNum] = useState(0);
  return (
    <View>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <InvoiceMonth
            text={item.text}
            index={index}
            isActive={index == num}
            onPress={() => setNum(index)}
          />
        )}
      />
    </View>
  );
};

export default InvoiceDateList;
