export interface SigninResponse {
  token: string
}

export interface GenerateRequestOptionsProps {
  method: string
  payload?: Object
  auth?: boolean
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}