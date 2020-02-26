import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import SnapCarousel, { ParallaxImage } from 'react-native-snap-carousel'

const ItemWrapper = styled.TouchableOpacity`
  border-radius: 30px;
  background: #000000;
  height: 400px;
  shadow-color: #000000;
  shadow-offset: 0 0;
  shadow-opacity: 0.48;
  shadow-radius: 10px;
  elevation: 14;
  margin: 20px 5px 30px 20px;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
  font-family: Quicksand;
`;

const Time = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
  align-self: flex-end;
  font-family: Quicksand;
`;



interface Props {
  launches: any[];
  onItemPress: (item: any) => void;
}

const screenWidth = Dimensions.get('window').width;

const Carousel: React.FC<Props> = ({ launches, onItemPress }) => {

  const renderItem = ({ item, index }, parallaxProps) => {
    const now = new Date();
    const timeLeft = item.wsstamp * 1000 - now.getTime();
    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const finalTime = timeLeft < 0 ? 'TBD' : `${days > 0 ? days + " days" : ''} ${hours % 24} hour${minutes % 24 !== 1 ? 's' : ''}`

    return (
      <ItemWrapper onPress={() => onItemPress(item)}>
        <ParallaxImage
          source={{ uri: item.rocket.imageURL }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.2}
          {...parallaxProps}
        />
        <Title>{item.name}</Title>
        <Time>{finalTime}</Time>
      </ItemWrapper>
    )
  }

  return (
    <SnapCarousel
      data={launches}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 70}
      hasParallaxImages
      activeSlideAlignment="start"
      inactiveSlideScale={0.9}
      inactiveSlideOpacity={0.5}
    />
  )

}
const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: '#000',
    borderRadius: 30,
    opacity: 0.5
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})

export default Carousel