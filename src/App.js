import React, { useState } from 'react'
import {Switch, Route} from 'react-router-dom'

// <======================== CUSTOM COMPONENTS ==========================>
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homescreen/HomeScreen';
import LoginScreen from './screens/loginscreen/LoginScreen';
import NotFound from './screens/notfound/NotFound';

import './_app.scss';

require('dotenv').config();
function App() {

  const [sidebar, toggleSidebar] = useState(false)
  const sidebarToggleHandler = () => { toggleSidebar(!sidebar) }
  
  const[searchBar, toggleSearchBar] = useState(false);
  const toggleSearchBarHandler = () => {toggleSearchBar(!searchBar)}

  return (
    <>
      <div>
        <Header toggleSidebar={sidebarToggleHandler} toggleSearchBar={toggleSearchBarHandler} searchBar={searchBar} />
        <div className="app__container" >
          <Sidebar sidebarStatus={sidebar} toggleSidebar={sidebarToggleHandler}  />
          <div className="app__main" >
            <Switch>
              <Route exact path="/" component={() => <HomeScreen />} />
              <Route path="/login" component={() => <LoginScreen />} />
              <Route path="" component={() => <NotFound />} />
            </Switch>
            
          </div>
        </div>
      </div>

      
    </>
  );
}

export default App;
