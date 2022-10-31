import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik, getIn } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from '../../theme'
import { authUser } from '../../utils/firebase/firebase'
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux";
import { setIsAuthUser, setUser } from '../../store/user/user.action'

import {
	createNotification,
	TYPES_NOTIFICATION
} from "../../utils/notifications/notififications.utils";



const initialValues = {
	username: "",
	password: ""
};

const FIELDS = [
	{label: "E-mail", name: "username", type: "text" },
	{label: "Password", name: "password", type: "password" }
];

const Auth = () => {
    const theme = useTheme();
	const colors = tokens(theme.palette.mode);
    const navitgate = useNavigate()
	const dispatch = useDispatch()

	const isNonMobile = useMediaQuery("(min-width: 1020px)");
	const handleFormSubmit = async values => {
		try {
            const email = values.username
            const password = values.password
            const user = await authUser(email, password)
            if(user){
				dispatch(setIsAuthUser(true))
				dispatch(setUser(user.user))
                navitgate('/')
				createNotification(
					TYPES_NOTIFICATION.success,
					"Succefull Loggin...",
				);
            }
		} catch (e) {
			console.log("Error adding user: ", e);
			createNotification(
				TYPES_NOTIFICATION.error,
				"Somethin went Wrong",
				`${e}`
			);

		}
	};

	const userSchema = yup.object().shape({
		username: yup.string().email("Invalid Email").required("required"),
		password: yup
			.string()
			.min(7, "Too Short")
			.required("required")
	});

	return (
		<Box
		sx={{
			height: '100%',
			width: '100%'
		}}
		display="flex"
		alignItems="center"
		justifyContent="center"
		>


		<Box 
        sx={{
            backgroundColor: colors.primary[400],
            margin: '20px 20px',
            padding: '50px 20px',
            width: isNonMobile ? '50%' : '100%',
			minHeight: '40vh',
            borderRadius: ' 8px',
        }}
        >
			<Box display="flex" justifyContent="center" alignItems="center" mb="50px">
                <Typography variant="h3" color="secondary">
                    Login
                </Typography>
                
                </Box>
			<Formik
				// onSubmit={handleFormSubmit}
				onSubmit={async (values, actions) => {
					await handleFormSubmit(values);
					actions.setSubmitting(false);
					actions.resetForm({
						values: initialValues
					});
				}}
				initialValues={initialValues}
				validationSchema={userSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
					handleReset,
                    isValid,
				}) =>
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							justifyContent="center"
							gap="30px"
							width="90%"
							gridTemplateColumns="repeat(1, minmax(0, 1fr))"
							sx={{
								"& > div": {
									gridColumn: isNonMobile
										? undefined
										: "span 4"
								},
								"& .MuiFormHelperText-contained": {
									color: "red"
								},
								margin: " 0 auto"
							}}
						>
							{FIELDS.map((value, index) =>{
                                return (
                                    <TextField
                                    key={index}
                                    fullWidth
                                    variant="filled"
                                    type={value.type}
                                    label={value.label}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name={value.name}
                                    errors={getIn(!!touched, value.name) && getIn(!!errors, value.name)}
                                    helperText={getIn(touched, value.name) && getIn(errors, value.name)}
                                    />
                                    )
                            }
							)}
						
						<Box
							display="flex"
							justifyContent="center"
                            alignItems="center"
                            sx={{
                                width: "100%",
                            }}
						>
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								sx={{ width: "100%"}}
                                onClick={handleFormSubmit}
                                // disabled={isValid}
							>
								Login
							</Button>
						</Box>
                    </Box>
					</form>}
			</Formik>
		</Box>
	</Box>
	);
};

export default Auth;
