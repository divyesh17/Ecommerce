import BOOKS from "../data/allBooks.js";

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

    changeEventOnSearch: function(event) {
        return event.target.value;
    },

    clickEventOnBook: function(event) {
        let itemDetailDiv = event.target.closest(".item-details");
        if(itemDetailDiv !== null)
            octopus.storeBookId(itemDetailDiv.dataset.id);
    },

    clickEventOnCategoryNav: function(event) {
        if(event.target.closest(".category__name")) {
            return event.target.dataset.category;
        }
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
        let itemIdArray = JSON.parse(window.localStorage.getItem("cart"));
        model.cartValue = (itemIdArray==null)?0:itemIdArray.length;
    }
};

export default octopus;