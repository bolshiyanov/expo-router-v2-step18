import { Text } from "react-native";
import React from 'react';

export function transformDate(props: number) {
  
  
  const unixTimestamp = props;

  if (typeof unixTimestamp !== 'number' || isNaN(unixTimestamp) || unixTimestamp < 100000) {
    return <Text>{props}</Text>;
  }

  const date = new Date(unixTimestamp * 1000); 
 
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options as Intl.DateTimeFormatOptions).format(date);

  return <Text>{formattedDate}</Text>;
}