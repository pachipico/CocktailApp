import React, {useState} from 'react';
import {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import styled from 'styled-components';
import {search} from '../net/search';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const InputBox = styled.View`
  flex-direction: row;
  margin: 8px;
`;
const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
  padding: 10px;
  flex: 1;
`;
const Button = styled.Button``;
const List = styled.ScrollView`
  flex: 1;
`;
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
const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchData = async () => {
    try {
      setIsLoading(true);
      const result = await search(keyword);
      setData(result.data.drinks);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };
  useEffect(() => {
    searchData();
  }, []);
  return (
    <Container>
      <InputBox>
        <Input
          value={keyword}
          onChangeText={text => setKeyword(text)}
          placeholder="Search Cocktails!"
        />
        <Button
          title="Search"
          onPress={() => {
            searchData();
          }}
        />
      </InputBox>
      <List>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          data?.map(item => {
            return (
              <ListItem
                key={item.idDrink}
                onPress={() => {
                  navigation.navigate('Details', {
                    id: item.idDrink,
                    name: item.strDrink,
                  });
                }}>
                <ListText>{item.strDrink}</ListText>
              </ListItem>
            );
          })
        )}
      </List>
    </Container>
  );
};

export default Search;
