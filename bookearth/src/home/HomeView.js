import React, { Component } from 'react';
// import './CSS/App.css';
import Header from '../Header';
import ItemSection from './ItemSectionHome';
import '../CSS/homeStyle.css';

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

    handleCategoryChange(categoryName) {
        this.setState ({
            filterCategory: categoryName
        });
    }

    handleFilterTextChange(searchValue) {
        this.setState ({
            filterText: searchValue
        });
    }

    handleClickOnBook(e) {
        this.props.clickEventOnBook(e);
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
                    getBookData={this.props.getBookData}
                    filterCategory={this.state.filterCategory}
                    filterText={this.state.filterText}
                    clickOnBook={this.handleClickOnBook}
                />
            </div>
        );
    }
}

export default HomeView;