import Navbar from "./Navbar";
import Users from "./Users";

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Users />
      </div>
    </>
  );
};
export default App;
