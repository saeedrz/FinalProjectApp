import  React from 'react'
import { useState } from 'react'
import { ImageBackground,TextInput, Text,Image , View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import {tokens} from './Token';

export default class postScreen extends React.Component {

  state={
    title:"",
    rating: "",
    JwToken:[],
  }


postFx = () =>{
const {token} = this.props.route.params;

fetch('http://192.168.1.100:8080/api/v1/films', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token

  },
  body: JSON.stringify({
    title: this.state.title,
    rating: this.state.rating
  })
}).then(resp => {
    setTimeout(() => {
       if(resp.status ==200){
      alert("Success");
    }
    else
    {
      alert(resp.status+" "+resp.statusText);
    }
    }, 0);
   
  });
}


  render(){
const {token} = this.props.route.params;
  return (
    <View style={styles.container}>
    <ImageBackground source={{uri:'https://i.pinimg.com/originals/7e/c8/6b/7ec86bb85850e34ae95739f708dc81e0.jpg'}} style={styles.image}>
 <Card style={styles.crd} > 
<Text style={{fontFamily: 'monospace', fontSize: 18, alignSelf:'center', color:'white', marginTop:30, marginBottom:10}}>Enter a film and rating</Text>
  <TextInput style = {styles.noj} placeholder=' Enter a Film'
  onChangeText={text => this.setState({title:text})}/>
<TextInput style = {styles.noj} placeholder=' Enter Rating'
onChangeText={text => this.setState({rating:text})}/>
    <TouchableOpacity style={styles.btn} title='Post Film'
    onPress={() => {
    if (this.state.title==="" || this.state.rating===""){ alert("Failed! cannot accept empty entries"); } 
    else if (this.state.rating > 5 || this.state.rating < 1 || isNaN(this.state.rating)) {
      alert("invalid rating! must be between 1 and 5");
    }
    else { this.postFx()}}}>
    <Text style={{alignSelf: 'center'}}>Post Film</Text>


    </TouchableOpacity>  
    <TouchableOpacity style={styles.txt} >
        <Text style={{color: 'white'}}
        onPress={() => this.props.navigation.navigate('getScreen', {tokens: token})}>Get Films</Text>
    </TouchableOpacity> 
      
      
  </Card >

      </ImageBackground>
    </View>

  );
}
}

const styles = StyleSheet.create({
  txt:{
    marginTop: 5 ,
    alignSelf: 'center',
    opacity: 0.6,
    color: 'white'
  },
  btn: {
     marginTop: 10,
    marginBottom:0,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    width:75,
    borderRadius:25,
    backgroundColor: 'rgba(0,0,0,0.2)',
     shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.1
    },
    shadowRadius: 0.5,
    shadowOpacity: 1.0
  },
  image: {
    flex:1,
    opacity: 1
  },
  noj: {
    alignSelf:'center',
    marginBottom:5,
    height: 30,
    width:225,
    borderRadius:5,
    backgroundColor: '#f8f8ff',
    opacity: 0.3,
     shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.1
    },
    shadowRadius: 0.5,
    shadowOpacity: 1.0

  },
  crd:{
    marginTop: '55%',
    margin: '10%',
    height:210,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex:1,
    flexDirection: "column"

  },
});