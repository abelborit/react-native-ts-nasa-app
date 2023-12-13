import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>

      <View style={styles.rightContainer}>
        <Image
          source={require('../../assets/nasa-logo.png')}
          style={styles.imageLogo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 14,
    borderBottomColor: 'rgba(255,255,255,0.25)',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageLogo: {
    width: 50,
    height: 50,
  },
});
