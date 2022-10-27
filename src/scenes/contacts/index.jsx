import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useTheme } from '@mui/material'

import { getContactsQuery } from '../../utils/firebase/firebase'
import { useState, useEffect } from 'react'

const Contacts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [ contacts, setContacts] = useState([])

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{ field: "registrarId", headerName: "Registrar ID", flex: 0.5 },
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell"
		},
		{
			field: "age",
			headerName: "Age",
			type: "number",
			headerAlign: "left",
			align: "left"
		},
		{ field: "phone", headerName: "Phone Nmber", flex: 1 },
		{ field: "email", headerName: "E-mail", flex: 1 },
		{ field: "address", headerName: "Address", flex: 1 },
		{ field: "city", headerName: "City", flex: 1 },
		{ field: "zipCode", headerName: "Zip Code", flex: 1 },
	];

	const handlerContacts = async () => {
		try{
			const contactsReceived = await getContactsQuery()
			setContacts(contactsReceived)
		} catch(e){
			console.log("Error getting contacts: ", e)
		}
	}

	useEffect(() => {
		handlerContacts()
	},[])

	console.log('Contacts from Firebase: ', contacts)

	return (
		<Box m="20px">
			<Header title="CONTACTS" subtitle="List of Contacts for future reference" />
			<Box m="40px 0 0 0" height="75vh" 
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    // borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
				<DataGrid rows={mockDataContacts} columns={columns} components={{ Toolbar: GridToolbar}}/>
			</Box>
		</Box>
	);
};

export default Contacts;
