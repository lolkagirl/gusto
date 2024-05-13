import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const signup = async (username, email, password) => {
  const { data } = await $host.post("api/user/signup", {
    username,
    email,
    password,
    role: "USER",
  });
  return jwtDecode(data.token);
};

export const signin = async (email, password) => {
  const { data } = await $host.post("api/user/signin", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const addComment = async (description) => {
  const { data } = await $authHost.post("api/user/feedback", {
    description,
  });
  return data;

};


