import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import config from '../../../config';
import {API_BASE_URL} from '../../constants/constantAPI';
import {useDataFetch} from '../../hooks/useDataFetch';
import {PostImageNASA} from '../../interfaces/appInterfaces';
import {CardImage} from '../CardImage';

const URL_TODAY_IMAGE = `${API_BASE_URL}?api_key=${config.API_KEY}`;

export const TodayImage = () => {
  const dimensions = useWindowDimensions();
  const {fetchData, isLoading} = useDataFetch<PostImageNASA>({
    API_URL: URL_TODAY_IMAGE,
  });

  if (isLoading) {
    return (
      <View
        style={{...styles.activityIndicator, height: dimensions.height * 0.4}}>
        <ActivityIndicator color={'#9b7e7b'} size={60} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.principalTitle}>Post of the Day</Text>

      <CardImage
        postElement={fetchData!}
        backgroundColor="#9b7e7b"
        principalPost={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 22,
  },
  principalTitle: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
  },
});
