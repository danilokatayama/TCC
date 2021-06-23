import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AnalyticsVoltageLV from '../pages/Analytics/LowVoltage/Voltage';
import AnalyticsCurrentLV from '../pages/Analytics/LowVoltage/Current';
import AnalyticsPowerLV from '../pages/Analytics/LowVoltage/Power';

const { Navigator, Screen } = createBottomTabNavigator();

function AnalyticsLVTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20
        },
        labelStyle: {
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 13,
        },
        inactiveBackgroundColor: '#2A80B9',
        activeBackgroundColor: '#3689c2',
        inactiveTintColor: '#c1bccc',
        activeTintColor: 'white'
      }}
    >
      <Screen
        name="AnalyticsVoltageLV"
        component={AnalyticsVoltageLV}
        options={{
          tabBarLabel: 'Tensão (V)'
        }}
      />

      <Screen
        name="AnalyticsCurrentLV"
        component={AnalyticsCurrentLV}
        options={{
          tabBarLabel: 'Corrente (A)'
        }}
      />

      <Screen
        name="AnalyticsPowerLV"
        component={AnalyticsPowerLV}
        options={{
          tabBarLabel: 'Potência (W)'
        }}
      />




    </Navigator>
  );
}

export default AnalyticsLVTabs;