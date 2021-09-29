import axios from "axios";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

interface Token {
  access: string;
}

type Enpoint = "token" | "token-destroy";

const make_url = (enpoint: Enpoint): string => {
  const base_url = "http://nginx/auth/";
  return base_url + enpoint;
};

const fetchToken = (username: string, password: string) => {};

const AuthProvider = () => {};

export default AuthProvider;
