import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../../../components/PageHeader';
import backgroundImage from '../../../../assets/background.png';
import api from '../../../../services/api'
import pointvalueID from '../../../../config/pointvalues.json'

import {
  LineChart,
} from "react-native-chart-kit";
import { BorderlessButton } from 'react-native-gesture-handler';

const chartConfig = {

  backgroundColor: 'white',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(${252}, ${252}, ${252}, ${1})`,
  style: {
    borderRadius: 16
  },
  useShadowColorFromDataset: true
}

const linechartColor = [

  () => `rgba(145, 229, 246, 1)` // optional = 1) => `rgb
  ,
  () => `rgba(215, 217, 215, 1)` // optional = 1) => `rgb
  ,
  () => `rgba(188, 185, 223, 1)` // optional = 1) => `rgb
]


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface dataPointValue {
  id: number,
  dataPointId: number,
  dataType: number,
  pointValue: number,
  ts: number
}

function convertTStoDate(ts: number) {

  var time = new Date(ts);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  // var hour = time.getHours();
  // var min = time.getMinutes();
  // var sec = time.getSeconds();
  var hhminsec = time.toTimeString().split(' ')[0];
  // var timetostring = `${day}/${month}/${year} ${hhminsec}`;
  var timetostring = `${hhminsec}`;

  return timetostring;
}


