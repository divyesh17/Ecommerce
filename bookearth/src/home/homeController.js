import React from 'react'
import BOOKS from "../data/allBooks.js";
import HomeView from './HomeView';

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
    },

    clickEventOnBook: function(event) {
        let itemDetailDiv = event.target.closest(".item-details");
        if(itemDetailDiv !== null) {
            event.preventDefault();
            let itemDetailsAnchor = itemDetailDiv.getElementsByClassName('item-details__anchor')[0];
            let url = new URL(itemDetailsAnchor.href);
            let urlParams = new URLSearchParams(url.search);
            urlParams.append('itemId', itemDetailDiv.dataset.id);
            url.search = urlParams.toString();
            window.location.href = url.toString();
            //octopus.storeBookId(itemDetailDiv.dataset.id);
        }
    },

    getBookData: function () {
        return new Promise((resolve) => {
            setTimeout(() => resolve(BOOKS), 5000);
        })
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
        let itemIdArray = JSON.parse(window.localStorage.getItem("cart"));
        model.cartValue = (itemIdArray==null)?0:itemIdArray.length;
    }
};

/* ============================= VIEW ================================== */

const Home = () => {
    octopus.init();
    return <HomeView
        getBookData={octopus.getBookData}
        cartValue={octopus.getCartValue()}
        category={octopus.getCategory()}
        clickEventOnBook={octopus.clickEventOnBook}
    />
};

export default Home;