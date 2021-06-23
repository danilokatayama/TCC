import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
// import * as auth from '../services/auth';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(usr: string, pwd: string): Promise<void>;
  signOut(): void;
}

interface User {
  id: number;
  username: string;
  email: string;
  lastLogin: number;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@XploreApp:user');
      const storagedToken = await AsyncStorage.getItem('@XploreApp:token');
      const storagedLastLogin = await AsyncStorage.getItem('@XploreApp:lastLogin');


      if (storagedUser && storagedToken && storagedLastLogin) {
        const now = new Date().getTime();
        const lastLogin = parseInt(storagedLastLogin);
        const dayInMiliSec = 24 * 60 * 60 * 1000;

        if (now - lastLogin > dayInMiliSec) {
          Alert.alert(
            "Session expired",
            "Please, log in again",
            [
              { text: "OK", onPress: () => signOut() }
            ],
            { cancelable: false }
          );
          return;
        }


        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(username: string, password: string) {
    await api.post('/auth/authenticate', {
      username,
      password
    }, { timeout: 2000 }).then(async function (response) {

      const user: User = response.data.user;
      const token = response.data.token;

      setUser(user);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await AsyncStorage.setItem('@XploreApp:user', JSON.stringify(user.username));
      await AsyncStorage.setItem('@XploreApp:token', token);
      await AsyncStorage.setItem('@XploreApp:lastLogin', JSON.stringify(user.lastLogin));
    }).catch(function (error) {
      Alert.alert(error.response.data.error)
    });
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
      api.defaults.headers.common["Authorization"];
    });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;