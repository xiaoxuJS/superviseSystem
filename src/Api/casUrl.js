let casUrl = "http://10.4.55.198:8080/cas/";

if (process.env.NODE_ENV === "production") {
  casUrl = "http://10.4.56.8/cas/";
}

export default casUrl;
