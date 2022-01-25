import {  useState } from "react";

function useFetch( url:string ) {
    console.log(url)
    const [data, useData] = useState({})

    return data
}

export default useFetch