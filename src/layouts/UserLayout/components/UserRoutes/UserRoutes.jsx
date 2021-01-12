import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routerConfig from '@/config/routerConfig'
function UserRoutes() {
	const userInfo = sessionStorage.getItem("userInfo");
	const renderRouter = (item, index) => {
		//渲染路由组件
		if (item.component) {
			return (
				<Route
					key={index}
					path={item.path}
					exact={item.exact}
					component={item.component}
				/>
			)
		} else {
			return null
		}
	}
	if (userInfo) {
		return (
			<Switch>
				{/* 渲染路由表 */}
				{routerConfig.map(renderRouter)}
				<Route path="/system" />
			</Switch>
		)
	} else {
		return <Redirect to="/" />
	}

}
export default UserRoutes
