import React from 'react';
import styled from 'styled-components';

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
const Label = styled.Text`
  font-size: 28px;
  padding-left: 12px;
  padding-top: 12px;
`;
const RenderHorizontal = ({navigation, items, title}) => {
  return (
    <RenderHorizintal>
      <Label>{title}</Label>
      <HorizontalScrollView
        decelerationRate={1}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {items.map((drink, i) => {
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
  );
};

export default RenderHorizontal;
