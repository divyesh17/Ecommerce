import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BOOKS from "./data/allBooks.js";

/* ============================ MODEL ==================================== */

let model = {
    cartValue: 0,
    category: [],
};

/* ============================= OCTOPUS ================================== */

let octopus = {

    init: function() {
        this.updateCartValue();
        this.updateCategory();
        AppView.init();
    },

    clickEventOnBook: function(event) {
        var itemDetailDiv = event.target.closest(".item-details");
        if(itemDetailDiv !== null)
            octopus.storeBookId(itemDetailDiv.dataset.id);
    },

    clickEventOnCategoryNav: function(event) {
        if(event.target.closest(".category__name"))
            return event.target.dataset.category;
    },

    getBookData: function () {
        return BOOKS;
    },

    getCartValue: function() {
        return model.cartValue;
    },

    getCategory: function () {
        return model.category;
    },

    storeBookId: function(bookId) {
        window.localStorage.setItem("bookId", bookId);
    },

    updateCategory: function() {
        model.category = ['All', 'Fiction', 'Self-Help', 'Religion', 'Business'];
    },

    updateCartValue: function() {
        var itemIdArray = JSON.parse(window.localStorage.getItem("cart"));
        model.cartValue = (itemIdArray==null)?0:itemIdArray.length;
    }
};

/* ============================= VIEW ================================== */

let AppView = {
    init: function() {
        ReactDOM.render(<App books={octopus.getBookData()} category={octopus.getCategory()}/>, document.getElementById('root'));
        registerServiceWorker();
    }
};

export default octopus;
octopus.init();