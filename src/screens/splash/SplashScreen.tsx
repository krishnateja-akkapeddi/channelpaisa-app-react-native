import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppLoader from '../../components/indicator/AppLoader';
import RootNavigation from '../../navigation/RootNavigation';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';

const WelcomeScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
      const userDetails = await SharedPreference.shared.getItem(
        kSharedKeys.userDetails,
      );
      if (userDetails == null) {
        RootNavigation.replace('LoginScreen');
      } else {
        RootNavigation.replace('Drawer');
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.screen}>
      <AppLoader loading={loading} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
