import React, { Component } from 'react';
import books from "./data/allBooks";

class ItemDetails extends Component {
    render() {
        return (
            <div className="item-details">
                <a className="item-details__anchor" href="../public/commonBookLayout.html">
                    <div className="item-details__image-block">
                        <img src={this.props.bookObj.imgSrc}/>
                    </div>
                    <div className="item-details__name-price">
                        <span className="item-details__name" title={this.props.bookObj.name}>
                            {this.props.bookObj.name}
                        </span>
                        <span className="item-details__price">
                            ₹{this.props.bookObj.price}
                        </span>
                    </div>
                </a>
            </div>
        );
    };
}

class ItemSection extends Component {
    render() {
        let allBooks = [];
        for(let bookId in this.props.books) {
            if(books.hasOwnProperty(bookId)) {
                console.log(this.props.filterCategory);
                if(this.props.filterCategory.toLowerCase() === 'all')
                    allBooks.push(<ItemDetails bookObj={books[bookId]} key={bookId}/>);
                else if(this.props.filterCategory.toLowerCase() ===
                                books[bookId].category[0].toLowerCase()) {
                    allBooks.push(<ItemDetails bookObj={books[bookId]} key={bookId}/>);
                }
            }
        }
        return (
            <section className="items-box">
                {allBooks}
            </section>
        );
    };
}

export default ItemSection;