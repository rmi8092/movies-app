import { GenerateRequestOptionsProps } from "@/app/types/auth";

export const dashTitle = (title: string): string => {
  return title.replace(/\s/g, '-')
}

export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const currentDate = new Date();
  return date > currentDate;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

export const generateRequestOptions = ({ method, payload = false, auth = false }: GenerateRequestOptionsProps) => {
  let headers: HeadersInit = {
      'Content-Type': 'application/json',
  };
  if (auth) {
    headers = {
      ...headers,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
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
