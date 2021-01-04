import React from "react";
import {Switch, Route} from "react-router-dom";
import {userRouter} from "./Routes";

function UserRoutes() {
    const renderRouter = (item, index) => {
        //渲染路由组件
        return item.component ? (
            <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={true}
            />
        ) : null;
    };
    return (
        <Switch>
            {/* 渲染路由表 */}
            {userRouter.map(renderRouter)}
            {/* <Route path="/system/document" /> */}
        </Switch>
    );
}

export default UserRoutes;
