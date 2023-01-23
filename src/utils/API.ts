import axios from "axios";
import { useEffect, useState } from "react";
import { notifyError } from "./notify";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
//   params: {
//     api_key: process.env.REACT_APP_TMDB_KEY,
//   },
});

// export const ImgAPI = process.env.REACT_APP_IMG_URL;

interface Iapiget {
    url ?: string;
    params ?: object;
    fetchOnMounted ?: boolean;
}

export const ApiGet = (props:Iapiget) => {
  const {url = "", params = {}, fetchOnMounted = false} = props
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const getData = async (_url:string) => {
    try {
      const res = await API.get(_url, { params });
      setData(res?.data);
      return(res?.data)
    } catch (err: any) {
        notifyError(err?.response?.data)
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if(fetchOnMounted){
      getData(url);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading: isLoading,
    fetch : (newUrl:string)=>getData(newUrl)
  };
};
