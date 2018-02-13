import BOOKS from "../data/allBooks.js";
import React from 'react';
import BookDetailView from './BookDetailView';

/* ============================ MODEL ==================================== */

let model = {
    bookId: null,
    bookDetailObj: null,
    cartValue: 0,
    itemIdArray: []
};

/* ============================= OCTOPUS ================================== */

let octopus = {

    init: function() {
        this.initItemIdArray();
        this.updateCartValue();
        this.initBookId();
        this.initBookDetailObj();
    },

    addBookIdToLocalStorage: function() {
        if(this.isBookAlreadyInCart())
            return;
        model.itemIdArray.push(model.bookId);
        window.localStorage.setItem("cart",JSON.stringify(model.itemIdArray));
    },

    clickFunction: function(event) {
        if(event.target.closest(".cart-button-block__button")
            || event.target.closest(".buy-button-block__button"))
        {
            this.addBookIdToLocalStorage();
            this.updateCartValue();
        }
        return this.getCartValue();
    },

    getBookDetailObj: function() {
        return model.bookDetailObj;
    },

    getBookId: function() {
        return model.bookId;
    },

    getCartValue: function() {
        return model.cartValue;
    },

    getItemIdArray: function() {
        return model.itemIdArray;
    },

    initBookDetailObj: function() {
        model.bookDetailObj = BOOKS[this.getBookId()];
    },

    initBookId: function() {
        //get bookId from local storage
        model.bookId = window.localStorage.getItem("bookId");
    },

    initItemIdArray: function() {
        let itemIdArray = JSON.parse(window.localStorage.getItem("cart"));
        if(itemIdArray !== null)
            model.itemIdArray = itemIdArray;
    },

    isBookAlreadyInCart: function() {
        let matchedElemInd = model.itemIdArray.indexOf(model.bookId);
        return (matchedElemInd === -1)?false:true;
    },

    updateCartValue: function() {
        model.cartValue = model.itemIdArray.length;
    }
};

/* ============================= VIEW ================================== */

const BookLayout = () => {
    //alert(5);
    octopus.init();
    return <BookDetailView
        bookObj={octopus.getBookDetailObj()}
        cartValue={octopus.getCartValue()}
        isBookAlreadyInCart={octopus.isBookAlreadyInCart()}
        clickFunction={octopus.clickFunction}
    />
};

export default BookLayout;