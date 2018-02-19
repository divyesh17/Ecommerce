import React, { Component } from 'react';

class CartListHeader extends Component {
    render() {
        return (
            <div className="cart-list-header">
                MY CART ({this.props.cartValue})
            </div>
        );
    }
}

class ItemImageBlock extends Component {
    render() {
        return (
            <div className="item-img-block">
                <img className="item-img-block__img" src={this.props.imgSrc}/>
            </div>
        );
    }
}

class NameAndPrice extends Component {
    render() {
        return (
            <div className="name-and-price">
                <div className="name-block">
                    <a href="bookLayout.html" className="name-block__name">
                        Sherlock Holmes: Volume II (English, Paperback, Sir Arthur Conan Doyle)
                    </a>
                </div>
                <div className="price-and-seller">
                    <span className="price-and-seller__price">₹{this.props.price}</span>
                    <p>sold by <a href=""><strong>BookEarth</strong></a></p>
                </div>

                <div className="quantity-update-or-remove">
                    <div className="quantity-update">
                        <button className="quantity-update__button quantity-update--minus"
                                disabled={this.props.disabled}>-</button>
                        <input className="quantity-update__input"
                               type="text"
                               value={this.props.quantity}
                               onFocus={this.props.handleFocus}
                               onChange={this.props.handleChange}
                        />
                        <button className="quantity-update__button quantity-update--plus">+</button>
                    </div>

                    <div className="quantity-remove">
                        <button className="quantity-remove__button">REMOVE</button>
                    </div>
                </div>
            </div>
        );
    }
}

class CartItemsList extends Component {
    render() {
        let isDisabled = this.props.quantity === 1;
        return (
            <div className="cart-items-list" data-itemId={this.props.itemId}>
                <ItemImageBlock imgSrc={this.props.imgSrc}/>
                <NameAndPrice price={this.props.price}
                              quantity={this.props.quantity}
                              disabled={isDisabled}
                              handleFocus={this.props.handleFocus}
                              handleChange={this.props.handleChange}
                />
            </div>
        );
    }
}

class CartItemsTable extends Component {
    render() {
        let itemsList = this.props.itemIdArray.map((cartBookObj) => {
            let bookId = cartBookObj.bookId;
            let bookObj = this.props.bookData[bookId];

            return <CartItemsList
                key={bookId}
                itemId={bookId}
                imgSrc={bookObj.imgSrc}
                price={bookObj.price}
                quantity={cartBookObj.quantity}
                handleFocus={this.props.handleFocus}
                handleChange={this.props.handleChange}
            />
        });
        return (
            <div className="cart-items-table" onClick={this.props.handleClick}>
                <CartListHeader cartValue={this.props.cartValue}/>
                {itemsList}
            </div>
        );
    }
}

export default CartItemsTable;