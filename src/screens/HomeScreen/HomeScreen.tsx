import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {HeaderComponent} from '../../components/Header';
import {DaysAgoImages} from '../../components/DaysAgoImages';
import {TodayImage} from '../../components/TodayImage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        ...styles.container,
        top: insets.top + 5,
        bottom: insets.top + 5,
      }}>
      <HeaderComponent />

      <TodayImage />

      <DaysAgoImages />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
