let systemUrl = "http://10.4.55.248:3000/";

if (process.env.NODE_ENV === "production") {
  systemUrl = "http://10.4.56.23:9006";
}

export default systemUrl;
