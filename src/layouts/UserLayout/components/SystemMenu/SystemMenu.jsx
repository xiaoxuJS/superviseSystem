import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom';
import ZhProIcon from '@/components/ZhProIcon/ZhProIcon';
import menuConfig from '@/config/menuConfig';
import getSelectedMenu from '@/utils/getSelectedMenu'
import intersection from 'lodash/intersection';
const { SubMenu } = Menu
function SystemMenu({ location, history }) {
	const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	const [selectedKeys, setSelectedKeys] = useState([]);//当前选中的子级菜单
	const { pathname } = location;
	useEffect(() => {
		let newSelectedMenuKeys = getSelectedMenu(pathname);
		setSelectedKeys([newSelectedMenuKeys]);
	}, [pathname])
	function handleClickMenu({ key, domEvent }) {
		const { target } = domEvent;
		const path = key.replace(/-/g, "/")
		history.push({
			pathname: "/system/" + path,
			state: {
				title: target.innerText,
				key
			}
		});
	}
	return (
		<Menu
			mode="inline"
			theme="dark"
			defaultOpenKeys={["performance-assessment-management", "task-assessment-anagement"]}
			selectedKeys={selectedKeys}
			onClick={handleClickMenu}
		>
			{
				menuConfig.map((menu) => {
					if (menu.children.length > 0) {//有子菜单
						if (menu.authorty.length > 0) {//权限数组大于0，进行权限判断
							if (intersection(userInfo.roles, menu.authorty).length > 0) {
								return (
									<SubMenu key={menu.key} title={menu.title} icon={<ZhProIcon type={menu.icon} fontSize="18px" />}>
										{
											menu.children.map((item) => {
												if (item.authorty.length > 0 && intersection(userInfo.roles, item.authorty).length > 0) {
													return (
														<Menu.Item key={item.key} icon={<ZhProIcon type={item.icon} fontSize="18px" />}>
															{item.title}
														</Menu.Item>
													)
												} else {
													return null
												}
											})
										}
									</SubMenu>
								)
							} else {
								return null
							}
						} else {
							return (
								<SubMenu key={menu.key} title={menu.title} icon={<ZhProIcon type={menu.icon} fontSize="18px" />}>
									{
										menu.children.map((item) => {
											return (
												<Menu.Item key={item.key} icon={<ZhProIcon type={item.icon} fontSize="18px" />}>
													{item.title}
												</Menu.Item>
											)
										})
									}
								</SubMenu>
							)
						}
					} else {//没有子菜单
						if (menu.authorty.length > 0) {//权限数组大于0，进行权限判断
							if (intersection(userInfo.roles, menu.authorty).length > 0) {
								return (
									<Menu.Item key={menu.key} icon={<ZhProIcon type={menu.icon} fontSize="18px" />}>
										{menu.title}
									</Menu.Item>
								)
							} else {
								return null
							}
						} else {//权限数组小于0，不进行权限判断
							return (
								<Menu.Item key={menu.key} icon={<ZhProIcon type={menu.icon} fontSize="18px" />}>
									{menu.title}
								</Menu.Item>
							)
						}
					}
				})
			}
		</Menu>
	)
}

export default withRouter(SystemMenu)
