import React, {useState } from 'react'
import { Switch, Route } from 'react-router-dom'

// <======================== CUSTOM COMPONENTS ==========================>
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homescreen/HomeScreen';
import LoginScreen from './screens/loginscreen/LoginScreen';
import NotFound from './screens/notfound/NotFound';
import WatchScreen from './screens/watchscreen/WatchScreen';

import './_app.scss';
import './components/sidebar/_sidebar.scss';
import './screens/homescreen/_homescreen.scss';
import './screens/watchscreen/_watchscreen.scss';
import SearchScreen from './screens/searchScreen/SearchScreen';

require('dotenv').config();

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)

  const sidebarToggleHandler = () => {toggleSidebar(!sidebar)};

  const [searchBar, toggleSearchBar] = useState(false);
  const toggleSearchBarHandler = () => { toggleSearchBar(!searchBar) }

  return (
    <div>
      <Header toggleSidebar={sidebarToggleHandler} toggleSearchBar={toggleSearchBarHandler} searchBar={searchBar} />
      <div className="app__container" >
        <Sidebar sidebarStatus={sidebar} toggleSidebar={sidebarToggleHandler} />

        <div className="app__main" >
          {children}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Switch>
      <Route exact path="/" >
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route exact path="/search/:query" >
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route exact path="/login" >
        <Layout>
          <LoginScreen />
        </Layout>
      </Route>
      <Route exact path="/watch/:id" >
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path="" component={() => <NotFound />} />
    </Switch>
  );
}

export default App;
