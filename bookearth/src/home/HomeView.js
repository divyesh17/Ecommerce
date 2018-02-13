import React, { Component } from 'react';
// import './CSS/App.css';
import Header from '../Header';
import ItemSection from './ItemSectionHome';
import '../CSS/homeStyle.css';
import octopus from './homeController';

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterCategory : 'All',
            filterText: ''
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleClickOnBook = this.handleClickOnBook.bind(this);
    }

    handleCategoryChange(e) {
        this.setState ({
            filterCategory: octopus.clickEventOnCategoryNav(e)
        });
    }

    handleFilterTextChange(e) {
        this.setState ({
            filterText: octopus.changeEventOnSearch(e)
        });
    }

    handleClickOnBook(e) {
        octopus.clickEventOnBook(e);
    }

    render() {
        return (
            <div>
                <Header
                    category={this.props.category}
                    cartValue={this.props.cartValue}
                    filterText={this.state.filterText}
                    filterCategory={this.state.filterCategory}
                    onCategoryChange={this.handleCategoryChange}
                    onFilterTextChange={this.handleFilterTextChange}
                    isAddCategory={true}
                    pageName={'home'}
                />
                <ItemSection
                    books={this.props.books}
                    filterCategory={this.state.filterCategory}
                    filterText={this.state.filterText}
                    clickOnBook={this.handleClickOnBook}
                />
            </div>
        );
    }
}

export default HomeView;