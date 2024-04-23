import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

// delete action, asks for confirmation before deletion
export default function DeleteTraining(props) {

    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState([{
        activity: '', 
        date: '', 
        duration: '', 
        customer: {
            firstname: '', 
            lastname: ''
        }
    }]);

    const handleClickOpen = () => {
        setTraining({
            activity: props.params.data.activity,
            date: props.params.data.date,
            duration: props.params.data.duration,
            customer: {
                firstname: props.params.data.customer.firstname,
                lastname: props.params.data.customer.lastname}
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const yesDelete = () => {

        const url = 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/' + props.params.data.id;

        props.deleteTraining(training, url);
        handleClose();
    }


    return (
        <>

        <Button variant="text" color="warning" onClick={handleClickOpen}>
            Delete
        </Button>

        <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                    },
                }}
            >

                <DialogTitle>Delete training?</DialogTitle>

                <DialogContentText>
                    Are you sure you want to delete this training?
                </DialogContentText>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="warning" onClick={yesDelete}>Delete</Button>
            </DialogActions>

        </Dialog>

        </>
    );
}