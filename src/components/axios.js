import axios from "axios";

const instance = axios.create({
  baseURL: "https://dat-ap-back.herokuapp.com/",
});

export default instance;
