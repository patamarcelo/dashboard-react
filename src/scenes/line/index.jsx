import { Box } from '@mui/material'
import Header from '../../components/Header'
import LineChart from '../../components/LineChart'
import { useTheme } from '@mui/material'
import { tokens } from '../../theme'
const Line = () => {
    const theme = useTheme();
	const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="Pie Chart" subtitle="Simple Pie Chart" />
            <Box height="75vh" sx={{ backgroundColor: colors.primary[400] }}>
                <LineChart />
            </Box>
        </Box>
    )
}

export default Line;