import { Container, Grid } from "@mui/material"
import { FC, useContext } from "react"
import { useAlarmList } from "../../contex/AlarmListContext"
import AlertInfo from "./AlertInfo"


const Infobar = () => {
    const {alarmList} = useAlarmList()

    return(
        <Grid className="infobar" container>
            <Grid item xs={1} md={2} lg={3}></Grid>
            <Grid item xs={10} md={8} lg={6}>
            <div className="infobar_inner">
                {alarmList.map((alarm, index)=>(
                    <AlertInfo alarm={alarm} index={index} key={alarm.id}/>
                ))}
            </div>
            </Grid> 
            <Grid item xs={1} md={2} lg={3}></Grid>
        </Grid>
    )
}

export default Infobar