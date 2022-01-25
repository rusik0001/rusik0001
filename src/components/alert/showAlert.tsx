import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/material';

const alertPositionStyle = {
    marginTop: "20px",
    marginBottom: "20px"
}

interface IError{
    message: string
}

const ShowError = ({message}: IError)=>{
    return(
        <>        
            <Alert severity="error" sx={alertPositionStyle}>{message}</Alert>
        </>
    )
}

export default ShowError