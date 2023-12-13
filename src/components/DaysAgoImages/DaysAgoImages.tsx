import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {PostImageNASA} from '../../interfaces/appInterfaces';
import {format, sub} from 'date-fns';
import {API_BASE_URL} from '../../constants/constantAPI';
import config from '../../../config';
import {useDataFetch} from '../../hooks/useDataFetch';
import {CardImage} from '../CardImage';

export const DaysAgoImages = () => {
  const daysAgo = 10;
  const dimensions = useWindowDimensions();
  const date = new Date();
  const currentDate = format(date, 'yyyy-MM-dd');
  const daysAgoCurrentDate = format(sub(date, {days: daysAgo}), 'yyyy-MM-dd');

  const URL_DAYS_AGO_IMAGE = `${API_BASE_URL}?api_key=${config.API_KEY}&start_date=${daysAgoCurrentDate}&end_date=${currentDate}`;

  const {fetchData, isLoading} = useDataFetch<PostImageNASA[]>({
    API_URL: URL_DAYS_AGO_IMAGE,
  });

  if (isLoading) {
    return (
      <View
        style={{...styles.activityIndicator, height: dimensions.height * 0.4}}>
        <ActivityIndicator color={'#95a5a6'} size={60} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.principalTitle}>{`Last ${daysAgo} Days`}</Text>

      <View>
        {fetchData?.reverse()?.map(element => (
          <CardImage
            key={element.title}
            postElement={element}
            backgroundColor="#95a5a6"
            principalPost={false}
          />
        ))}
      </View>
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
    marginTop: 40,
    marginBottom: 70,
    borderRadius: 32,
  },
  principalTitle: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
  },
});
