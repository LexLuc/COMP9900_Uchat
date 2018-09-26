import React from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';

//import routers
import app from './App.js';

// import NotFound from './Pages/notFound';    //TODO : 404 bug need to fix


//routers controller
const AppRouter = () => 
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {app} />
            {/* <Route component= {NotFound} /> */}
        </Switch>
    </BrowserRouter>


ReactDOM.render(
    <AppRouter />, document.getElementById('root')
)


