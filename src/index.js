//Importacoes de componentes
import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

//Importacoes vindo de outras arquivos
import { Container } from './styles';
import Header from './components/Header';



export default class App extends Component {
    //funcao ao clicar o botao de tirar foto
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            alert(data.uri);
        }
    }
    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="#FFF" />
                <Header /> 
                <RNCamera
                    ref={camera => {
                        this.camera = camera;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                />
                <View style={styles.buttonContainer}>

                    <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                        <Text style={styles.buttonText}></Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}


//Stylus da camera
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 0,
        flexDirection: "row",
        alignItems: 'center',
        height: 70,
    },
    capture: {
        flex: 0,
        backgroundColor: "#A9A9A9",
        padding: 5,
        height: 60,
        width: 60, 
        borderRadius:100,    
        backgroundColor: "#fff",
        marginLeft: 150,
        
    },
    buttonText: {
        fontSize: 14
    }
});