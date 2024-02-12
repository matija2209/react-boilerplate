import axios, { AxiosRequestConfig } from "axios";

type MakeApiRequest = <T = any>(
  endpoint: string,
  opts: AxiosRequestConfig
) => Promise<T>;
export const makeApiOneRequest: MakeApiRequest = async (endpoint, opts) => {
  //   const key = import.meta.env.DEV.valueOf("VITE_SERVER_ADDRESS");
  const config: AxiosRequestConfig = {
    url: `http://localhost:5341/api/${endpoint}`,
    method: opts?.method ? opts.method : "get",
    ...opts,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    alert(err.message);
  }
};
