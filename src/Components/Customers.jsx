import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css";
import { Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import { CSVLink } from "react-csv";

export default function Customers() {

    const [customers, setCustomers] = useState([
        {firstname: '', 
        lastname: '', 
        email: '', 
        phone: ''
    }]);

    const [colDefs, setColDefs] = useState([
        {field: 'firstname', filter: true, floatingFilter: true},
        {field: 'lastname', filter: true, floatingFilter: true},
        {field: 'email', filter: true, floatingFilter: true},
        {field: 'phone', filter: true, floatingFilter: true},
        {cellRenderer: (params) => 
            <EditCustomer updateExistingCustomer={updateExistingCustomer} params={params} />
        },
        {cellRenderer: (params) => 
            <DeleteCustomer deleteCustomer={deleteCustomer} params={params} />    
        },
    ]);

    // Snackbar infomessage 
    const [openSackbar, setOpenSnackbar] = useState(false);
    const [info, setInfo] = useState('');

    // get customers at first render
    useEffect(() => getCustomers(), []);

    // get all customers from db
    const getCustomers = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setInfo('Data retreived successfully!');
                return response.json();
            } else {
                setOpenSnackbar(true);
                setInfo('Error retreiving data!');
            }
        })
        .then(respData => {
            setCustomers(respData._embedded.customers);
        })
        .catch(err => console.error(err))
    };

    // save new customer (AddCustomer.jsx)
    const saveCustomer = (customer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    };

    // Update existing customer's info (EditCustomer.jsx)
    const updateExistingCustomer = (customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    };



    // delete a specific customer 
    const deleteCustomer = (customer, url) => {
        fetch(url, {
            method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setInfo('Customer deletion was successful!');
            } else {
                setOpenSnackbar(true);
                setInfo('Error deleting customer');
            }
        })
        .catch(err => console.error(err))
    };


    // CSV download 
    const headers = [
        {label: 'First name', key: 'firstname'},
        {label: 'Last name', key: 'lastname'},
        {label: 'Email', key: 'email'},
        {label: 'Phone nr', key: 'phone'}    
    ];

    const data = customers;

    return (
        <>  
            {/* Add customer button */}
            <AddCustomer saveCustomer={saveCustomer} />

            {/* download csv */}
            <CSVLink data={data} headers={headers}>
                DOWNLOAD CUSTOMER DATA
            </CSVLink>

            {/* Grid to show data */}
            <div className="ag-theme-material" style={{width: 1200, height: 500}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>

                {/* snackbar to keep user informed */}
                <Snackbar
                    open={openSackbar}
                    message={info}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}>

                </Snackbar>
            </div>
        </>
    );
}