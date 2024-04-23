import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css";
import { Snackbar } from "@mui/material";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";
import DeleteTraining from "./DeleteTraining";

export default function Trainings() {

    const [trainings, setTrainings] = useState([{
        activity: '', 
        date: '', 
        duration: '', 
        customer: {
            firstname: '', 
            lastname: ''
        }
    }]);

    const [colDefs, setColDefs] = useState([
        {field: 'activity', filter: true, floatingFilter: true},
        {field: 'Date', filter: true, floatingFilter: true, cellRenderer: params => {
            const formattedDate = dayjs(params.value).format("DD.MM.YYYY HH:mm");
            return formattedDate;
        }},
        {field: 'duration', filter: true, floatingFilter: true},
        {headerName: 'First name', field: 'customer.firstname', filter: true, floatingFilter: true},
        {headerName: 'Last name', field: 'customer.lastname', filter: true, floatingFilter: true},
        {cellRenderer: (params) => 
            <DeleteTraining deleteTraining={deleteTraining} params={params} /> 
        }
    ]);

    // Snackbar infomessage 
    const [openSackbar, setOpenSnackbar] = useState(false);
    const [info, setInfo] = useState('');


    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                window.alert("Virhe datan hakemisessa!");
            }
        })
        .then(respData => {
            setTrainings(respData);
        })
        .catch(err => console.error(err))
    };

    // delete a specific training's info 
    const deleteTraining = (customer, url) => {

        fetch(url, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setInfo('Training deletion was successful!');
            } else {
                setOpenSnackbar(true);
                setInfo('Error deleting info');
            }
        })
        .catch(err => console.error(err))
    };

    const saveTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => getTrainings())
        .catch(err => console.error(err))
    };   

    return (
        <>
            <AddTraining saveTraining={saveTraining}/>
            <div className="ag-theme-material" style={{width: 1200, height: 500}}>
            <AgGridReact 
                    rowData={trainings}
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
    )
}