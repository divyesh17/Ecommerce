import React, { Component } from 'react';

class PriceDetailsBlock extends Component {
    render() {
        return (
            <div className="price-details-block">
                <div className="price-and-delivery">
                    <span className="items-quantity">Price ({this.props.totalQuantity} items)</span>
                    <span className="total-items-price">₹{this.props.totalPrice}</span>
                </div>
                <div className="price-and-delivery">
                    <span className="delivery__text">Delivery Charges</span>
                    <span className="delivery-charge">₹{this.props.deliveryCharge}</span>
                </div>
                <div className="payable-price-block">
                    <span className="payable-price__text">Amount Payable</span>
                    <span className="amount-payable">₹{this.props.payablePrice}</span>
                </div>
            </div>
        );
    }
}

class PriceBlock extends Component {
    render() {
        let totalPayable = this.props.totalPrice + this.props.deliveryCharge;
        return (
            <div className="price-block">
                <div className="price-block__title">
                    Price Details
                </div>
                <PriceDetailsBlock
                    totalQuantity={this.props.totalQuantity}
                    totalPrice={this.props.totalPrice}
                    deliveryCharge={this.props.deliveryCharge}
                    payablePrice={totalPayable}
                />
            </div>
        );
    }
}

class CheckoutBlock extends Component {
    render() {
        return (
            <div className="checkout-block">
                <div className="continue-shopping">
                    <a className="continue-shopping__anchor" href="home.html">
                        <span className="continue-shopping__text">Continue Shopping</span>
                    </a>
                </div>
                <div className="checkout">
                    <a className="checkout__anchor" href="#">
                        <span className="checkout__text">Checkout</span>
                    </a>
                </div>
            </div>
        );
    }
}

class PriceAndCheckout extends Component {
    render() {
        return (
            <div className="price-and-checkout">
                <PriceBlock
                    totalQuantity={this.props.totalQuantity}
                    totalPrice={this.props.totalPrice}
                    deliveryCharge={this.props.deliveryCharge}
                />
                <CheckoutBlock/>
            </div>
        );
    }
}

export default PriceAndCheckout;