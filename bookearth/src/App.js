import React from 'react';
import BookLayout from './bookDetail/bookDetailController';
import Home from './home/homeController';
import { Switch, Route } from 'react-router-dom'


const MyRouter = () => (
    <Switch>
        <Route path='/index.html' component={Home}/>
        <Route path exact='/' component={Home}/>
        <Route path='/bookLayout.html' component={BookLayout}/>
        {/*<Route path='/cart.html' component={Cart}/>*/}
    </Switch>
);

const App = () => (
    <div>
        <MyRouter/>
    </div>
);

export default App;