import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, ImageBackground, Alert } from 'react-native';

import backgroundImage from '../../assets/background.png'

import styles from './styles';

import pointvalueID from '../../config/pointvalues.json'
import api from '../../services/api'

import PageHeader from '../../components/PageHeader';

import Generator_ON from '../../assets/Tela04_Generator_ON.png'
import RP_ON from '../../assets/Tela04_RP_ON.png'
import DJ_52_01_ON from '../../assets/Tela04_DJ_52-01_ON.png'

import Generator_OFF from '../../assets/Tela04_Generator_OFF.png'
import RP_OFF from '../../assets/Tela04_RP_OFF.png'
import DJ_52_01_OFF from '../../assets/Tela04_DJ_52-01_OFF.png'

interface dataPointValue {
  id: number,
  dataPointId: number,
  dataType: number,
  pointValue: number,
  ts: number
}


function SingleLineDiagram() {
  const [IA_MT, setIA_MT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [IB_MT, setIB_MT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [IC_MT, setIC_MT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });

  const [IA_BT, setIA_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [IB_BT, setIB_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [IC_BT, setIC_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [VL_BT, setVL_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [VF_BT, setVF_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [PT_BT, setPT_BT] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 0,
    ts: 10800000
  });
  const [Barra_Sup_Energ, setBarra_Sup_Energ] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 1,
    ts: 10800000
  });
  const [Barra_Inf_Energ, setBarra_Inf_Energ] = useState<dataPointValue>({
    id: 0,
    dataPointId: 0,
    dataType: 0,
    pointValue: 1,
    ts: 10800000
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  function getDataFromApi() {
    api.get('/data/single_line_diagram/', {
      params: {
        dataPointId1: pointvalueID.IA_MT,
        dataPointId2: pointvalueID.IB_MT,
        dataPointId3: pointvalueID.IC_MT,
        dataPointId4: pointvalueID.IA_BT,
        dataPointId5: pointvalueID.IB_BT,
        dataPointId6: pointvalueID.IC_BT,
        dataPointId7: pointvalueID.VL_BT,
        dataPointId8: pointvalueID.VF_BT,
        dataPointId9: pointvalueID.PT_BT,
        dataPointId10: pointvalueID.Barra_Sup_Energ,
        dataPointId11: pointvalueID.Barra_Inf_Energ,
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

      setIA_MT(responsedata1)
      setIB_MT(responsedata2)
      setIC_MT(responsedata3)

      setIA_BT(responsedata4)
      setIB_BT(responsedata5)
      setIC_BT(responsedata6)
      setVL_BT(responsedata7)
      setVF_BT(responsedata8)
      setPT_BT(responsedata9)

      setBarra_Sup_Energ(responsedata10)
      setBarra_Inf_Energ(responsedata11)


    }).catch(function (error) {
      if (!!error.response)
        Alert.alert(error.response.data.error)
      else
        Alert.alert(error.message)
    });
  }

  return (
    <>
      <ImageBackground resizeMode="stretch" source={backgroundImage} style={{ flex: 1 }}>
        <PageHeader title='Diagrama Unifilar' />
        <View style={styles.container} >
          <View style={styles.content}>

            <Text style={styles.generatorTitle}>{`AUG205\nAUG206`}</Text>
            <Image source={Barra_Sup_Energ.pointValue === 1 ? Generator_ON : Generator_OFF} style={styles.generator} resizeMode='contain' />

            <Text style={styles.rp5101Title}>51-01</Text>
            <Text style={styles.rpTR01Title}>TR-01</Text>
            <Image source={Barra_Sup_Energ.pointValue === 1 ? RP_ON : RP_OFF} style={styles.rp} resizeMode='contain' />

            <Text style={styles.rp5102Title}>51-02</Text>
            <Image source={Barra_Inf_Energ.pointValue === 1 ? DJ_52_01_ON : DJ_52_01_OFF} style={styles.dj} resizeMode='contain' />
            <Text style={styles.loadTitle}>Load</Text>

            <View style={styles.infoBox1Container} >
              <View style={styles.infoBoxLeftItem} >
                <Text style={styles.tableText}>IA</Text>
                <Text style={styles.tableText}>IB</Text>
                <Text style={styles.tableText}>IC</Text>
              </View>
              <View style={styles.infoBoxRightItem} >
                <Text style={styles.tableText}>{IA_MT.pointValue.toFixed(2)} A</Text>
                <Text style={styles.tableText}>{IB_MT.pointValue.toFixed(2)} A</Text>
                <Text style={styles.tableText}>{IC_MT.pointValue.toFixed(2)} A</Text>
              </View>
            </View>

            <View style={styles.infoBox2Container} >
              <View style={styles.infoBoxLeftItem} >
                <Text style={styles.tableText}>IA</Text>
                <Text style={styles.tableText}>IB</Text>
                <Text style={styles.tableText}>IC</Text>
                <Text style={styles.tableText}>VL</Text>
                <Text style={styles.tableText}>VF</Text>
                <Text style={styles.tableText}>PT</Text>
              </View>
              <View style={styles.infoBoxRightItem} >
                <Text style={styles.tableText}>{IA_BT.pointValue.toFixed(2)} A</Text>
                <Text style={styles.tableText}>{IB_BT.pointValue.toFixed(2)} A</Text>
                <Text style={styles.tableText}>{IC_BT.pointValue.toFixed(2)} A</Text>
                <Text style={styles.tableText}>{VL_BT.pointValue.toFixed(2)} V</Text>
                <Text style={styles.tableText}>{VF_BT.pointValue.toFixed(2)} V</Text>
                <Text style={styles.tableText}>{(PT_BT.pointValue / 1000).toFixed(2)} kW</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>

  );
}

export default SingleLineDiagram;