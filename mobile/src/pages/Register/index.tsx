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

function Register() {
  const { navigate } = useNavigation();
  const { signed } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function registerUser() {

    if (!username || !email || !password) {
      Alert.alert(
        'Houve um erro ao cadastrar usuário',
        'Por favor, preencha todos os campos.'
      );
      return
    }

    api.post('/auth/register', {
      username,
      password,
      email
    }, { timeout: 2000 }).then(function (response) {
      console.log(JSON.stringify(response.data.user));
      Alert.alert(
        'Usuário cadastrado com sucesso!',
        `${username}, você já pode efetuar o seu login.`,
        [
          { text: 'OK', onPress: () => navigate('Login') }
        ]
        ,
        { cancelable: false }
      );

    }).catch(function (error) {
      if (!!error.response)
        Alert.alert(
          'Houve um erro ao cadastrar usuário.',
          error.response.data.error,
          [

            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      console.log(error.code);
      console.log(error.message);
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground resizeMode="stretch" source={backgroundImage} style={styles.content}>
        <Image source={logo} style={styles.logo} />

        <View style={styles.loginContainer}>
          <View style={styles.loginHeader}>
            <Text style={styles.title}> Cadastro </Text>
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
              placeholder="Email"
              placeholderTextColor="#5b80c1"
              keyboardType='email-address'
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
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
            onPress={registerUser}
            style={styles.button}
          >
            <Text style={{ color: '#FFF', fontFamily: 'Poppins_600SemiBold' }}>Confirmar Cadastro</Text>
          </RectButton>

        </View>
      </ImageBackground>
    </ScrollView>
  );

}



export default Register;