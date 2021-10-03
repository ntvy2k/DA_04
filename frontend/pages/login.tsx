import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { login, fetch_user } from "../features/auth";

const Login = () => {
  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );
  const router = useRouter();

  React.useEffect(() => {
    if (is_authenticated) {
      router.push("/");
    }
  }, [is_authenticated, router]);

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const dispatch = useAppDispatch();

  const handleClick = () => {
    login(username, password)
      .then((response) => {
        localStorage.setItem("key", response.data.access);
        const local_token = localStorage.getItem("key");
        if (local_token !== null) {
          dispatch(fetch_user(local_token))
            .unwrap()
            .then((res) => {
              console.log("res", res);
              router.push("/");
            })
            .catch((err) => console.log("err", err));
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Head>
      <div>
        <form>
          <label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
          <button type="button" onClick={() => handleClick()}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
