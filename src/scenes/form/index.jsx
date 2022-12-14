import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addUser } from "../../utils/firebase/firebase";
import { useNavigate } from "react-router-dom";

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	contact: "",
	address1: "",
	address2: ""
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, "Too Short")
		.max(50, "Too Long")
		.required("required"),
	lastName: yup
		.string()
		.min(2, "Too Short")
		.max(50, "Too Long")
		.required("required"),
	email: yup.string().email("Invalid Email").required("required"),
	contact: yup
		.string()
		.matches(phoneRegExp, "Phone number is not vaid")
		.required("required"),
	address1: yup
		.string()
		.min(2, "Too Short")
		.max(120, "Too Long")
		.required("required")
	// address2: yup
	// 	.string()
	// 	.min(2, "Too Short")
	// 	.max(120, "Too Long")
	// 	.required("required")
});

const Form = () => {
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const navigate = useNavigate();

	const handleFormSubmit = async values => {
		try {
			await addUser(
				values.firstName,
				values.lastName,
				values.email,
				values.contact,
				values.address1,
				values.address2
			);
			navigate('/contacts')
		} catch (e) {
			console.log("Error adding user: ", e);
		}
	};

	return (
		<Box m="20px">
			<Header title="Create User" subtitle="Create a New User Profile" />
			<Formik
				// onSubmit={handleFormSubmit}
				onSubmit={(values, actions) => {
					handleFormSubmit(values);
					actions.setSubmitting(false);
					actions.resetForm({
						values: initialValues
					});
				}}
				initialValues={initialValues}
				validationSchema={userSchema}
				// validator={() => ({})}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
					handleReset
				}) =>
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								"& > div": {
									gridColumn: isNonMobile
										? undefined
										: "span 4"
								},
								"& .MuiFormHelperText-contained": {
									color: "red"
								}
							}}
						>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="First Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.firstName}
								name="firstName"
								errors={
									!!touched.firstName && !!errors.firstName
								}
								helperText={
									touched.firstName && errors.firstName
								}
								sx={{
									gridColumn: "span 2"
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Last Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.lastName}
								name="lastName"
								errors={!!touched.lastName && !!errors.lastName}
								helperText={touched.lastName && errors.lastName}
								sx={{
									gridColumn: "span 2"
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="E-mail"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								errors={!!touched.email && !!errors.email}
								helperText={touched.email && errors.email}
								sx={{
									gridColumn: "span 4"
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Contact Number"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.contact}
								name="contact"
								errors={!!touched.contact && !!errors.contact}
								helperText={touched.contact && errors.contact}
								sx={{
									gridColumn: "span 4"
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Address 1"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address1}
								name="address1"
								errors={!!touched.address1 && !!errors.address1}
								helperText={touched.address1 && errors.address1}
								sx={{
									gridColumn: "span 4"
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Address 2"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address2}
								name="address2"
								errors={!!touched.address2 && !!errors.address2}
								helperText={touched.address2 && errors.address2}
								sx={{
									gridColumn: "span 4"
								}}
							/>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button
								type="reset"
								onClick={() => handleReset()}
								color="warning"
								variant="contained"
								sx={{ mr: "15px" }}
							>
								Reset Form
							</Button>
							<Button
								type="submit"
								color="secondary"
								variant="contained"
							>
								Create New User
							</Button>
						</Box>
					</form>}
			</Formik>
		</Box>
	);
};

export default Form;
