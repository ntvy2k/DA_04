import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

// Uncomplete... Lam di Phuc

type RegisterForm = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};

/**
 * 0: Successful
 * 1: Username already exists
 * 2: Email already exists
 */
type RegisterStatus = {
  status: 0 | 1 | 2;
};

const initForm: RegisterForm = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: "",
};

const RegForm = () => {
  const router = useRouter();
  const [form_data, set_form_data] = useState<RegisterForm>(initForm);
  const [confirm_password, set_confirm_password] = useState<string>("");

  const register = (): Promise<AxiosResponse<RegisterStatus>> => {
    const url = "auth/register/";
    return axios.post(url, form_data);
  };

  const handleSubmit = () => {
    if (form_data.password === confirm_password) {
      register()
        .then((res) => {
          const r = res.data;
          if (r.status === 0) {
            console.log("Register Successful");
            router.push("/login");
          } else if (r.status === 1) {
            console.log("Username already exists");
          } else if (r.status === 2) {
            console.log("Email already exists");
          }
        })
        .catch((err) => console.log("Error: Unknown...", err));
    } else {
      console.log("Passwords not match");
    }
    set_form_data(initForm);
    set_confirm_password("");
  };

  return (
    <>
      <form>
        <label>
          First Name:
          <input
            type="text"
            value={form_data.first_name}
            onChange={(e) =>
              set_form_data({ ...form_data, first_name: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={form_data.last_name}
            onChange={(e) =>
              set_form_data({ ...form_data, last_name: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={form_data.username}
            onChange={(e) =>
              set_form_data({ ...form_data, username: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={form_data.email}
            onChange={(e) =>
              set_form_data({ ...form_data, email: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={form_data.password}
            onChange={(e) =>
              set_form_data({ ...form_data, password: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirm_password}
            onChange={(e) => set_confirm_password(e.currentTarget.value)}
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </>
  );
};

const Register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register an account" />
      </Head>
      <RegForm />
    </>
  );
};

export default Register;
