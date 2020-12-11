import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BookTansactionScreen extends React.Component{
  constructor(){
    super()
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status}=await Permissions. askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status==='granted',
      buttonState: 'clicked'
    })
  }
  handelBatCodeScan=async({type,data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }
  render(){
    if(this.state.buttonState === 'clicked' && this.state.hasCameraPermissions===true){
      return(
        <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handelBatCodeScan}
                        style={StyleSheet.absoluteFillObject}/>
      )
    }
    else if(this.state.buttonState === 'normal'){
    return(
      <View style = {styles.container}>
        <Text style= {styles.displayText}>
          {this.state.hasCameraPermissions===true ? this.state.scannedData : 'request Camera Permission'}
        </Text>
          <TouchableOpacity style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions()
          }}>
           <Text style={styles.displayText}>Scan QR Code</Text>
          </TouchableOpacity>
      </View>
    )
        }
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  displayText:{
    fontSize: 15
  },
  scanButton:{
    backgroundColor:'#d68060',
    padding: 10,
  }
})
