import { Button,  Tooltip } from "@mui/material";
import  React, { useContext, useState } from "react"
import { AlarmListContext } from "../../contex/AlarmListContext";

interface INavbar{
    setShowAlarmModal:  React.Dispatch<React.SetStateAction<boolean>>,
}

const buttonStyle = {
    width: "90%",
    height: "20%",
    marginTop: "1vh"
}

const Navbar = ({setShowAlarmModal}:INavbar) =>{
    const { setAlarmList } = useContext(AlarmListContext);
    return(
        <div className="navbar">
            <Tooltip title="Add a new alert">
                <Button 
                    fullWidth
                    sx={buttonStyle}
                    color="primary"
                    variant="contained" 
                    onClick={()=> setShowAlarmModal((val)=> !val)}>
                        Add Alarm
                </Button>
            </Tooltip>
            <Tooltip title="Add a new alert">
                <Button 
                    sx={buttonStyle}
                    color="primary"
                    variant="contained" 
                    onClick={()=> {
                        localStorage.clear()
                        setAlarmList([]);
                        }}>
                        Clear all
                </Button>
            </Tooltip>
        </div>
    )
}

export default Navbar