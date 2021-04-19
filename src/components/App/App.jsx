import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import FuelHistoryContainer from '../../containers/FuelHistory/FuelHistory';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Rubik", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
      />
      <div className="app-container">
        <Sidebar />
        <div className="app-content">
          <div className="app-content-header">
            <Header />
          </div>
          <div className="app-content-body">
            <FuelHistoryContainer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
