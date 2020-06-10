import React from "react";
import { LogoutOutlined } from '@ant-design/icons'
import AppIcon from '@/components/AppIcon'
import { MenuHeaderProps } from './menuHeader.type'

const Right: React.FC<MenuHeaderProps> = ({logout}) => {
	return (
		<div className="right">
			<div className="item">admin</div>
			<a className="item" onClick={logout} title="退出登录">
				<AppIcon appType="antd" iconType={LogoutOutlined}/>
			</a>

			{/*language=SCSS*/}
			<style jsx>{`
				.right{
					display: flex;
					padding-right: 30px;
					.item{
						margin-right: 5px;
					}
				}
			`}</style>
		</div>
	)
}

export default Right;
