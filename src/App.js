import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Auth from "./scenes/auth";

import AuthApp from "./authComp";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";

import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

function App() {
	const user = useSelector(selectCurrentUser);
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<NotificationContainer />
				{user ? <AuthApp /> : <Auth />}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
