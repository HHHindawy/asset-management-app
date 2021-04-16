import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './App.scss';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-content">
        <div className="app-content-header">
          <Header />
        </div>
        <div className="app-content-body" />
      </div>
    </div>
  );
};

export default App;
