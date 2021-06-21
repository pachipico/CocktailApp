import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY} from '../key';

export const search = async keyword => {
  const url = `https://www.thecocktaildb.com/api/json/v2/${KEY}/search.php?s=${keyword}`;
  const data = await axios.get(url);

  return data;
};

export const searchById = async id => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v2/${KEY}/lookup.php?i=${id}`;
    const data = await axios.get(url);

    return data;
  } catch (err) {
    return err;
  }
};

export const getPopular = async () => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v2/${KEY}/popular.php`;
    const data = await axios.get(url);

    return data;
  } catch (err) {
    return err;
  }
};

export const getRandom = async () => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v2/${KEY}/randomselection.php`;
    const data = await axios.get(url);

    return data;
  } catch (err) {
    return err;
  }
};
