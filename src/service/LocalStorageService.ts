interface storageObject{
    id: number,
    created: Date,
    execute:  Date | null,
    message: string,
    type: "alarm"
}

export function addToStorage(obj: storageObject){
    const idAsString = JSON.stringify(obj.id)
    localStorage.setItem(idAsString, JSON.stringify(obj))
}

export function removeFromStorage(id: number){
    localStorage.removeItem(JSON.stringify(id))
}

export function getOneFromStorage(id: number){
    return localStorage.getItem(JSON.stringify(id))
}

//return all future alerts
export function getAllFromStorage():storageObject[]{
    let allItems: storageObject[] = [];
    Object.values(localStorage).forEach((val) => {
        const jsonVal:storageObject = JSON.parse(val)
        if(jsonVal.id !== undefined && new Date(jsonVal.execute!) > new Date()){
            allItems.push(jsonVal)
        }
    })
    return allItems.sort((a: storageObject, b: storageObject):number=>{
        return new Date(a.execute!) > new Date(b.execute!) ? 1 : new Date(a.execute!) < new Date(b.execute!) ? -1 : 0
    })
}

export function generateId():number{
    return Math.floor(Math.random() * 10000000)
}
