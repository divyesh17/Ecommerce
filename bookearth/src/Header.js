import React, { Component } from 'react';
import cartImg from './assets/images/cart.png';
import logo from './assets/images/logo.ico';

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <a className="logo__anchor" href="../public/index.html">
                    <img className="logo__img" src={logo} alt="BookEarth"/>
                    <span className="logo__name">BookEarth</span>
                </a>
            </div>
        );
    }
}

class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <span className="material-icons md-50">search</span>
                <input className="search-bar__input" type="text" name="search" placeholder="Search.."/>
            </div>
        );
    }
}

class YourAccount extends Component {
    render() {
        return (
            <div className="your-account">
                <button className="your-account__button">Your Account</button>
                <div className="your-account__drop-down">
                    <a className="your-account__anchor" href="#">Profile</a>
                    <a className="your-account__anchor" href="#">Order</a>
                    <a className="your-account__anchor" href="#">Settings</a>
                    <a className="your-account__anchor" href="#">Logout</a>
                </div>
            </div>
        );
    }
}

class Cart extends Component {
    render() {
        return (
            <div className="cart">
                <a className="cart__anchor" href="../public/cart.html">
                    <img className="cart__img" src={cartImg} alt="BookEarth"/>
                    <div className="cart__cart-text-value">
                        {/*<span>Cart ({this.props.cartValue})</span>*/}
                        {/*<span className="cart__cart-value">0</span>*/}
                        {/*<span>)</span>*/}
                    </div>
                </a>
            </div>
        );
    }
}

class CartAndSearch extends Component {
    render() {
        return (
            <div className="cart-and-search">
                <Logo/>
                <SearchBar/>
                <YourAccount/>
                <Cart/>
            </div>
        );
    }
}

class CategoryName extends Component {
    render() {
        let categoryName = this.props.categoryName;
        return (
            <button className="category__name" data-category={categoryName}>{categoryName}</button>
        );
    };
}

class Category extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onCategoryChange(e);
    }

    render() {
        let categoryArray = [];
        this.props.category.forEach(function(catName) {
            categoryArray.push(<CategoryName categoryName={catName} key={catName}/>);
        });
        return (
            <div className="category">
                <nav className="category__nav" onClick={this.handleClick}>
                    {categoryArray}
                </nav>
            </div>
        );
    };
}

class Header extends Component {
    render() {
        return (
            <header className="header">
                <CartAndSearch/>
                <Category
                    category={this.props.category}
                    onCategoryChange={this.props.onCategoryChange}
                />
            </header>
        );
    }
}

export default Header;