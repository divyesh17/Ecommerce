import React, { Component } from 'react';
// import './CSS/App.css';
import Header from './Header';
import ItemSection from './ItemSection';
import './CSS/homeStyle.css';
import octopus from './index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterCategory : 'All'
        }
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    onCategoryChange(e) {
        this.setState (
            {
                filterCategory: octopus.clickEventOnCategoryNav(e)
            }
        );
    }

    render() {
        return (
            <div>
                <Header
                    category={this.props.category}
                    onCategoryChange={this.onCategoryChange}
                />
                <ItemSection
                    books={this.props.books}
                    filterCategory={this.state.filterCategory}
                />
            </div>
        );
    }
}

export default App;
