import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {HeaderComponent} from '../../components/Header';
import {DaysAgoImages} from '../../components/DaysAgoImages';
import {TodayImage} from '../../components/TodayImage';

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
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
