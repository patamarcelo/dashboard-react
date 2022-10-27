import { Box } from '@mui/material'
import Header from '../../components/Header'
import GeographyChart from '../../components/GeographyChart'
import { useTheme } from '@mui/material'
import { tokens } from '../../theme'

const Geo = () => {
    const theme = useTheme();
	const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="Geo Chart" subtitle="Simple Geo Chart" />
            <Box height="75vh" border={ `1px solid ${colors.grey[100]}`} borderRadius="4px" sx={{ backgroundColor: colors.primary[400] }}>
                <GeographyChart />
            </Box>
        </Box>
    )
}

export default Geo;