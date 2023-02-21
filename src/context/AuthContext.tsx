axios.defaults.baseURL=process.env.NEXT_PUBLIC_BASE_URL;

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  registerUser: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        const decoded:any = jwt_decode(storedToken);
        setLoading(true);
        await axios
          .get(`${authConfig.meEndpoint}/${decoded._id}`,
            {
            headers: {
              'x-auth-token': storedToken,
            }
          })
          .then(async response => {
            setLoading(false);  
            setUser({ ...response.data.result})
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const {email,password,rememberMe}=params;
    axios
      .post(authConfig.loginEndpoint, {email,password})
      .then(async response => {
        rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.result.jwtToken)
          : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.result.employeeModel })
    rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.result.employeeModel)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => { 
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (!res.data.success) {
          if (errorCallback) errorCallback(res.data.result)
        } else {
          handleLogin({ email: params.email, password: params.password,rememberMe:true })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    registerUser: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
