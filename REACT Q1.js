//This is implemented in the weather app for testing

import keyIndex from 'react-key-index';
import { View } from 'react-native';

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

  export default function App() {
    return (
      <View style={styles.container}>
        <available_rooms data={rooms_with_ids} />  
      </View>
      
  );
    
  }