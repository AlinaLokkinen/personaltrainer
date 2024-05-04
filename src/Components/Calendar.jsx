import { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";


export default function Calendar() {

    const [trainings, setTrainings] = useState([]);

    const calculateEventEnd = (start, duration) => {
        // console.log(start);
        const startDate = new Date(start);
        // console.log(startDate.getTime());
        const end = startDate.getTime() + (duration * 60000);
        const endDate = new Date(end);
        console.log('Start: ' + startDate + ' ' + 'End: ' + endDate);
        return endDate;
    }

    const events = trainings.map(training => ({
        id: training.id,
        title: training.activity,
        start: new Date(training.date),
        end: calculateEventEnd(training.date, training.duration)
    }));

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

    return (
        <>
            {
                trainings ? <Scheduler 
                events={events} 
            /> : ' '
            
            }
            
        </>
    );
}