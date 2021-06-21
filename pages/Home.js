import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';
import styled from 'styled-components';
import {getPopular, getRandom} from '../net/search';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4 + 80);

const Container = styled.SafeAreaView`
  flex: 1;
  background: #e5e5e5;
`;
const Label = styled.Text`
  font-size: 28px;
  padding-left: 12px;
  padding-top: 12px;
`;
const ScrollView = styled.ScrollView`
  flex: 1;
`;
const CarouselItem = styled.TouchableOpacity`
  width: ${ITEM_WIDTH};
  height: ${ITEM_HEIGHT};
  background: #e5e5e5;
  overflow: hidden;
`;
const CarouselImg = styled.ImageBackground`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;
const CarouselText = styled.Text`
  font-size: 24px;
`;

const RenderHorizintal = styled.View``;
const HorizontalScrollView = styled.ScrollView`
  border: 1px solid #e5e5e5;
`;

const ScrollItem = styled.TouchableOpacity`
  flex: 1;
  padding: 2px;
`;
const ItemImg = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 6px;
`;
const ItemName = styled.Text`
  font-size: 11px;
`;

const Home = ({navigation}) => {
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    getPopular()
      .then(response => {
        console.log('pop', response.data.drinks);
        setPopular(response.data.drinks);
      })
      .then(
        getRandom().then(response => {
          console.log('rand', response.data.drinks);
          setRandom(response.data.drinks);
        }),
      )
      .then(setIsLoading(false));
  }, []);

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
        <CarouselImg source={{uri: item.strDrinkThumb}}></CarouselImg>
      </CarouselItem>
    );
  };
  return (
    <Container>
      <ScrollView>
        {isLoading && <ActivityIndicator size="large" />}
        {!isLoading && (
          <>
            <Label>How About...</Label>
            <Carousel
              layout={'stack'}
              layoutCardOffset={'18'}
              data={random}
              renderItem={renderItems}
              sliderWidth={SLIDER_WIDTH}
              sliderHeight={'250px'}
              itemWidth={ITEM_WIDTH}
              itemHeight={ITEM_HEIGHT}
            />
            <RenderHorizintal>
              <Label>Most Popular</Label>
              <HorizontalScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {popular.map((drink, i) => {
                  return (
                    <ScrollItem
                      onPress={() => {
                        navigation.navigate('Details', {
                          id: drink.idDrink,
                          name: drink.strDrink,
                          image: drink.strDrinkThumb,
                        });
                      }}
                      key={i}>
                      <ItemImg source={{uri: drink.strDrinkThumb}} />
                      <ItemName>{drink.strDrink}</ItemName>
                    </ScrollItem>
                  );
                })}
              </HorizontalScrollView>
            </RenderHorizintal>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default Home;
