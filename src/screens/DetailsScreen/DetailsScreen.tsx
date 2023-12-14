import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigators/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface DetailsScreenProps
  extends StackScreenProps<RootStackParams, 'DetailsScreen'> {}

export const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
  const insets = useSafeAreaInsets();
  const {postElement} = route.params;

  return (
    <ScrollView
      style={{
        ...styles.container,
        bottom: insets.top + 16,
      }}>
      <TouchableOpacity
        style={styles.btnBack}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={{fontSize: 50, color: '#fff', textAlign: 'center'}}>
          «
        </Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={
            postElement.url.split('.').includes('jpg')
              ? {uri: postElement?.url}
              : require('../../assets/no-image.png')
          }
          style={styles.imageStyle}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{postElement?.title}</Text>
        <Text style={styles.date}>{postElement?.date}</Text>

        <Text style={styles.copyright}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>By:</Text>{' '}
          {postElement?.copyright}
        </Text>

        <View style={{marginTop: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: '#fff'}}>
            Explanation:
          </Text>
          <Text style={styles.explanation}>{postElement?.explanation}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  btnBack: {
    // backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  imageContainer: {},
  imageStyle: {
    width: '100%',
    height: 400,
    objectFit: 'cover',
  },
  infoContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    color: '#fff',
  },
  copyright: {
    marginTop: 30,
    fontSize: 18,
    color: '#fff',
  },
  explanation: {
    fontSize: 18,
    color: '#fff',
  },
});
