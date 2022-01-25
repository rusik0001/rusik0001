import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography} from "@mui/material";
import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system';
import './App.css';
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Navbar from "./components/navbar/Navbar"
import Infobar from './components/infobar/Infobar';
import ModalSetAlarmForm from './components/ModalSetAlarmForm';
import {getAllFromStorage} from "./service/LocalStorageService"
import {AlarmListContext} from './contex/AlarmListContext';
import { createTheme, ThemeProvider  } from '@mui/material';

const theme = createTheme({
  palette:{
    primary: {
      main: "#C4C4C4",
    }
  }
})

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface storageObject{
  id: number,
  created: Date,
  execute:  Date | null,
  message: string,
  type: "alarm"
}

const App = () => {
  const [ showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const [ alarmList, setAlarmList] = useState<storageObject[]>([])

   useEffect(()=>{
    setAlarmList(getAllFromStorage())
   }, [])

  const handleClose = () => setShowAlarmModal(false);

  return (
    <ThemeProvider theme={theme}>
      <AlarmListContext.Provider value={{alarmList, setAlarmList}}>
        <div className='app'>
          <Header />
          <Grid container>
            <Grid item xs={9} md={9} lg={10} >
              <Home />
              <Infobar/>
            </Grid>
            <Grid item xs={3} md={3} lg={2} >
              <Navbar setShowAlarmModal={setShowAlarmModal} />
            </Grid>
          </Grid>
          <Modal 
            open={showAlarmModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
              <Box sx={modalStyle}>
                  <ModalSetAlarmForm setShowAlarmModal={setShowAlarmModal} />
              </Box>
          </Modal>
        </div>
      </AlarmListContext.Provider>
    </ThemeProvider>
  );
}

export default App;
