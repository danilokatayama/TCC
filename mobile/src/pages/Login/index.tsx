import React, { useContext, useState } from 'react';
import { View, Image, Text, ImageBackground, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import logo from '../../assets/logo.png';
import backgroundImage from '../../assets/background.png'
// import logo from '../../assets/xplorelogo.png';
// import PageHeader from '../../components/PageHeader';
import { TextInput } from 'react-native-gesture-handler';


/* AUTENTICACAO */
import AuthContext from '../../context/auth'
import api from '../../services/api'

function Login() {
  const { navigate } = useNavigation();
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    // console.log(username)

    signIn(username, password);
    // console.log('logar');
  }

  function handleNavitgationToHomeMenuPage() {

    //funcionou
    api.post('/auth/authenticate', {
      username,
      password
    }, { timeout: 2000 }).then(function (response) {
      console.log(JSON.stringify(response.data.user));
      // console.log(response.data.user)
      // signIn();
    }).catch(function (error) {
      // handle error
      if (!!error.response)
        Alert.alert(error.response.data.error)
      else
        Alert.alert(error.message)
      // console.log(error.code);
      // console.log(error.message);
      // console.log(error.stack);
    });
    // navigate('HomeMenu');
  }

  function handleNavitgationToRegisterPage() {

    navigate('Register');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground resizeMode="stretch" source={backgroundImage} style={styles.content}>
        <Image source={logo} style={styles.logo} />

        <View style={styles.loginContainer}>
          <View style={styles.loginHeader}>
            <Text style={styles.title}> Fazer Login </Text>
            <RectButton >
              <Text onPress={handleNavitgationToRegisterPage} style={{ color: '#5b80c1', fontFamily: 'Poppins_600SemiBold', }}>Cadastre-se</Text>
            </RectButton>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Usuário"
              placeholderTextColor="#5b80c1"
              style={styles.input}
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry={true}
              placeholderTextColor="#5b80c1"
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <RectButton
            onPress={handleSignIn}
            style={styles.button}
          >
            <Text style={{ color: '#FFF', fontFamily: 'Poppins_600SemiBold' }}>Entrar</Text>
          </RectButton>

        </View>
      </ImageBackground>
    </ScrollView>
  );

}



export default Login;