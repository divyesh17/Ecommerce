import React, { Component } from 'react';
import books from '../data/allBooks';
import loadingGif from '../assets/images/loader.gif'

class ItemDetails extends Component {
    render() {
        return (
            <div className="item-details" data-id={this.props.bookObj.id}>
                <a className="item-details__anchor" href="bookLayout.html">
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
    constructor(props) {
        super(props);
        this.state = {
            booksData: {},
            currentStatus: 'Loading...'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.clickOnBook(e);
    }

    componentWillMount() {
        this.props.getBookData().then((booksData) => {
            this.setState({
                booksData,
                currentStatus: ''
            });
        })
    }

    render() {
        let allBooks = [];
        for(let bookId in this.state.booksData) {
            if(books.hasOwnProperty(bookId)) {
                //console.log(this.props.filterCategory);
                let bookObj = books[bookId];
                if(this.props.filterText) {
                    if (bookObj.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1)
                        continue;
                    allBooks.push(<ItemDetails bookObj={bookObj} key={bookId}/>);
                }
                else if (this.props.filterCategory.toLowerCase() === 'all')
                    allBooks.push(<ItemDetails bookObj={bookObj} key={bookId}/>);
                else if (this.props.filterCategory.toLowerCase() ===
                            bookObj.category[0].toLowerCase()) {
                    allBooks.push(<ItemDetails bookObj={bookObj} key={bookId}/>);
                }
            }
        }
        return (
            <section className="items-box" onClick={this.handleClick}>
                {
                    this.state.currentStatus ?
                        <img src={loadingGif}
                             alt={this.state.currentStatus}
                             style={{width:'10rem',
                                    height:'10rem',
                                    position:'absolute',
                                    top:'50%'
                             }}
                        /> :
                        allBooks
                }
            </section>
        );
    };
}

export default ItemSection;