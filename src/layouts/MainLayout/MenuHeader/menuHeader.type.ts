import { TypeMenu } from '../constants/EnumDefaultMenus';

export interface MenuHeaderProps {
	currentUrl?: string
	menus?: TypeMenu[]
	logout?: () => {}
}
