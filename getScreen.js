import  React, { Component } from 'react'
import { useState } from 'react'
import { ImageBackground,TextInput, Text,Image , View, StyleSheet, Button, TouchableOpacity,ActivityIndicator,Modal, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

export default class getScreen extends React.Component {

 constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    film_id: '',
    show: false,
    newRating:  "",
    refreshing: false,

    };
  }
  
updateFx = () =>{
fetch(`http://192.168.1.100:8080/api/v1/films/${this.state.film_id}`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    rating: this.state.newRating
  })
});
this.setState({show:false}); 
alert("Successfully Updated");
}

getFx = () => {
 
     fetch('http://192.168.1.100:8080/api/v1/films')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
              this.setState({refreshing: false})

      });
}

ItemSeperator = () => {
    return (
        <View style={{
            height: 4,
            width: '100%',
            backgroundColor: '#000',
        }}
        />
    );
}

getItem(name){
this.setState({film_id: name});
this.setState({show:true});

}

buttonHandler = () => {
    this.setState({show:true});
}
buttonHandler2 = () => {
    this.setState({show:false});
}
  componentDidMount() {
    this.getFx();

   
  }

handleRefresh = () => {
  this.setState({
    data: this.state.data,
    refreshing: true,

  },
   () => {this.getFx()}
  )
}
  
  render(){
    const {token} = this.props.route.params
  const { data, isLoading } = this.state;

  return (
    <View style={styles.container}>
    <ImageBackground source={{uri:'https://i.pinimg.com/originals/7e/c8/6b/7ec86bb85850e34ae95739f708dc81e0.jpg'}} style={styles.image}>
 <Card style={styles.crd} > 
<Text style={{fontFamily: 'AvenirNext-Bold', fontSize: 25, alignSelf:'center',marginTop:10, color:'white'}}>Film's List</Text>



 {isLoading ? <ActivityIndicator/> : (
          <FlatList style ={{width: '100%'}} 
          
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeperatorComponent = {this.ItemSeperator}
            renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity>
              <Text onPress={this.getItem.bind(this, item._id)} style={styles.rating}> {item.rating}</Text>
                </TouchableOpacity>
                
            <Modal
            Transparent= {true}
            visible = {this.state.show} 
            >
    <ImageBackground source={{uri:'https://i.pinimg.com/originals/7e/c8/6b/7ec86bb85850e34ae95739f708dc81e0.jpg'}} style={styles.image}>
            <View style={{backgroundColor: 'rgba(255,255,255,0.3)', height: 200, width:300, margin: 50, padding: 40, marginTop:200}}>
            <Text style={{fontSize: 15, }}> Enter a New Rating </Text>
            <TextInput style={{backgroundColor: 'white'}} placeholder="Enter a Rating" 
            placeholderTextColor="#003f5c" onChangeText={text => {
            
            if (text<1 || text >5 || text === "") {
                alert("enter a value between 1 and 5")
            } else {
                this.setState({newRating: text})
            }}}
            />
            <Button title='Submit'
onPress={() => {
    if (this.state.newRating===""){ alert("try again"); } 
    else { this.updateFx() }
}}           />
<Button title='cancel' color='red'
onPress={() => {this.setState({show: false})}}           />
            </View>
            </ImageBackground>
            </Modal>
            </View>
            
           
            )}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />  
        )} 
  
       
    <TouchableOpacity  >
        <Text style={{color: 'gray', alignSelf: 'center', fontSize: 36}}
        onPress={() => {
    if (typeof(token) !== 'undefined')
    { alert("Please Login First");
    this.props.navigation.navigate('loginScreen') } 
    else {
    this.props.navigation.navigate('postScreen');    }
    }
    }>+</Text>
    </TouchableOpacity>

  </Card >

      </ImageBackground>
    </View>

  );
}
}

const styles = StyleSheet.create({
     rating:{
        fontSize: 20,
        lineHeight: 40,
        marginRight:15,

        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    title:{
        fontSize: 20,
        lineHeight: 40,
        fontFamily: 'Avenir'
    },
    row:{
        flex: 1,
        paddingHorizontal: 55,
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderRadius: 25
    },
  txt:{
    marginTop: 5 ,
    opacity: 0.6,
    color: 'white'
  },
  btn: {
     marginTop: 1,
    marginBottom:1,
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
    marginBottom:10,
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
    marginTop: '10%',
    margin: '10%',
    height:600,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  container: {
    flex:1,
    flexDirection: "column"

  },
});