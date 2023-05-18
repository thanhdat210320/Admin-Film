import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRED_1DAY } from '@/contants/auth'
import { SignInParams } from '@/models/authentication'
import authenticationAPI from '@/services/authentication.service'
import userAPI from '@/services/users.service'
import { getCachedData, removeCacheData, setCacheData } from '@/utils/storage'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

interface IAuthContextProps {
  isAuthenticated?: boolean | undefined
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean | undefined>>
  loading?: boolean,
  user?: { [key: string]: any },
  signIn: (params: SignInParams) => void,
  signOut: () => void,
  setUser: React.Dispatch<React.SetStateAction<{ [key: string]: any } | undefined>>,
}

const AuthContext = createContext<IAuthContextProps>({
  signIn: () => { },
  signOut: () => { },
  setUser: () => { },
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<{ [key: string]: any } | undefined>({})
  const access_token = getCachedData(ACCESS_TOKEN)
  
  useEffect(() => {
    if (access_token) {
      getCurentUser();
    } else {
      setIsAuthenticated(false)
    }
  }, [access_token])

  const getCurentUser = async () => {
    const { data } = await userAPI.getProfile()
    if (data) {
      setUser(data)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  const signIn = async (params: SignInParams) => {
    setLoading(true)
    const dataUser: any = await authenticationAPI.signIn(params)
    console.log(dataUser)
    setUser(dataUser?.user)
    if (dataUser?.auth?.access_token) {
      setCacheData(ACCESS_TOKEN, dataUser.auth?.access_token, EXPIRED_1DAY)
      setCacheData(REFRESH_TOKEN, dataUser.auth?.refresh_token, 7 * EXPIRED_1DAY)
			localStorage.setItem("userID",JSON.stringify(dataUser.user.id))
      setIsAuthenticated(true)
      toast.success('Đăng nhập thành công!')
    } else {
      setIsAuthenticated(false)
      toast.error(dataUser?.message || "Tên đăng nhập hoặc mật khẩu không chính xác")
    }
    setLoading(false)
  }

  const signOut = async () => {
    const status = await authenticationAPI.signOut()
    if (status) {
      removeCacheData(ACCESS_TOKEN)
      removeCacheData(REFRESH_TOKEN)
      setIsAuthenticated(false)
			localStorage.removeItem("userID")
    }
  };

  const value = useMemo(
    () => ({
      loading,
      isAuthenticated,
      user,
      signIn,
      signOut,
      setUser,
    }),
    [loading, isAuthenticated, user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}