function AnalyticsVoltageLV() {
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
  const [data4, setData4] = useState<dataPointValue[]>([{
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  }]);
  const [data5, setData5] = useState<dataPointValue[]>([{
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  }]);
  const [data6, setData6] = useState<dataPointValue[]>([{
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  }]);
  const [maxVA, setMaxVA] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxVB, setMaxVB] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxVC, setMaxVC] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minVA, setMinVA] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minVB, setMinVB] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minVC, setMinVC] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxVAB, setMaxVAB] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxVBC, setMaxVBC] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [maxVCA, setMaxVCA] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minVAB, setMinVAB] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minVBC, setMinVBC] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [minVCA, setMinVCA] = useState<dataPointValue | undefined>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [time, setTime] = useState<number>((new Date().getTime() - 60 * 60 * 1000));
  const [labels, setLabels] = useState<string[]>([''])
  const [isLoading, setisloading] = useState(true)

  useEffect(() => {
    const maxLabels = 4;
    let labels2 = data1.map(function (item) {

      var a = new Date(item.ts);
      // var hour = a.getHours();
      // var min = a.getMinutes();
      // var sec = a.getSeconds();
      var s = a.toTimeString().split(' ')[0]
      var timetostring = s;
      // console.log(timetostring)

      return timetostring;
    });
    const label2Length90 = labels2.length * 0.9; // 90% do tamanho
    const labelRadix = Math.max(Math.floor(labels2.length / maxLabels), 1)

    labels2 = labels2.map((label, idx) =>
      idx % labelRadix === 0 && idx < label2Length90 ? label : ''
    )
    setLabels(labels2)
  }, [data1])


  // var time = new Date();
  // time.setHours(time.getHours() - 1);
  // console.log(time)
  // console.log(time.getTime())

  let data_vf = {
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
    legend: ["VA", "VB", "VC"] // optional
  }

  let data_vl = {
    labels: labels,
    datasets: [
      {
        data: data4.map(item => parseFloat(item.pointValue.toFixed(2))),
        color: linechartColor[0]
      },
      {
        data: data5.map(item => parseFloat(item.pointValue.toFixed(2))),
        //
        color: linechartColor[1]
      },
      {
        data: data6.map(item => parseFloat(item.pointValue.toFixed(2))),
        //
        color: linechartColor[2]
      }
    ],
    legend: ["VA", "VB", "VC"] // optional
  }

  function getDataFromApi() {
    setisloading(true)
    setTime(new Date().getTime() - 60 * 60 * 1000)
    api.get('/data/analytics_voltage_lv/', {
      params: {
        dataPointId1: pointvalueID.VA_BT,
        dataPointId2: pointvalueID.VB_BT,
        dataPointId3: pointvalueID.VC_BT,
        dataPointId4: pointvalueID.VAB_BT,
        dataPointId5: pointvalueID.VBC_BT,
        dataPointId6: pointvalueID.VCA_BT,
        ts: time
      },
      timeout: 2000
    }).then(function (response) {
      // console.log(JSON.stringify(response.data));
      // setData1(response.data.map((item: any) =>
      //   item.pointValue
      // ))
      // console.log(response.data.data1)
      // const dataPointvalue1 = response.data.data1.map((item: dataPointValue) => Number(item.pointValue).toFixed(2));
      // const dataPointvalue2 = response.data.data2.map((item: dataPointValue) => Number(item.pointValue).toFixed(2));
      // const dataPointvalue3 = response.data.data3.map((item: dataPointValue) => Number(item.pointValue).toFixed(2));
      // const dataTS = response.data.map((item: any) => item.ts);
      // const teste = response.data.map((item: any) => item.ts);
      // console.log(dataPointvalue[0])
      // console.log('DATAPOINT ts: ' + dataTS)
      const responsedata1: dataPointValue[] = response.data.data1
      const responsedata2: dataPointValue[] = response.data.data2
      const responsedata3: dataPointValue[] = response.data.data3
      const responsedata4: dataPointValue[] = response.data.data4
      const responsedata5: dataPointValue[] = response.data.data5
      const responsedata6: dataPointValue[] = response.data.data6
      setData1(responsedata1)
      setData2(responsedata2)
      setData3(responsedata3)
      setData4(responsedata4)
      setData5(responsedata5)
      setData6(responsedata6)

      const VAmax = Math.max.apply(Math, responsedata1.map(function (o) { return o.pointValue; }))
      setMaxVA(responsedata1.find(function (o) { return o.pointValue == VAmax; }))

      const VBmax = Math.max.apply(Math, responsedata2.map(function (o) { return o.pointValue; }))
      setMaxVB(responsedata2.find(function (o) { return o.pointValue == VBmax; }))

      const VCmax = Math.max.apply(Math, responsedata3.map(function (o) { return o.pointValue; }))
      setMaxVC(responsedata3.find(function (o) { return o.pointValue == VCmax; }))

      const VAmin = Math.min.apply(Math, responsedata1.map(function (o) { return o.pointValue; }))
      setMinVA(responsedata1.find(function (o) { return o.pointValue == VAmin; }))

      const VBmin = Math.min.apply(Math, responsedata2.map(function (o) { return o.pointValue; }))
      setMinVB(responsedata2.find(function (o) { return o.pointValue == VBmin; }))

      const VCmin = Math.min.apply(Math, responsedata3.map(function (o) { return o.pointValue; }))
      setMinVC(responsedata3.find(function (o) { return o.pointValue == VCmin; }))


      const VABmax = Math.max.apply(Math, responsedata4.map(function (o) { return o.pointValue; }))
      setMaxVAB(responsedata4.find(function (o) { return o.pointValue == VABmax; }))

      const VBCmax = Math.max.apply(Math, responsedata5.map(function (o) { return o.pointValue; }))
      setMaxVBC(responsedata5.find(function (o) { return o.pointValue == VBCmax; }))

      const VCAmax = Math.max.apply(Math, responsedata6.map(function (o) { return o.pointValue; }))
      setMaxVCA(responsedata6.find(function (o) { return o.pointValue == VCAmax; }))

      const VABmin = Math.min.apply(Math, responsedata4.map(function (o) { return o.pointValue; }))
      setMinVAB(responsedata4.find(function (o) { return o.pointValue == VABmin; }))

      const VBCmin = Math.min.apply(Math, responsedata5.map(function (o) { return o.pointValue; }))
      setMinVBC(responsedata5.find(function (o) { return o.pointValue == VBCmin; }))

      const VCAmin = Math.min.apply(Math, responsedata6.map(function (o) { return o.pointValue; }))
      setMinVCA(responsedata6.find(function (o) { return o.pointValue == VCAmin; }))

      setisloading(false)


      // console.log(dataPointvalue.length)
      // console.log(data1)
      // console.log(JSON.stringify(response.data.data1))
      // setData1(response.data.data1)
      // setData2(response.data.data2)
      // setData3(response.data.data3)
    }).catch(function (error) {
      // handle error
      // console.log(error)
      if (!!error.response)
        Alert.alert(error.response.data.error)
      else
        Alert.alert(error.message)
      // console.log(error.code);
      // console.log(error.message);
      // console.log(error.stack);
    });
  }


  // console.log(data1)
  // console.log(data2)
  // console.log(data3)
  useEffect(() => {
    getDataFromApi();
    // const interval = setInterval(() => {
    //   console.log('Atualizando depois do intervalo')
    //   getDataFromApi();
    //   console.log('This will run every 10 second!');
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);

  // const data = [1, 2, 3, 4, 5];

  return (
    <ImageBackground resizeMode="stretch" source={backgroundImage} style={{ flex: 1 }}>
      <PageHeader title="Analíticos" subtitle="Baixa Tensão" />



      <BorderlessButton onPress={getDataFromApi} style={styles.reload}>
        <MaterialCommunityIcons name="reload" size={24} color="#4989ff" />
      </BorderlessButton>
      <ScrollView persistentScrollbar={true} contentContainerStyle={styles.container}>
        <Text style={styles.dashTitle}>Tensão de Fase</Text>
        <LineChart
          bezier
          data={data_vf}
          width={windowWidth}
          height={225}
          // yAxisLabel="$"

          yAxisSuffix=" V"
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={chartConfig}
          style={styles.linechart}
          verticalLabelRotation={20}
        // onDataPointClick={({ value, getColor }) =>
        //   showMessage({
        //     message: `${value}`,
        //     description: "You selected this value",
        //     backgroundColor: getColor(0.9)
        //   })
        // }
        // formatXLabel={label => label.toUpperCase()}
        />
        <View style={{ ...styles.valueBoxContainer }}>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[0]}` }}>VA Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {maxVA?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {convertTStoDate(maxVA?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[0]}` }}>VA Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {minVA?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {convertTStoDate(minVA?.ts as number)}
            </Text>
          </View>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[1]}` }}>VB Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {maxVB?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {convertTStoDate(maxVB?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[1]}` }}>VB Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {minVB?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {convertTStoDate(minVB?.ts as number)}
            </Text>
          </View>

          <View style={{ ...styles.valueBoxWrapper, }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[2]}` }}>VC Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {maxVC?.pointValue.toFixed(2)} V
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {convertTStoDate(maxVC?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[2]}` }}>VC Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {minVC?.pointValue.toFixed(2)} V
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {convertTStoDate(minVC?.ts as number)}
            </Text>
          </View>

        </View>

        <Text style={styles.dashTitle}>Tensão de Linha</Text>
        <LineChart
          bezier
          data={data_vl}
          width={windowWidth}
          height={225}
          // yAxisLabel="$"

          yAxisSuffix=" V"
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={chartConfig}
          style={styles.linechart}
          verticalLabelRotation={20}
        // onDataPointClick={({ value, getColor }) =>
        //   showMessage({
        //     message: `${value}`,
        //     description: "You selected this value",
        //     backgroundColor: getColor(0.9)
        //   })
        // }
        // formatXLabel={label => label.toUpperCase()}
        />
        <View style={{ ...styles.valueBoxContainer }}>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[0]}` }}>VAB Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {maxVAB?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {convertTStoDate(maxVAB?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[0]}` }}>VAB Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {minVAB?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[0]}` }}>
              {convertTStoDate(minVAB?.ts as number)}
            </Text>
          </View>

          <View style={{ ...styles.valueBoxWrapper }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[1]}` }}>VBC Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {maxVBC?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {convertTStoDate(maxVBC?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[1]}` }}>VBC Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {minVBC?.pointValue.toFixed(2)} V
            </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[1]}` }}>
              {convertTStoDate(minVBC?.ts as number)}
            </Text>
          </View>

          <View style={{ ...styles.valueBoxWrapper, }}>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[2]}` }}>VCA Máximo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {maxVCA?.pointValue.toFixed(2)} V
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {convertTStoDate(maxVCA?.ts as number)}
            </Text>
            <Text style={{ ...styles.valueBoxTitle, color: `${linechartColor[2]}` }}>VCA Mínimo</Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {minVCA?.pointValue.toFixed(2)} V
              </Text>
            <Text style={{ ...styles.valueBoxText, color: `${linechartColor[2]}` }}>
              {convertTStoDate(minVCA?.ts as number)}
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
export default AnalyticsVoltageLV;