import { Container, Divider, Typography } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex";
import { display } from "@mui/system";

interface storageObject{
    id: number,
    created: Date,
    execute:  Date | null,
    message: string,
    type: "alarm"
  }

interface IAlertInfo{
    alarm: storageObject,
    index: number,
}

const AlertInfo = ({alarm, index}: IAlertInfo) =>{

    let style = {
        width: "100%",
        padding: "2vh",
        display: "block",
        marginBottom: "-2vh",
        filter: "brightness(1)",
        zIndex: 0
    };

    if(index < 5){
        style = {
            width: (100 - 10 * index) + "%",
            padding: (2 - 0.5 * index) + "vh",
            display: "block",
            marginBottom: (-2 -index) + "vh",
            filter: `brightness(${(1 - 0.18 * index)})`,
            zIndex: 5-index
        } 
    }
    else{
        style = {
            width: "0%",
            padding: "0vh",
            display:"none",
            marginBottom: "2vh",
            filter: "brightness(1)",
            zIndex: 0
        } 
    }

    const createdDate = new Date(alarm.created);
    const executeDate = new Date(alarm.execute!);

    return(
        <div className="alertinfo" style={style}>
            <Typography variant="body2" align="left">Created {createdDate.toDateString()}</Typography>
            <Typography variant="h5" >{alarm.message}</Typography>
            <Divider light />
            <Typography variant="h6" >{executeDate.toDateString()}</Typography>
        </div>
        )
}

export default AlertInfo