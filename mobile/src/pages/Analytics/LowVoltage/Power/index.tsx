import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import styles from './styles';
import PageHeader from '../../../../components/PageHeader';
import backgroundImage from '../../../../assets/background.png';

import api from '../../../../services/api'
import pointvalueID from '../../../../config/pointvalues.json'


const windowWidth = Dimensions.get('window').width;

interface dataPointValue {
  id: number,
  dataPointId: number,
  dataType: number,
  pointValue: number,
  ts: number
}

const chartConfigs =
{
  backgroundColor: 'white',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  fillShadowGradientOpacity: 0.96,
  color: (opacity = 1) => `rgba(2, 33, 115, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForBackgroundLines: {
    strokeDasharray: "" // solid background lines with no dashes
  }
}



import { BarChart } from 'react-native-chart-kit'

function AnalyticsPowerLV() {
  const [PA_BT, setPA_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [QA_BT, setQA_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [SA_BT, setSA_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [FPA_BT, setFPA_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });

  const [PB_BT, setPB_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [QB_BT, setQB_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [SB_BT, setSB_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [FPB_BT, setFPB_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });

  const [PC_BT, setPC_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [QC_BT, setQC_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [SC_BT, setSC_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [FPC_BT, setFPC_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });

  const [POWER_FACTOR_AVG, setPOWER_FACTOR_AVG] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0.93,
    ts: 10800000
  });

  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    getDataFromApi();

  }, []);

  let dataset = {
    labels: ["", "PA", "", "", "PB", "", "", "PC", ""],
    datasets: [
      {
        data: [
          Number((PA_BT.pointValue / 1000).toFixed(1)),
          Number((QA_BT.pointValue / 1000).toFixed(1)),
          Number((SA_BT.pointValue / 1000).toFixed(1)),
          Number((PB_BT.pointValue / 1000).toFixed(1)),
          Number((QB_BT.pointValue / 1000).toFixed(1)),
          Number((SB_BT.pointValue / 1000).toFixed(1)),
          Number((PC_BT.pointValue / 1000).toFixed(1)),
          Number((QC_BT.pointValue / 1000).toFixed(1)),
          Number((SC_BT.pointValue / 1000).toFixed(1))
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
      }
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
  }


  function getDataFromApi() {
    setisLoading(true)
    api.get('/data/analytics_power_lv/', {
      params: {
        dataPointId1: pointvalueID.PA_BT,
        dataPointId2: pointvalueID.QA_BT,
        dataPointId3: pointvalueID.SA_BT,
        dataPointId4: pointvalueID.FPA_BT,
        dataPointId5: pointvalueID.PB_BT,
        dataPointId6: pointvalueID.QB_BT,
        dataPointId7: pointvalueID.SB_BT,
        dataPointId8: pointvalueID.FPB_BT,
        dataPointId9: pointvalueID.PC_BT,
        dataPointId10: pointvalueID.QC_BT,
        dataPointId11: pointvalueID.SC_BT,
        dataPointId12: pointvalueID.FPC_BT,
        dataPointId13: pointvalueID.POWER_FACTOR_AVG,
      },
      timeout: 2000
    }).then(function (response) {

      const responsedata1: dataPointValue = response.data.data1
      const responsedata2: dataPointValue = response.data.data2
      const responsedata3: dataPointValue = response.data.data3
      const responsedata4: dataPointValue = response.data.data4
      const responsedata5: dataPointValue = response.data.data5
      const responsedata6: dataPointValue = response.data.data6
      const responsedata7: dataPointValue = response.data.data7
      const responsedata8: dataPointValue = response.data.data8
      const responsedata9: dataPointValue = response.data.data9
      const responsedata10: dataPointValue = response.data.data10
      const responsedata11: dataPointValue = response.data.data11
      const responsedata12: dataPointValue = response.data.data12
      const responsedata13: dataPointValue = response.data.data13
      setPA_BT(responsedata1)
      setQA_BT(responsedata2)
      setSA_BT(responsedata3)
      setFPA_BT(responsedata4)
      setPB_BT(responsedata5)
      setQB_BT(responsedata6)
      setSB_BT(responsedata7)
      setFPB_BT(responsedata8)
      setPC_BT(responsedata9)
      setQC_BT(responsedata10)
      setSC_BT(responsedata11)
      setFPC_BT(responsedata12)
      setPOWER_FACTOR_AVG(responsedata13)
      setisLoading(false)

    }).catch(function (error) {
      if (!!error.response)
        Alert.alert(error.response.data.error)
      else
        Alert.alert(error.message)
    });
  }


  return (
    <ImageBackground resizeMode="stretch" source={backgroundImage} style={{ flex: 1 }}>
      <PageHeader title="Analíticos" subtitle="Baixa Tensão" />
      <BorderlessButton style={styles.reload}>
        <MaterialCommunityIcons onPress={getDataFromApi} name="reload" size={24} color="#4989ff" />
      </BorderlessButton>

      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.dashTitle}>Potência de Fase</Text>
        <BarChart
          fromZero={true}
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          yAxisLabel=""
          data={dataset}
          width={windowWidth}
          height={250}

          flatColor={true}
          yAxisSuffix=""
          chartConfig={{ ...chartConfigs, barPercentage: 0.9 }}
        />

        <View style={styles.powerFactorAverageContainer}>
          <Text style={{ ...styles.powerFactorAverageTitle, color: chartConfigs.color(0.8) }}>Fator de Potência Médio</Text>
          <Text style={{ ...styles.powerFactorAverageText, color: chartConfigs.color(0.8) }}>{POWER_FACTOR_AVG.pointValue.toFixed(2)}</Text>
        </View>

        <View style={{ ...styles.valueBoxContainer }}>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `rgba(145, 229, 246, 1)` }}>Fase A</Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(145, 229, 246, 1)` }}>
              {(PA_BT.pointValue / 1000).toFixed(2)} kW
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(145, 229, 246, 1)` }}>
              {(QA_BT.pointValue / 1000).toFixed(2)} kvar
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(145, 229, 246, 1)` }}>
              {(SA_BT.pointValue / 1000).toFixed(2)} kVA
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(145, 229, 246, 1)` }}>
              fp = {FPA_BT.pointValue.toFixed(2)}
            </Text>
            {/* <Text style={{ ...styles.valueBoxTitle, color: `rgba(145, 229, 246, 1)` }}>FP</Text> */}
          </View>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `rgba(215, 217, 215, 1)` }}>Fase B</Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(215, 217, 215, 1)` }}>
              {(PB_BT.pointValue / 1000).toFixed(2)} kW
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(215, 217, 215, 1)` }}>
              {(QB_BT.pointValue / 1000).toFixed(2)} kvar
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(215, 217, 215, 1)` }}>
              {(SB_BT.pointValue / 1000).toFixed(2)} kVA
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(215, 217, 215, 1)` }}>
              fp = {FPB_BT.pointValue.toFixed(2)}
            </Text>
            {/* <Text style={{ ...styles.valueBoxTitle, color: `rgba(215, 217, 215, 1)` }}>FP</Text> */}
          </View>

          <View style={{ ...styles.valueBoxWrapper, }}>
            <Text style={{ ...styles.valueBoxTitle, color: `rgba(188, 185, 223, 1)` }}>Fase C</Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(188, 185, 223, 1)` }}>
              {(PC_BT.pointValue / 1000).toFixed(2)} kW
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(188, 185, 223, 1)` }}>
              {(QC_BT.pointValue / 1000).toFixed(2)} kvar
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(188, 185, 223, 1)` }}>
              {(SC_BT.pointValue / 1000).toFixed(2)} kVA
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `rgba(188, 185, 223, 1)` }}>
              fp = {FPC_BT.pointValue.toFixed(2)}
            </Text>
            {/* <Text style={{ ...styles.valueBoxTitle, color: `rgba(188, 185, 223, 1)` }}>FP</Text> */}
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

export default AnalyticsPowerLV;