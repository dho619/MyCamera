//Importacoes de componentes
import React, { Component } from 'react';
import {StatusBar, View, TouchableOpacity,
        Text, PermissionsAndroid, Modal, ScrollView , Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";

//Importacoes vindo de outras arquivos
import { Container, styles} from './styles';
import Header from './components/Header';



export default class App extends Component {
    state = {
        contador: 0,
        visivel:  false,
        imagesList: [],
        tipoCamera: RNCamera.Constants.Type.back,
    }

    //funcao ao clicar o botao de tirar foto
    takePicture = async () => {
        try { //Tratando erro
            //Pedindo Permissao para salvar os arquivos
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
            
            // incrementa o contador de fotos e exibe a mensagem que salvou a foto
            this.setState({contador: contador + 1}, () => alert("Foto Salva"));

        }
        } catch (error) { 
            alert(error) //Apenas exibe o erro
        }
    }

    AlternaVisibilidade = async () => {
        const { visivel } = this.state;
        if (!visivel) {
            try {
                const images = await CameraRoll.getPhotos({
                    first: this.state.contador,
                    assetType: 'Photos',
                });
                //Se esta invisivel, clk visivel e salva as imagens
                this.setState({visivel: !visivel,  imagesList: images.edges});
            } catch (error) {
               alert("Nao existe nenhuma foto a ser exibida"); 
            }

        } else {
            this.setState({visivel: !visivel}); //Se esta visivel, clk invisivel
        }
    }

    AlternaCamera = async () => {
        if (this.state.tipoCamera == RNCamera.Constants.Type.back){
            this.setState({tipoCamera: RNCamera.Constants.Type.front});
        } else {
            this.setState({tipoCamera: RNCamera.Constants.Type.back});;
        }
    }


    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="#FFF" />
                <Header />
                <Modal  animationType="slide" 
                        transparent 
                        visible={this.state.visivel}
                        onRequestClose={this.toggleVisivel}
                > 
                    <View style={styles.modalContainer}>
                        <ScrollView horizontal pagingEnabled> 
                        { this.state.imagesList.map( image => {
                                <Image
                                    key={{ uri: image.node.image.uri }}
                                    source={{ uri: image.node.image.uri }}
                                    style={styles.modalImage}
                                    resizeMode = "contain"
                                />
                            })}
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.AlternaVisibilidade} style={styles.galeria}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <RNCamera
                    ref={camera => {
                        this.camera = camera;
                    }}
                    style={styles.preview}
                    type={this.state.tipoCamera}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    captureAudio = {false}
                    
                />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.AlternaVisibilidade} style={styles.galeria}>
                        <Text>Galeria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.takePicture} style={styles.capture}/>
                    <TouchableOpacity onPress={this.AlternaCamera} style={styles.galeria}>
                        <Text>Vira</Text>
                    </TouchableOpacity>
                    
                </View>
            </Container>
        );
    }
}
