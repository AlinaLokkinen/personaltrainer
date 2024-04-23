import { Button, DialogActions, DialogContentText } from "@mui/material";
import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

// delete action, asks for confirmation before deletion
export default function DeleteCustomer(props) {

    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname, 
            email: props.params.data.email,
            phone: props.params.data.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const yesDelete = () => {
        props.deleteCustomer(customer, props.params.data._links.customer.href);
        handleClose();
    };

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
            
                <DialogTitle>Delete Customer?</DialogTitle>

                    <DialogContentText>
                        Are you sure you want to delete this customer?
                    </DialogContentText>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={yesDelete} color="warning">Delete</Button>
                </DialogActions>

            </Dialog>

        </>
    );
}