import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import FuelHistoryContainer from '../../containers/FuelHistory/FuelHistory';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './App.scss';

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Rubik", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
