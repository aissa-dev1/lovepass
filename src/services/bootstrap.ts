import axios from "axios";

export class BootStrapService {
  post() {
    return axios.post("/api/bootstrap");
  }
}
