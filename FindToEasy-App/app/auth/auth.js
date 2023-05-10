import { useState, createContext, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null)
export let accessToken = "";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(async () => {
    const loggedDetails = await AsyncStorage.getItem('user')
    console.log(loggedDetails);
    if (loggedDetails) {
      const jsData = JSON.parse(loggedDetails);
      accessToken = jsData.token;
      const decodeData = jwt_decode(accessToken);
      setUser({ ...jsData, ...decodeData });
    }
  }, [])

  const login = user => {
    AsyncStorage.setItem('user', JSON.stringify(user));
    accessToken = user.token;
    setUser(user);
  }

  const logout = () => {
    AsyncStorage.setItem('user', "");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
