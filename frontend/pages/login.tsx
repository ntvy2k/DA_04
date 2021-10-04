import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, fetch_user } from "../features/auth";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );

  React.useEffect(() => {
    if (is_authenticated && localStorage.getItem("key") !== null) {
      router.push("/");
    }
  }, [is_authenticated, router]);

  React.useEffect(() => {
    const token = localStorage.getItem("key");
    if (token !== null) {
      dispatch(fetch_user(token))
        .unwrap()
        .then(() => router.push("/"));
    }
  }, [dispatch, router]);

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleClick = () => {
    login(username, password)
      .then((response) => {
        localStorage.setItem("key", response.data.access);
        router.push("/");
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
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </label>
          <label>
            Password:
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
