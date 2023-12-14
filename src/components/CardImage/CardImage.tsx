import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PostImageNASA} from '../../interfaces/appInterfaces';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigators/StackNavigator';

interface CardImageProps {
  postElement: PostImageNASA;
  backgroundColor: string;
  principalPost: boolean;
}

export const CardImage = ({
  postElement,
  backgroundColor,
  principalPost,
}: CardImageProps) => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>(); // forma un poco más directa usando el RootStackParams desde StackNavigator.tsx

  return (
    <View style={{...styles.cardContainer, backgroundColor}}>
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

        {principalPost ? (
          <Text style={styles.explanation}>
            {postElement?.explanation
              .split(' ')
              .slice(0, 30)
              .join(' ')
              .concat(
                postElement.explanation.split(' ').length > 100 ? '...' : '',
              )}
          </Text>
        ) : null}
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          activeOpacity={0.8}
          onPress={() => navigator.navigate('DetailsScreen', {postElement})}>
          <Text style={styles.btnText}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    marginTop: 22,
    borderRadius: 32,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imageContainer: {
    borderWidth: 1.5,
    borderRadius: 32,
    borderColor: '#fff',
    padding: 6,
  },
  imageStyle: {
    width: '100%',
    height: 180,
    borderRadius: 32,
  },
  infoContainer: {},
  title: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    color: '#fff',
  },
  explanation: {
    marginTop: 12,
    fontSize: 18,
    color: '#fff',
  },
  btnContainer: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  btnStyle: {},
  btnText: {
    fontSize: 18,
    color: '#343434',
    fontWeight: 'bold',
  },
});
