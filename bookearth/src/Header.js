import React, { Component } from 'react';
import cartImg from './assets/images/cart.png';
import logo from './assets/images/logo.ico';

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <a className="logo__anchor" href="index.html">
                    <img className="logo__img" src={logo} alt="BookEarth"/>
                    <span className="logo__name">BookEarth</span>
                </a>
            </div>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <div className="search-bar">
                <span className="material-icons md-50">search</span>
                <input
                    className="search-bar__input"
                    name="search"
                    onChange={this.handleChange}
                    placeholder="Search.."
                    type="text"
                    value={this.props.filterText}
                />
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
                <a className="cart__anchor" href="../public/%PUBLIC_URL%/cart.html">
                    <img className="cart__img" src={cartImg} alt="BookEarth"/>
                    <div className="cart__cart-text-value">
                        <span>Cart({this.props.cartValue})</span>
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
                <SearchBar
                    filterText={this.props.filterText}
                    onFilterTextChange={this.props.onFilterTextChange}
                />
                <YourAccount/>
                <Cart cartValue={this.props.cartValue}/>
            </div>
        );
    }
}

class CategoryName extends Component {
    render() {
        let categoryName = this.props.categoryName;
        let filterCategory = this.props.filterCategory;
        let catClassName =  (categoryName === filterCategory) && (!this.props.filterText)
                            ? ("category__name category__name--focus")
                            : ("category__name");
        return (
            <button className={catClassName} data-category={categoryName}>{categoryName}</button>
        );
    };
}

class Category extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if(e.target.closest(".category__name")) {
            this.props.onCategoryChange(e.target.dataset.category);
        }
    }

    render() {
        let categoryArray = [];
        let filterCategory = this.props.filterCategory;
        let filterText = this.props.filterText;
        this.props.category.forEach(function(catName) {
            categoryArray.push(<CategoryName
                                    categoryName={catName}
                                    filterCategory={filterCategory}
                                    filterText={filterText}
                                    key={catName}
                                />);
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
            <header className="header" data-pageName={this.props.pageName}>
                <CartAndSearch
                    cartValue={this.props.cartValue}
                    filterText={this.props.filterText}
                    onFilterTextChange={this.props.onFilterTextChange}
                />
                {this.props.isAddCategory ?
                    <Category
                        category={this.props.category}
                        filterCategory={this.props.filterCategory}
                        filterText={this.props.filterText}
                        onCategoryChange={this.props.onCategoryChange}
                    />:null
                }
            </header>
        );
    }
}

export default Header;