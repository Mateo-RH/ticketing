import axios from "axios";

export default ({ req }) => {
  return typeof window === "undefined"
    ? axios.create({
        baseURL:
          "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        headers: req.headers,
      })
    : axios.create({ baseURL: "/" });
};
