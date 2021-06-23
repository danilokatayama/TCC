import React, { useContext } from 'react';

import AuthContext from '../context/auth';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes'
import { NavigationContainer } from '@react-navigation/native';

function Routes() {
  const { signed } = useContext(AuthContext);

  return (
    <NavigationContainer >
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default Routes;