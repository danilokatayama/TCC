import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styles from './styles';
import PageHeader from '../../../../components/PageHeader';
import backgroundImage from '../../../../assets/background.png';

import api from '../../../../services/api'
import pointvalueID from '../../../../config/pointvalues.json'

interface dataPointValue {
  id: number,
  dataPointId: number,
  dataType: number,
  pointValue: number,
  ts: number
}

function AnalyticsOperationMV() {
  const [NUMB_OP, setNUMB_OP] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [TIME_OP, setTIME_OP] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [START_ALLOWED, setSTART_ALLOWED] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [isLoading, setisLoading] = useState(true)

  function getDataFromApi() {
    setisLoading(true)
    api.get('/data/analytics_operation_mv/', {
      params: {
        dataPointId1: pointvalueID.NUMB_OP,
        dataPointId2: pointvalueID.TIME_OP,
        dataPointId3: pointvalueID.START_ALLOWED,
      },
      timeout: 2000
    }).then(function (response) {

      const responsedata1: dataPointValue = response.data.data1
      const responsedata2: dataPointValue = response.data.data2
      const responsedata3: dataPointValue = response.data.data3
      setNUMB_OP(responsedata1)
      setTIME_OP(responsedata2)
      setSTART_ALLOWED(responsedata3)

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
      <PageHeader title="Analíticos" subtitle="Média Tensão" />

      <BorderlessButton style={styles.reload}>
        <MaterialCommunityIcons name="reload" size={24} color="#4989ff" />
      </BorderlessButton>
      <ScrollView persistentScrollbar={true} contentContainerStyle={styles.container}>
        <Text style={styles.dashTitle}>Operação</Text>

        <View style={{ ...styles.valueBoxContainer }}>

          <View style={{ ...styles.valueBoxWrapper }}>

            <Text style={{ ...styles.valueBoxTitle }}>Número de Operações</Text>
            <Text style={{ ...styles.valueBoxText }}>
              {NUMB_OP.pointValue}
            </Text>

            <Text style={{ ...styles.valueBoxTitle }}>Tempo de Operação</Text>

            <Text style={{ ...styles.valueBoxText }}>
              {TIME_OP.pointValue}
            </Text>

            <Text style={{ ...styles.valueBoxTitle }}>Starts Permitidos</Text>
            <Text style={{ ...styles.valueBoxText }}>
              {START_ALLOWED.pointValue}
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

export default AnalyticsOperationMV;