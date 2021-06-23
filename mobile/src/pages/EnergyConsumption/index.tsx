import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import backgroundImage from '../../assets/background.png'

import api from '../../services/api'
import pointvalueID from '../../config/pointvalues.json'

interface dataPointValue {
  id: number,
  dataPointId: number,
  dataType: number,
  pointValue: number,
  ts: number
}


function EnergyConsumption() {
  const [FWD_WH, setFWD_WH] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [REV_WH, setREV_WH] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [OP_TIME, setOP_TIME] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [NUMB_OP, setNUMB_OP] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [isLoading, setisLoading] = useState(true)

  function getDataFromApi() {
    setisLoading(true)
    api.get('/data/energy_consumption/', {
      params: {
        dataPointId1: pointvalueID.FWD_WH,
        dataPointId2: pointvalueID.REV_WH,
        dataPointId3: pointvalueID.OP_TIME,
        dataPointId4: pointvalueID.NUMB_OP,
      },
      timeout: 2000
    }).then(function (response) {

      const responsedata1: dataPointValue = response.data.data1
      const responsedata2: dataPointValue = response.data.data2
      const responsedata3: dataPointValue = response.data.data3
      const responsedata4: dataPointValue = response.data.data4
      setFWD_WH(responsedata1)
      setREV_WH(responsedata2)
      setOP_TIME(responsedata3)
      setNUMB_OP(responsedata4)

      setisLoading(false)

    }).catch(function (error) {
      if (!!error.response)
        Alert.alert(error.response.data.error)
      else
        Alert.alert(error.message)
    });
  }

  useEffect(() => {
    getDataFromApi();

  }, []);
  return (
    <ImageBackground resizeMode="stretch" source={backgroundImage} style={{ flex: 1 }}>
      <PageHeader title="Consumo" subtitle="de Energia" />

      <BorderlessButton style={styles.reload}>
        <MaterialCommunityIcons name="reload" size={24} color="#4989ff" />
      </BorderlessButton>
      <ScrollView persistentScrollbar={true} contentContainerStyle={styles.container}>
        <Text style={styles.dashTitle}>Consumo de Energia</Text>

        <View style={{ ...styles.valueBoxContainer }}>

          <View style={{ ...styles.valueBoxWrapper }}>

            <Text style={{ ...styles.valueBoxTitle }}>Energia Ativa Direta</Text>
            <Text style={{ ...styles.valueBoxText }}>
              {(FWD_WH.pointValue / 1000).toFixed(2)} kWh
            </Text>

            <Text style={{ ...styles.valueBoxTitle }}>Energia Ativa Inversa</Text>

            <Text style={{ ...styles.valueBoxText }}>
              {(REV_WH.pointValue / 1000).toFixed(2)} kWh
            </Text>

            <Text style={{ ...styles.valueBoxTitle }}>Tempo de Operação</Text>
            <Text style={{ ...styles.valueBoxText }}>
              {OP_TIME.pointValue}
            </Text>

            <Text style={{ ...styles.valueBoxTitle }}>Número de Interrupções</Text>
            <Text style={{ ...styles.valueBoxText }}>
              {NUMB_OP.pointValue}
            </Text>
          </View>

        </View>


      </ScrollView>

      {isLoading ?
        <ActivityIndicator style={styles.loading} color="#4989ff" size="large" />
        :
        <Fragment />
      }

    </ImageBackground>
  );
}

export default EnergyConsumption;