import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

import { useDispatch } from 'react-redux'
import { setIsAuthUser, setUser } from '../../store/user/user.action'

const TopBar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const dispatch = useDispatch();

	const emptyUser = null
	const handlerLogout = () => {
		dispatch(setIsAuthUser(false));
		dispatch(setUser(emptyUser))
	}

	return (
		<Box display="flex" justifyContent="space-between" p={2} sx={{ width: '100%'}}>
			{/* Search BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
			>
				<InputBase sx={{ ml: 2, fl: 1 }} placeholder="Search" />
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>
			{/* ICONS  */}
			<Box display="flex" justifyContent="">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "dark"
						? <DarkModeOutlinedIcon />
						: <LightModeOutlinedIcon />}
				</IconButton>
				<IconButton>
					<NotificationsNoneOutlinedIcon />
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>
				<IconButton>
					<PersonOutlineOutlinedIcon />
				</IconButton>
				<IconButton onClick={handlerLogout}>
					<PowerSettingsNewOutlinedIcon style={{ color: colors.redAccent[500]}}/>
				</IconButton>
			</Box>
		</Box>
	);
};

export default TopBar;
