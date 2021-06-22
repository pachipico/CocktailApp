import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, RefreshControl} from 'react-native';
import styled from 'styled-components';
import RenderCarousel from '../components/RenderCarousel';
import RenderHorizontal from '../components/RenderHorizontal';
import {getLatest, getPopular, getRandom} from '../net/search';
import tinycolor from 'tinycolor2';

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
const HeaderBox = styled.ImageBackground``;
const LightBulb = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
`;

const Home = ({navigation}) => {
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);
  const [latest, setLatest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  useEffect(() => {
    getPopular()
      .then(response => {
        setPopular(response.data.drinks);
      })
      .then(
        getRandom().then(response => {
          setRandom(response.data.drinks);
        }),
      )
      .then(
        getLatest().then(response => {
          setLatest(response.data.drinks);
        }),
      )
      .finally(() => setIsLoading(false));
    let color = tinycolor('#aaaaaa');
    console.log(color.getBrightness());
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRandom()
      .then(response => setRandom(response.data.drinks))

      .finally(() => {
        setRefreshing(false);
      });
  }, []);
  const onSnapChange = (index = 0) => {
    setSnapIndex(index);
  };
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading && <ActivityIndicator size="large" />}
        {!isLoading && (
          <>
            <HeaderBox
              source={{
                uri: random[snapIndex]?.strDrinkThumb,
              }}
              blurRadius={20}>
              <LightBulb>
                <Label>How About...</Label>
                <RenderCarousel
                  onSnapChange={onSnapChange}
                  random={random}
                  navigation={navigation}
                />
              </LightBulb>
            </HeaderBox>
            <RenderHorizontal
              navigation={navigation}
              items={popular}
              title={'Popular'}
            />
            <RenderHorizontal
              navigation={navigation}
              items={latest}
              title={'Latest'}
            />
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default Home;
