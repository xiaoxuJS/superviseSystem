let casUrl = "http://10.4.55.198:8080/cas/";

if (process.env.NODE_ENV === "production") {
  casUrl = "140.143.138.92:8088";
}

export default casUrl;
