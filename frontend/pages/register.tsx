import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { register } from "../features/auth";
import type { RegisterForm } from "../features/auth";

// Uncomplete... Lam di Phuc
// ../features/auth kiem tra nha

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

  const handleSubmit = () => {
    if (form_data.password === confirm_password) {
      register(form_data)
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
