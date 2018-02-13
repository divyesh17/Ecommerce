import React from 'react';
import homeOctopus from './home/homeController';
import bookOctopus from './bookDetail/bookDetailController';
import HomeView from './home/HomeView';
import BookDetailView from './bookDetail/BookDetailView'
import { Switch, Route } from 'react-router-dom'

const Home = () => {
    homeOctopus.init();
    return <HomeView
                books={homeOctopus.getBookData()}
                cartValue={homeOctopus.getCartValue()}
                category={homeOctopus.getCategory()}
            />
};

const BookLayout = () => {
    //alert(5);
    bookOctopus.init();
    return <BookDetailView
                bookObj={bookOctopus.getBookDetailObj()}
                cartValue={bookOctopus.getCartValue()}
                isBookAlreadyInCart={bookOctopus.isBookAlreadyInCart()}
            />
};

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