import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './MyComponent/common/Dashboard';
import EmpDashboard from './EmpComponent/common/EmpDashboard';
function App() {
  return (
    <div className="App">
      <Dashboard/>
      <EmpDashboard/>
   
    </div>
  );
}

export default App;
