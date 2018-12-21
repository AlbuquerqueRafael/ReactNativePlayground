import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import axios from 'axios';

export default class OptionsPAC extends Component {
  constructor(props) {
    super(props);
    this.state = { photo: null };
    this._loadImage = this._loadImage.bind(this);
    this._capturePhoto = this._capturePhoto.bind(this);
  }


  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      paddingVertical: 0,
      marginVertical:0,
    }
  }

  render() {
    let { photo } = this.state;
    const photoFromCamera = this.props.navigation.getParam('photoFromCamera', undefined);

    if (photoFromCamera && !photo) {
      photo = {};
      photo["image"] = photoFromCamera;
    }

    return (
      <View style={styles.container}>
        {this._renderPhoto(photo)}      
        <TouchableOpacity
          onPress={this._loadImage}
          style={styles.buttonLoadImage}>
          <Text style={styles.buttonText}> Carregar foto </Text>
        </TouchableOpacity> 
        <TouchableOpacity
          onPress={this._capturePhoto}
          style={styles.buttonStartCamera}>
          <Text style={styles.buttonText}> Tirar foto </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._uploadPhoto(photo)}
          style={styles.buttonStartCamera}>
          <Text style={styles.buttonText}> Upload Foto </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async _capturePhoto() {
    const image = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3]
    });
    
    let node = {"image": { 
      "uri": image.uri,
      "base64": image.base64
     }}

    this.setState({
      "photo": node
    });
  }

  _renderPhoto (photo) {
    let image = (
      <Image source={photo ? photo.image : undefined} resizeMode="contain"
      style={{ height: 320, width: 400, resizeMode: 'contain' }}/>
    );
    
    return image;
  }

  async _loadImage() {
    let permission = await this.requestCameraPermissions(Permissions.CAMERA_ROLL)

    if (!permission) {
      return;
    }

    let imageLoaded = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    let node = {"image": { 
                "uri": imageLoaded.uri,
                "base64": imageLoaded.base64
               }}

    this.setState({
      "photo": node
    });
  }

  _uploadPhoto(photo) {
    if (photo) {
      var image = {
        uri: photo.image.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
  
      var body = new FormData();
      body.append("image_data", photo.image.base64);
      body.append('photo', image);
      body.append('title', 'A beautiful photo!');

      axios({
        method: 'post',
        url: 'http://192.168.0.16:8080/upload/',
        data: body,
        headers: {'Content-Type': 'multipart/form-data'},
      }) 
      .then(function (response) {
        console.log("works");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  async requestCameraPermissions(prms) {
    try {
      const {status} = await Permissions.askAsync(prms);
    
      if (status === "granted") {
        return true;
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }

    return false;
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonLoadImage: {
    alignItems: 'center',
    backgroundColor: '#4267b2',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 50
  },
  buttonText: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white'
  },
  buttonStartCamera: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#4267b2',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 50
  }
});