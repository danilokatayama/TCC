import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import styles from './styles';
import PageHeader from '../../../../components/PageHeader';
import backgroundImage from '../../../../assets/background.png';

import api from '../../../../services/api'
import pointvalueID from '../../../../config/pointvalues.json'

import {
  LineChart,
} from "react-native-chart-kit";

const chartConfig = {

  backgroundColor: 'white',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: () => `rgba(${252}, ${252}, ${252}, ${1})`,
  style: {
    borderRadius: 16
  },
  useShadowColorFromDataset: true
}

const linechartColor = [

  () => `rgba(145, 229, 246, 1)`
  ,
  () => `rgba(215, 217, 215, 1)`
  ,
  () => `rgba(188, 185, 223, 1)`
]


const windowWidth = Dimensions.get('window').width;
interface dataPointValue {
  id: number,
  dataPointId: number,
  dataType: number,
  pointValue: number,
  ts: number
}

function convertTStoDate(ts: number) {

  var time = new Date(ts);
  var hhminsec = time.toTimeString().split(' ')[0];
  var timetostring = `${hhminsec}`;

  return timetostring;
}

function AnalyticsCurrentLV() {
  const [data1, setData1] = useState<dataPointValue[]>([{
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  }]);
  const [data2, setData2] = useState<dataPointValue[]>([{
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  }]);
  const [data3, setData3] = useState<dataPointValue[]>([{
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  }]);
  const [maxIA, setMaxIA] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxIB, setMaxIB] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxIC, setMaxIC] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minIA, setMinIA] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minIB, setMinIB] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minIC, setMinIC] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [time, setTime] = useState<number>((new Date().getTime() - 60 * 60 * 1000));
  const [labels, setLabels] = useState<string[]>([''])
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {

  }, [isLoading])

  useEffect(() => {
    const maxLabels = 4;
    let labels2 = data1.map(function (item) {

      var a = new Date(item.ts);
      var s = a.toTimeString().split(' ')[0]
      var timetostring = s;

      return timetostring;
    });
    const label2Length90 = labels2.length * 0.9; // 90% do tamanho
    const labelRadix = Math.max(Math.floor(labels2.length / maxLabels), 1)

    labels2 = labels2.map((label, idx) =>
      idx % labelRadix === 0 && idx < label2Length90 ? label : ''
    )
    setLabels(labels2)
  }, [data1])

  let data = {
    labels: labels,
    datasets: [
      {
        data: data1.map(item => parseFloat(item.pointValue.toFixed(2))),
        color: linechartColor[0]
      },
      {
        data: data2.map(item => parseFloat(item.pointValue.toFixed(2))),
        //
        color: linechartColor[1]
      },
      {
        data: data3.map(item => parseFloat(item.pointValue.toFixed(2))),
        //
        color: linechartColor[2]
      }
    ],
    legend: ["IA", "IB", "IC"] // optional
  }

  function getDataFromApi() {
    setisLoading(true)
    setTime(new Date().getTime() - 60 * 60 * 1000)
    api.get('/data/analytics_current_lv/', {
      params: {
        dataPointId1: pointvalueID.IA_BT,
        dataPointId2: pointvalueID.IB_BT,
        dataPointId3: pointvalueID.IC_BT,
        ts: time
      },
      timeout: 2000
    }).then(function (response) {

      const responsedata1: dataPointValue[] = response.data.data1
      const responsedata2: dataPointValue[] = response.data.data2
      const responsedata3: dataPointValue[] = response.data.data3
      setData1(responsedata1)
      setData2(responsedata2)
      setData3(responsedata3)

      const IAmax = Math.max.apply(Math, responsedata1.map(function (o) { return o.pointValue; }))
      setMaxIA(responsedata1.find(function (o) { return o.pointValue == IAmax; }))

      const IBmax = Math.max.apply(Math, responsedata2.map(function (o) { return o.pointValue; }))
      setMaxIB(responsedata2.find(function (o) { return o.pointValue == IBmax; }))

      const ICmax = Math.max.apply(Math, responsedata3.map(function (o) { return o.pointValue; }))
      setMaxIC(responsedata3.find(function (o) { return o.pointValue == ICmax; }))

      const IAmin = Math.min.apply(Math, responsedata1.map(function (o) { return o.pointValue; }))
      setMinIA(responsedata1.find(function (o) { return o.pointValue == IAmin; }))

      const IBmin = Math.min.apply(Math, responsedata2.map(function (o) { return o.pointValue; }))
      setMinIB(responsedata2.find(function (o) { return o.pointValue == IBmin; }))

      const ICmin = Math.min.apply(Math, responsedata3.map(function (o) { return o.pointValue; }))
      setMinIC(responsedata3.find(function (o) { return o.pointValue == ICmin; }))

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
      <PageHeader title="Analíticos" subtitle="Baixa Tensão" />



      <BorderlessButton onPress={getDataFromApi} style={styles.reload}>
        <MaterialCommunityIcons name="reload" size={24} color="#4989ff" />
      </BorderlessButton>
      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.dashTitle}>Corrente de Fase</Text>
        <LineChart
          bezier
          data={data}
          width={windowWidth}
          height={225}

          yAxisSuffix=" A"
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={chartConfig}
          style={styles.linechart}
          verticalLabelRotation={20}
        />
        <View style={{ ...styles.valueBoxContainer }}>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[0]}` }}>IA Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {maxIA?.pointValue.toFixed(2)} A
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {convertTStoDate(maxIA?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[0]}` }}>IA Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {minIA?.pointValue.toFixed(2)} A
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {convertTStoDate(minIA?.ts as number)}
            </Text>
          </View>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[1]}` }}>IB Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {maxIB?.pointValue.toFixed(2)} A
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {convertTStoDate(maxIB?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[1]}` }}>IB Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {minIB?.pointValue.toFixed(2)} A
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {convertTStoDate(minIB?.ts as number)}
            </Text>
          </View>

          <View style={{ ...styles.valueBoxWrapper, }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[2]}` }}>IC Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {maxIC?.pointValue.toFixed(2)} A
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {convertTStoDate(maxIC?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[2]}` }}>IC Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {minIC?.pointValue.toFixed(2)} A
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {convertTStoDate(minIC?.ts as number)}
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

export default AnalyticsCurrentLV;