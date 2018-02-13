import React, { Component } from 'react';

function checkSpecs(specs) {
    if(specs === 'category' || specs === 'imgSrc' || specs === 'name' ||
            specs === 'price' || specs === 'id' || specs === 'seller')
        return false;
    return true;
}

class BookImgBlock extends Component {
    render() {
        return (
            <div className="book-img-block">
                <img className="book-img-block__img" src={this.props.imgSrc}/>
            </div>
        );
    }
}

class CartButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.clickOnCartButton(e);
    }

    render() {
        let text = this.props.isBookAlreadyInCart?'Added to Cart':'Add to Cart';
        return (
            <div className="buttons-block" onClick={this.handleClick}>
                <button className="cart-button-block__button">
                    {text}
                </button>
                <a href="%PUBLIC_URL%/cart.html">
                    <button className="buy-button-block__button">
                        Buy Now
                    </button>
                </a>
            </div>
        );
    }
}

class BookImgAndCart extends Component {
    render() {
        return (
            <div className="book-image-and-cart-button">
                <BookImgBlock imgSrc={this.props.imgSrc}/>
                <CartButton clickOnCartButton={this.props.clickOnCartButton}
                            isBookAlreadyInCart={this.props.isBookAlreadyInCart}
                />
            </div>
        );
    }
}

class BookName extends Component {
    render() {
        return (
            <div className="book-name">
                {this.props.name}
            </div>
        )
    }
}

class PriceAndSeller extends Component {
    render() {
        return (
            <div className="price-and-seller">
                <p className="price-and-seller__price">₹{this.props.price}</p>
                <p>sold by{' '}
                    <a href="">
                        <strong className="price-and-seller__seller">{this.props.seller}</strong>
                    </a>
                </p>
            </div>
        )
    }
}

class BookSpecsNameValue extends Component {
    render() {
        return (
            <li className="book-specifications__list-row">
                <span className="book-specifications__name">{this.props.name}</span>
                <span className="book-specifications__value">{this.props.value}</span>
            </li>
        )
    }
}

class BookSpecsList extends Component {
    render() {
        let specsList = [];
        for(let specs in this.props.bookObj) {
            if(this.props.bookObj.hasOwnProperty(specs) && checkSpecs(specs))
            {
                specsList.push(<BookSpecsNameValue
                                    name={specs}
                                    value={this.props.bookObj[specs]}
                                    key={specs}
                />)
            }
        }
        return (
            <ul className="book-specifications__list">
                {specsList}
            </ul>
        )
    }
}

class BookSpecification extends Component {
    render() {
        return (
            <div className="book-specifications">
                <div className="book-specifications__title">
                    Specifications
                </div>
                <div className="book-specifications__box">
                    <BookSpecsList bookObj={this.props.bookObj}/>
                </div>
            </div>
        );
    }
}

class BookDetails extends Component {
    render() {
        return (
            <div className="book-details">
                <BookName name={this.props.bookObj.name}/>
                <PriceAndSeller
                        price={this.props.bookObj.price}
                        seller={this.props.bookObj.seller}
                />
                <BookSpecification bookObj={this.props.bookObj}/>
            </div>
        );
    }
}

class BookSection extends Component {
    render() {
        return (
            <section className="book-info-section">
                <BookImgAndCart
                    imgSrc={this.props.bookObj.imgSrc}
                    clickOnCartButton={this.props.clickOnCartButton}
                    isBookAlreadyInCart={this.props.isBookAlreadyInCart}
                />
                <BookDetails bookObj={this.props.bookObj}/>
            </section>
        );
    }
}

export default BookSection;