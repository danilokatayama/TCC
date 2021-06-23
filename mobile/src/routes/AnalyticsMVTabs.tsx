import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AnalyticsCurrentMV from '../pages/Analytics/MediumVoltage/Current';
import AnalyticsOperationMV from '../pages/Analytics/MediumVoltage/Operation';

const { Navigator, Screen } = createBottomTabNavigator();

function AnalyticsMVTabs() {
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
        name="AnalyticsCurrentMV"
        component={AnalyticsCurrentMV}
        options={{
          tabBarLabel: 'Corrente (A)'
        }}
      />

      <Screen
        name="AnalyticsOperationMV"
        component={AnalyticsOperationMV}
        options={{
          tabBarLabel: 'Operação'
        }}
      />
    </Navigator>
  );
}

export default AnalyticsMVTabs;