import  React from 'react'
import { useState } from 'react'
import { ImageBackground,TextInput, Text,Image , View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

export default class loginScreen extends React.Component {

state={
    userName:"",
   isLoading: true,
JwToken: []
     }


    loginFx = () =>{
 fetch("http://192.168.1.100:8080/api/v1/login", {
                method: 'POST',
                body: JSON.stringify({
                    username: this.state.userName
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, timeout: 100,
        
        
            }).then((response) => response.json())
      .then((json) => {
        this.setState({ JwToken: json.token });
      }).then((json) => {this.props.navigation.navigate('postScreen',  { token: this.state.JwToken})})
      .catch((error) => alert(error))
      .finally(() => {
        this.setState({ isLoading: false },
        alert("successful login"));
      });

}

  render(){
  return (
    <View style={styles.container}>
    <ImageBackground source={{uri:'https://i.pinimg.com/originals/7e/c8/6b/7ec86bb85850e34ae95739f708dc81e0.jpg'}} style={styles.image}>
 <Card style={styles.crd} > 
<Text style={{fontFamily: 'AvenirNext-Bold', fontSize: 25, alignSelf:'center',marginTop:10, color:'white'}}>Drexel University</Text>
<Text style={{fontFamily: 'monospace', fontSize: 18, alignSelf:'center', color:'white'}}>SE572 - Films Database</Text>
  <TextInput 
  style = {styles.noj} placeholder=' Enter a username'  placeholderTextColor='black'
  onChangeText={text => this.setState({userName:text})}
  />
    <TouchableOpacity style={styles.btn} title='login'>
    <Text 
    style={{alignSelf: 'center'}}
    onPress={() => {
    if (this.state.userName===""){ alert("empty username"); } 
    else { this.loginFx()}}} >Login</Text>


    </TouchableOpacity>  
    <TouchableOpacity style={styles.txt} >
        <Text style={{color: 'white'}}
        onPress={() => this.props.navigation.navigate('getScreen',  { token: this.state.JwToken})}
        >Get Films</Text>
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
     marginTop: 1,
    marginBottom:1,
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
    marginTop: 25,
    alignSelf:'center',
    marginBottom:10,
    height: 40,
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
    height:220,
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