import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign } from '@expo/vector-icons';

import styles from './styles';

import backgroundImage from '../../assets/background.png'
import iconDiagramaUnifilar from '../../assets/icon_diagramaUnifilar.png'
import PageHeader from '../../components/PageHeader';

function HomeMenu() {
  const { navigate } = useNavigation();

  function handleNavitgationToSingleLineDiagram() {
    navigate('SingleLineDiagram');
  }

  function handleNavitgationToAnalyticsLV() {
    navigate('AnalyticsLV');
  }

  function handleNavitgationToAnalyticsMV() {
    navigate('AnalyticsMV');
  }

  function handleNavitgationToEnergyConsumption() {
    navigate('EnergyConsumption');
  }


  return (
    <ImageBackground resizeMode="stretch" source={backgroundImage} style={styles.container}>
      <PageHeader title='Home' />
      <View style={styles.content}>

        <TouchableOpacity
          onPress={handleNavitgationToSingleLineDiagram}
          style={styles.button}
        >
          <Image source={iconDiagramaUnifilar} style={{ height: 40, width: 40, resizeMode: 'stretch' }} />
          <Text style={styles.buttonText}>Diagrama Unifilar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNavitgationToAnalyticsLV}
          style={styles.button}
        >
          <AntDesign name="dashboard" size={40} color="black" />
          <Text style={styles.buttonText}>Analíticos Baixa Tensão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNavitgationToAnalyticsMV}
          style={styles.button}
        >
          <AntDesign name="areachart" size={40} color="black" />
          <Text style={styles.buttonText}>Analíticos Média Tensão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNavitgationToEnergyConsumption}
          style={styles.button}>
          <Entypo name="credit" size={40} color="black" />
          <Text style={styles.buttonText}>Consumo de Energia</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

export default HomeMenu;