import styled from 'styled-components/native';
import { StyleSheet, Dimensions} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #A9A9A9;
`;

export const styles = StyleSheet.create({
  preview: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center"
  },
  buttonContainer: {
      flex: 0,
      flexDirection: "row",
      justifyContent: "center",

    },
    capture: {
      flex: 0,
      backgroundColor: "#fff",
      borderRadius: 120,
      padding: 35,
      paddingHorizontal: 35,
      alignSelf: "center",
      margin: 5,
      marginHorizontal: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
    },
    galeria: {
      flex: 0,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      paddingHorizontal: 15,
      alignSelf: "center",
      margin: 10,
      marginHorizontal: 20,
    },
    modalImage: {
      width: Dimensions.get('window').width * 0.8,
      marginHorizontal: Dimensions.get('window').width * 0.1,
      height: Dimensions.get('window').height * 0.7,
      marginVertical: Dimensions.get('window').height * 0.15,  
    },
});