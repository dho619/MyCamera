//Importacoes de componentes
import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";

//Importacoes vindo de outras arquivos
import { Container} from './styles';
import Header from './components/Header';



export default class App extends Component {
    state = {
        contator: 0,
    }

    //funcao ao clicar o botao de tirar foto
    takePicture = async () => {
        try { //Tratando erro
            try {
                const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
                await PermissionsAndroid.request(permission);
                Promise.resolve();
            } catch (error) {
                Promise.reject(error);
            }
            if (this.camera) {
                //Configurando a foto
                const options = { 
                    quality: 0.5, 
                    base64: true,
                    forceUpOrientation: true,
                    fixOrientation: true,

            };
            const data = await this.camera.takePictureAsync(options)
            
            await CameraRoll.saveToCameraRoll(data.uri);

            const { contador } = this.state; //Apenas para ficar mais legivel a proxima linha
            
            // incrementa o contador de fotos e exibe a mensagem que salvou a fotossssssssssssssssssssssss
            this.setState({contador: contador + 1}, () => alert("Foto Salva"));

        }
        } catch (error) { 
            alert(error) //Apenas exibe o erro
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
                    captureAudio = {false}
                    
                />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.takePicture} style={styles.capture}/>
                </View>
            </Container>
        );
    }
}


//Stylus da camera
const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center"
      },
      capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 120,
        padding: 35,
        paddingHorizontal: 35,
        alignSelf: "center",
        margin: 20,
      },
});