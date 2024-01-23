import { useEffect, useState } from "react";
import { MENU_API } from "../util/constants";
import axios from "axios";

const useRestaruantMenu = (resId) => {
  //to store the fetched data from API
  const [resInfo, setRestInfo] = useState(null);

  //fetch the data from API
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const json = await axios.get(MENU_API + resId + ".json");
    setRestInfo(json.data.data);
  };
  return resInfo;
};
export default useRestaruantMenu;
