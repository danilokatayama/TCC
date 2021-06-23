import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeMenu from '../pages/HomeMenu';
import SingleLineDiagram from '../pages/SingleLineDiagram';
import AnalyticsLVTabs from './AnalyticsLVTabs';
import AnalyticsMVTabs from './AnalyticsMVTabs';
import EnergyConsumption from '../pages/EnergyConsumption';


const { Navigator, Screen } = createStackNavigator();

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeMenu" component={HomeMenu} />
      <Screen name="SingleLineDiagram" component={SingleLineDiagram} />
      <Screen name="AnalyticsLV" component={AnalyticsLVTabs} />
      <Screen name="AnalyticsMV" component={AnalyticsMVTabs} />
      <Screen name="EnergyConsumption" component={EnergyConsumption} />
    </Navigator>
  );
}

export default AppRoutes;