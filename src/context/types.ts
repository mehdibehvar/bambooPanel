export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  fullName: string
  email: string
  password: string
  phoneNumber: string
  birthDate: string
  nationalId: string
  address: string
  role: string
  profile: string
}

export type UserDataType = {
  _id:          string;
  fullName:     string;
  email:        string;
  phoneNumber:  string;
  birthDate:    string;
  role:         string;
  isActive:     boolean;
  nationalId:   string;
  registerDate: Date;
  profile:      string;
  address:      string;
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

