import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import BasicLayout from "./layouts/BasicLayout"
import { ConfigProvider } from "antd";

//antd 中文
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";


moment.locale("zh_CN");

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <ConfigProvider locale={zhCN}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/" component={BasicLayout} />
          </Switch>
        </ConfigProvider>
      </Router>
    </div>
  );
}

export default App;
