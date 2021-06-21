import React from 'react';
import styled from 'styled-components';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4 + 80);

const CarouselItem = styled.TouchableOpacity`
  width: 273px;
  height: 285px;
`;
const CarouselImg = styled.Image`
  flex: 1;
  width: 273px;
  height: 285px;
  border-radius: 10px;
`;
const CarouselText = styled.Text`
  font-size: 24px;
`;

const RenderCarousel = ({random, navigation, onSnapChange}) => {
  const renderItems = ({item}) => {
    return (
      <CarouselItem
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Details', {
            id: item.idDrink,
            name: item.strDrink,
            image: item.strDrinkThumb,
          });
        }}>
        <CarouselText>{item.strDrink}?</CarouselText>
        <CarouselImg source={{uri: item.strDrinkThumb}} />
      </CarouselItem>
    );
  };

  return (
    <Carousel
      layoutCardOffset={10}
      data={random}
      renderItem={renderItems}
      sliderWidth={SLIDER_WIDTH}
      sliderHeight={250}
      itemWidth={273}
      itemHeight={285}
      loop={true}
      onSnapToItem={index => {
        onSnapChange(index);
      }}
    />
  );
};

export default RenderCarousel;
