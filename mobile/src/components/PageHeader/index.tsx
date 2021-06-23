import React, { useContext } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { useNavigation } from '@react-navigation/native'

import AuthContext from '../../context/auth';
import logo from '../../assets/logo.png';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const { goBack, navigate } = useNavigation();
  const { signOut } = useContext(AuthContext);

  function renderGoBackButton() {
    if (title !== 'Home')
      return (
        <BorderlessButton onPress={handleGoBack} >
          <Ionicons name="ios-arrow-round-back" color='#3E3E3E' size={25} />
        </BorderlessButton>
      );
    return <Text />;
  }

  function handleGoBack() {
    navigate('HomeMenu');
    //goBack();
  }
  function handleSignOut() {
    signOut();
  }
  return (
    <View style={styles.container}>
      <View style={styles.goBackContainer}>

        {renderGoBackButton()}
        <Text style={styles.titulo}>{title}{subtitle ? `\n${subtitle}` : ''}</Text>


      </View>
      <View style={styles.LogoutContainer}>
        <Image source={logo} />
        <BorderlessButton onPress={handleSignOut} >
          <Text style={styles.logoutButton}>Logout</Text>
        </BorderlessButton>
      </View>

    </View>
  )
}



export default PageHeader;