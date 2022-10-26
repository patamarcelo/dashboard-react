import { Box } from '@mui/material'
import Header from '../../components/Header'
import BarChart from '../../components/BarChart'
import { useTheme } from '@mui/material'
import { tokens } from '../../theme'

const Bar = () => {
    const theme = useTheme();
	const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart" />
            <Box height="75vh" sx={{ backgroundColor: colors.primary[400] }}>
                <BarChart />
            </Box>
        </Box>
    )
}

export default Bar;