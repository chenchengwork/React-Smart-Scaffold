import React from "react";
import EnumEnv from "@/constants/EnumEnv";
import { theme } from '@/constants/theme';

const Logo: React.FC = () => {
	return (
		<div className="header">
			<img className="logo" src={EnumEnv.platform.logoUrl} />
			<span className="title">{EnumEnv.platform.title}</span>
			{/*language=SCSS*/}
			<style jsx>{`
                .header{
                    min-width: 200px;
                    display: flex;
                    align-items: center;
                    
                    .logo{
                        width: 80px;
                        height: 40px;
                    }
                    
                    .title {
                        padding: 0px 5px;
                        font-size: 18px;
                        font-weight: 500;
                        color: ${theme.logoTitleColor};
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            `}</style>
		</div>
	)
};

export default Logo;
