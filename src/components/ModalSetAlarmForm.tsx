import { Button, TextField } from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import CancelIcon from '@mui/icons-material/Cancel';
import {generateId, addToStorage, getAllFromStorage} from '../service/LocalStorageService'
import ShowError from "./alert/showAlert";
import { useAlarmList } from "../contex/AlarmListContext";

interface INavbar{
    setShowAlarmModal:  React.Dispatch<React.SetStateAction<boolean>>,
}

interface storageObject{
    id: number,
    created: Date,
    execute: Date | null,
    message: string,
    type: "alarm",
}

function ModalSetAlarmForm({setShowAlarmModal}: INavbar){
    const [alarmTime, setAlarmtime] = useState<Date | null>(new Date())
    const [alarmMessage, setAlarmMessage] = useState<string>("");
    const [error, serError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setAlarmList}  = useAlarmList();

    function addAlert(e:React.FormEvent):void{
        e.preventDefault()
        if(alarmMessage === ""){
            setErrorMessage("Please set a message")
            serError(true)
            return;
        }

        const setObject:storageObject = {
            id: generateId(),
            created: new Date(),
            execute: alarmTime,
            message: alarmMessage,
            type: "alarm"
        }
        addToStorage(setObject)
        setShowAlarmModal(false)
        setAlarmList(getAllFromStorage())
    }

    return(
        <div className="alarmModal">
            <form noValidate autoComplete="off">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        minDate={new Date()}
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={alarmTime}
                        onChange={(newValue) => {
                            setAlarmtime(newValue);
                        }}
                    />
                </LocalizationProvider>
                <TextField 
                    label="Message"
                    variant="outlined"
                    fullWidth
                    required
                    margin="dense"
                    multiline
                    rows={4}
                    onChange={(e)=>{
                        setAlarmMessage(e.target.value) 
                        serError(false);
                        setErrorMessage("")
                    }}
                />
                {error && <ShowError message={errorMessage}/>}
                <Button type="submit" variant="contained" startIcon={<AddAlertIcon/>}  onClick={(e)=>addAlert(e)} sx={{mr: 2, mt: 2}}>Set</Button>
                <Button variant="contained" startIcon={<CancelIcon/>} sx={{mr: 2, mt: 2}}  onClick={()=> setShowAlarmModal(false)} >Cancel</Button>
            </form> 
        </div>
    )
}

export default ModalSetAlarmForm