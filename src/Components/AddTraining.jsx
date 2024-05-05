
// *******************************************************
// tämä koodi ei toiminut kuten piti ja aika loppui kesken
// *******************************************************


// import { Button, TextField } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@mui/material";
// import { useState } from "react";

// export default function AddTraining(props) {

//     const [training, setTraining] = useState({
//         activity: '',
//         date: null, 
//         duration: ''
//     });

//     const [open, setOpen] = useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const addTraining = () => {
//         props.saveTraining(training);
//         handleClose();
//     };

//     const changeDate = (date) => {

//         setTraining({...training, date: date});
//     };

//     const handleInputChange = (e) => {
//         setTraining({...training, [e.target.name]: e.target.value});
//     };

//     return (
//         <>
//             <Button variant="contained"  style={{margin: 10}} onClick={handleClickOpen}>
//                 Add training
//             </Button>

//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 PaperProps={{
//                 component: 'form',
//                 onSubmit: (event) => {
//                     event.preventDefault();
//                     const formData = new FormData(event.currentTarget);
//                     const formJson = Object.fromEntries(formData.entries());
//                     const email = formJson.email;
//                     console.log(email);
//                     handleClose();
//                     },
//                 }}
//             >
//             <DialogTitle>New Training</DialogTitle>

//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     name="activity"
//                     value={training.activity}
//                     onChange={e => handleInputChange(e)}
//                     label="Activity name"
//                     fullWidth
//                     variant="standard"
//                 />
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     name="duration"
//                     value={training.duration}
//                     onChange={e => handleInputChange(e)}
//                     label="Duration"
//                     fullWidth
//                     variant="standard"
//                 />
                


//                 <DialogContentText style={{marginBottom: 10, marginTop: 15}}>
//                     Date
//                 </DialogContentText>
                
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker name="date" value={training.date} onChange={date => changeDate(date)} />
//                 </LocalizationProvider>

//             </DialogContent>

//             <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={addTraining}>Save</Button>
//             </DialogActions>

//             </Dialog>
        
//         </>
//     );
// }