import { useEffect } from "react";
import { useAlarmList } from "../../contex/AlarmListContext";
import {getAllFromStorage, removeFromStorage} from "../../service/LocalStorageService"


interface storageObject{
    id: number,
    created: Date,
    execute:  Date | null,
    message: string,
    type: "alarm"
  }
  

const AlarmMessage = (parm:{alarm: storageObject, alarmSta: React.MutableRefObject<boolean>}) =>{
    const {setAlarmList} = useAlarmList();

    useEffect(()=>{
        const msg = new SpeechSynthesisUtterance();
        msg.text = parm.alarm.message;
        window.speechSynthesis.speak(msg);

        removeFromStorage(parm.alarm.id);
        setAlarmList(getAllFromStorage());
        setTimeout(()=>{
            parm.alarmSta.current = false;
        },999)
    }, [parm.alarm.id])
    

    return(
        <>
            <div className="alarmMessage">{parm.alarm.message}</div>
        </>
    )
}

export default AlarmMessage

