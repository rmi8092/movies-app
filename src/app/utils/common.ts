import {useAuthStore} from '@/store';
import { GenerateRequestOptionsProps } from "@/app/types/auth";

export const dashTitle = (title: string) => {
  return title.replace(/\s/g, '-')
}

export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const currentDate = new Date();
  return date > currentDate;
}

export const generateRequestOptions = ({ method, payload = false, auth = false }: GenerateRequestOptionsProps) => {
  const token = useAuthStore.getState().token
  let headers: HeadersInit = {
      'Content-Type': 'application/json',
  };
  if (auth) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }
  if (payload) {
    headers = {
      ...headers,
      body: JSON.stringify(payload)
    };
  }
  return {
      method,
      headers
  };
}
