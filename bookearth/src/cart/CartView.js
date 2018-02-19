import React, { Component } from 'react';
// import './CSS/App.css';
import Header from '../Header';
import '../CSS/cartStyle.css';
import CartItemsTable from "./CartItemsTable";
import PriceAndCheckout from "./CartPriceAndChkout";

class CartBox extends Component {
    render () {
        return (
            <div className="cart-box">
                <CartItemsTable
                    bookData={this.props.bookData}
                    itemIdArray={this.props.itemIdArray}
                    cartValue={this.props.cartValue}
                    handleClick={this.props.handleClick}
                    handleFocus={this.props.handleFocus}
                    handleChange={this.props.handleChange}
                />
                <PriceAndCheckout
                    totalQuantity={this.props.totalQuantity}
                    totalPrice={this.props.totalPrice}
                    deliveryCharge={this.props.deliveryCharge}
                />
            </div>
        );
    }
}

class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartValue: this.props.getCartValue(),
            filterText: '',
            itemIdArray: this.props.getItemIdArray(),
            totalQuantity: this.props.getTotalQuantity(),
            totalPrice: this.props.getTotalPrice()
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleClick(e) {
        this.props.clickEvent(e);
        this.setState({
            cartValue: this.props.getCartValue(),
            itemIdArray: this.props.getItemIdArray(),
            totalQuantity: this.props.getTotalQuantity(),
            totalPrice: this.props.getTotalPrice()
        });
    }

    handleFocus(e) {
        this.props.focusEvent(e);
    }

    handleChange(e) {
        if(this.props.changeEvent(e)) {
            this.setState({
                itemIdArray: this.props.getItemIdArray(),
                totalQuantity: this.props.getTotalQuantity(),
                totalPrice: this.props.getTotalPrice()
            });
        }
    }

    handleFilterTextChange(searchValue) {

    }

    render() {
        return (
            <div>
                <Header
                    cartValue={this.state.cartValue}
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                    isAddCategory={false}
                    pageName={'cart'}
                />
                <CartBox
                    bookData={this.props.bookData}
                    itemIdArray={this.state.itemIdArray}
                    cartValue={this.state.cartValue}
                    totalQuantity={this.state.totalQuantity}
                    totalPrice={this.state.totalPrice}
                    deliveryCharge={this.props.deliveryCharge}
                    handleClick={this.handleClick}
                    handleFocus={this.handleFocus}
                    handleChange={this.handleChange}
                />
            </div>
        );
    }
}

export default CartView;