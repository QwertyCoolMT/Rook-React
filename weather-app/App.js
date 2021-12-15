import React, { useEffect, useState } from 'react';
import { Button, ActivityIndicator, StyleSheet, FlatList, Text, View, Image, SafeAreaView, TextInput } from 'react-native';
import keyIndex from 'react-key-index';

// Q1 CODE START
const rooms = [
  { room_type: "Queen", vacant_rooms: 5, price: 100 },
  { room_type: "Double", vacant_rooms: 3, price: 75 },
  { room_type: "Twin", vacant_rooms: 8, price: 60 }
];

//allows us to create list items with unique IDs for each
const rooms_with_ids = keyIndex(rooms, 1)


function available_rooms(props){
  return(
    <ol>
      {props.data.map((room) => 
      <li key={room._room_typeId}> {`${room.room_type}, ${room.vacant_rooms}, ${room.price}`} </li> )}
    </ol>
)
};
// end Q1 Code


export default function App(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [city, setCity] = React.useState('Toronto');
  let whereId = 4118;
  const getCity = async () =>{

    try {
      console.log(city)
      const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
      const cityjson = await response.json();
      setCity(cityjson[0].title);
      console.log(cityjson[0].woeid)
      whereId = cityjson[0].woeid;
      console.log(whereId);
    } catch (error) {
      console.error(error);
    } finally {
      getWeather(whereId)
    }
  }

  const getWeather = async (ID) => {
     try {
      console.log(ID)
      const response = await fetch(`https://www.metaweather.com/api/location/${ID}`);
      const json = await response.json();

      setData(json.consolidated_weather);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeather(whereId);
  }, []);
  return (

    <View style={{ flex: 1, padding: 24 }}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setCity}
          placeholder="Toronto"
          onSubmitEditing={getCity}
        />
      </SafeAreaView>
      <Text style={{fontSize : 20 }}> Today's Forecast</Text>
      {isLoading ? <ActivityIndicator/> : (
          <View>  
            <View style={{flexDirection : 'row'}}>
              <Text style={{fontSize : 40 }}>{Math.round(data[0].the_temp)}</Text>
              <Text style={{fontSize : 20 }}> &#x2103; </Text>
              <Image source={{ uri:`https://www.metaweather.com/static/img/weather/${data[0].weather_state_abbr}.svg` }} style={{ width: 50, height: 50 }} />
            </View>
            <Text>{data[0].weather_state_name}</Text><br />
            <Text> Wind: <br />
            {Math.round(data[0].wind_speed*1.60934)} KM/H
            </Text>
            <Text> Today's High:<br />
            {Math.round(data[0].max_temp)}</Text> 
            <Text>Today's Low</Text>
            <Text>{Math.round(data[0].min_temp)}</Text> 
          </View>
          )}
      <Text>Question One: </Text>
      <available_rooms data={rooms_with_ids} />  
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});