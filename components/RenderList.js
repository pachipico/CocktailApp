import React from 'react';
import styled from 'styled-components';

const ListItem = styled.TouchableOpacity`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
  justify-content: center;
  margin-left: 12px;
`;
const ListText = styled.Text`
  font-size: 14px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Button = styled.Button`
  color: #e5e5e5;
`;
const RenderList = ({data, navigation}) => {
  return data?.map(item => {
    return (
      <ListItem
        key={item.idDrink}
        onPress={() => {
          navigation.navigate('Details', {
            id: item.idDrink,
            name: item.strDrink,
            image: item.strDrinkThumb,
          });
        }}>
        <Row>
          <ListText>{item.strDrink}</ListText>
        </Row>
      </ListItem>
    );
  });
};

export default RenderList;
