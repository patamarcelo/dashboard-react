import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, tokens} from '../../theme'
import InputBase from '@mui/material'
import  LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import  DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import  NotificationsModeOutlinedIcon from '@mui/icons-material/NotificationsModeOutlined'
import  SettingsModeOutlinedIcon from '@mui/icons-material/SettingsModeOutlined'
import  PersonModeOutlinedIcon from '@mui/icons-material/PersonModeOutlined'
import  SearchModeOutlinedIcon from '@mui/icons-material/SearchModeOutlined'


const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    
    return (
        <Box display="flex" justifyContent="space-between">

        </Box>
    )
}

export default TopBar;