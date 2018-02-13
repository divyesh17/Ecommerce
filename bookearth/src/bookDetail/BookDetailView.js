import React, { Component } from 'react';
// import './CSS/App.css';
import Header from '../Header';
import BookSection from './BookDetailSection';
import '../CSS/homeStyle.css';
import '../CSS/bookStyle.css';
import octopus from './bookDetailController.js';

class BookDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            cartValue: this.props.cartValue,
            isBookAlreadyInCart: this.props.isBookAlreadyInCart
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleClickOnCartButton = this.handleClickOnCartButton.bind(this);
    }

    handleClickOnCartButton(e) {
        if(this.state.isBookAlreadyInCart === false) {
            this.setState({
                cartValue: octopus.clickFunction(e),
                isBookAlreadyInCart: true
            });
        }
    }

    handleFilterTextChange(e) {

    }

    render() {
        return (
            <div>
                <Header
                    cartValue={this.state.cartValue}
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                    isAddCategory={false}
                    pageName={'bookDetail'}
                />
                <BookSection
                    bookObj={this.props.bookObj}
                    clickOnCartButton={this.handleClickOnCartButton}
                    isBookAlreadyInCart={this.state.isBookAlreadyInCart}
                />
            </div>
        );
    }
}

export default BookDetailView;