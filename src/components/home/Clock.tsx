import { Grid, Tooltip } from "@mui/material"
import { height, width } from "@mui/system"
import { FC, useEffect, useRef, useState } from "react"
import { useAlarmList } from "../../contex/AlarmListContext"
import AlarmMessage from "./AlarmMessage"

const style = {
    backgroundColor: "#ffffff",
    height: "20vh",
    width: "10vh",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15vh",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "Oswald', sans-serif"
}

const containerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}

const timeDivider = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "10px",
    height: "5vh",
    backgroundColor: "#000000"
}

interface storageObject{
    id: number,
    created: Date,
    execute:  Date | null,
    message: string,
    type: "alarm"
  }
  
function sliceTime(t: number):number[]{
    const firstNumber = Math.floor(t/10);
    const secondNumber = t - (firstNumber * 10)
    return [firstNumber, secondNumber]
}


const Clock: FC = ()=>{
    const now = new Date();
    const [alarmStatus, setAlarmStatus] = useState<boolean>(false)
    const [time, setTime] = useState<Date>(now);
    const prevInterval = useRef<NodeJS.Timer>();
    const alarmSta = useRef<boolean>(false)
    let alarmObject:storageObject = {
        id: 0,
        created: now,
        execute: null,
        message: "",
        type: "alarm"
    }

    const {alarmList} = useAlarmList()

    if(alarmList[0]){
        alarmObject = alarmList[0]
        const nextAlarm = new Date(alarmList[0].execute +"")
        if(
            nextAlarm.getDate() === now.getDate() &&
            nextAlarm.getMonth() === now.getMonth() &&
            nextAlarm.getFullYear() === now.getFullYear()&&
            nextAlarm.getHours() === time.getHours() &&
            nextAlarm.getMinutes() === time.getMinutes()
            )
            {
                alarmSta.current = true;
            }
    } 
   
    useEffect(()=>{
        if(prevInterval.current) clearInterval(prevInterval.current);
        prevInterval.current = setInterval(() => {
            setTime(new Date())}
          ,1000);
    })

    return(
        <div>
            <Tooltip title={new Date().toDateString()}>
                <Grid container sx={containerStyle}>
                    <Grid item xs={3} sx={style}>{sliceTime(time.getHours())[0]}</Grid>
                    <Grid item xs={3} sx={style}>{sliceTime(time.getHours())[1]}</Grid>
                    <div className="timeDivider"></div>
                    <Grid item xs={3} sx={style}>{sliceTime(time.getMinutes())[0]}</Grid>
                    <Grid item xs={3} sx={style}>{sliceTime(time.getMinutes())[1]}</Grid>
                </Grid>
            </Tooltip>
            {alarmSta.current && <AlarmMessage alarm={alarmObject} alarmSta={alarmSta} />}
        </div>
        )
}

export default Clock