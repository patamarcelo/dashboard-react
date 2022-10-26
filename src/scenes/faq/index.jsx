import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const QUESTIONS = [
		{ title: "An Important Question" },
		{ title: "Second Favorite" },
		{ title: "Most Comum Mistakes" },
		{ title: "Another Important Question" },
		{ title: "Some Random Question" }
	];

	return (
		<Box m="20px">
			<Header title="FAQ" subtitle="Frequently Asked Questions Page" />
			{QUESTIONS.map((question, index) => {
				return (
					<Accordion key={index} defaultExpanded={index > 1 ? false : true}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography
								variant="h5"
								color={colors.greenAccent[500]}
							>
								{question.title}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="h6" color={colors.grey[200]}>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Odio voluptatum reiciendis ex
								pariatur repellendus aliquid nostrum cupiditate
								laborum aperiam? Labore beatae debitis
								perspiciatis atque adipisci, nisi voluptatibus
								ad quidem velit.
							</Typography>
						</AccordionDetails>
					</Accordion>
				);
			})}
		</Box>
	);
};

export default FAQ;
