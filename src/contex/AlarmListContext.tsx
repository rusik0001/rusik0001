import { createContext, useContext, useEffect, useState } from "react"
import { getAllFromStorage } from "../service/LocalStorageService";

interface storageObject{
    id: number,
    created: Date,
    execute:  Date | null,
    message: string,
    type: "alarm"
  }

interface IAlarmContext {
    alarmList: storageObject[],
    setAlarmList:  React.Dispatch<React.SetStateAction<storageObject[]>>
}

export const AlarmListContext = createContext<IAlarmContext>(
    {
        alarmList: [{
            id: 1,
            created: new Date(),
            execute:  new Date(),
            message: "Default setting",
            type: "alarm",
        }],
        setAlarmList:() => {}
    }
);

export const useAlarmList = ()=> useContext(AlarmListContext) 


