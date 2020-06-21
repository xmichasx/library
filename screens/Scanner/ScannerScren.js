import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, Text } from 'react-native';

class ScannerScreen extends Component {
static navigationOptions = {
    header: null
  }
  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false // scanned
  }
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }


  handleBarCodeScanned = ({ type, data }) => {
      // Do something here
      this.props.navigation.navigate('DecodeScreen', {
        data: data 
      });
  }
//   handleBarCodeScanned = ({ type, data }) => {
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };
  render(){
    const { hasCameraPermission, isScanned } = this.state;
    if(hasCameraPermission === null){
      // requesting permission
      return (
        <Text>Requesting for camera permission</Text>
      );
    }
    if(hasCameraPermission === false){
        //permission denied
      return ( 
        <Text>No access to camera</Text>
      )
    }
    if(hasCameraPermission === true && !isScanned && this.props.navigation.isFocused() ){
      // we have permission and this screen is under focus
      return(
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <Text>Scan code inside window</Text>
        <BarCodeScanner
          onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
          style = {{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
        </BarCodeScanner>
      </View>
      )
    }
    else{
      return <Text>No access to camera2</Text>;
    }
  }
}

export default ScannerScreen;