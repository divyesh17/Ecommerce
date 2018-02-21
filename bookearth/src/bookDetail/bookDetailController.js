import BOOKS from "../data/allBooks.js";
import React from 'react';
import BookDetailView from './BookDetailView';

/* ============================ MODEL ==================================== */

const model = {
    bookId: null,
    bookDetailObj: null,
    cartValue: 0,
    itemIdArray: []
};

/* ============================= OCTOPUS ================================== */

const octopus = {

    init: function() {
        this.initItemIdArray();
        this.updateCartValue();
        this.initBookId();
        this.initBookDetailObj();
    },

    addBookIdToLocalStorage: function() {
        if(octopus.isBookAlreadyInCart())
            return;
        model.itemIdArray.push({bookId: model.bookId, quantity: 1});
        window.localStorage.setItem("cart",JSON.stringify(model.itemIdArray));
    },

    clickFunction: function(event) {
        if(event.target.closest(".cart-button-block__button")
            || event.target.closest(".buy-button-block__button"))
        {
            octopus.addBookIdToLocalStorage();
            octopus.updateCartValue();
        }
        return octopus.getCartValue();
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
        model.bookDetailObj = BOOKS[octopus.getBookId()];
    },

    initBookId: function() {
        //get bookId from local storage
        let urlParams = new URLSearchParams(window.location.search);
        model.bookId = urlParams.get('itemId');
    },

    initItemIdArray: function() {
        let itemIdArray = JSON.parse(window.localStorage.getItem("cart"));
        if(itemIdArray !== null)
            model.itemIdArray = itemIdArray;
    },

    isBookAlreadyInCart: function() {
        let matchedElemInd = model.itemIdArray.reduce((matchedInd,bookObj,curInd) => {
            if(bookObj.bookId === model.bookId)
                matchedInd = curInd;
            return matchedInd;
        },-1);
        return matchedElemInd !== -1;
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