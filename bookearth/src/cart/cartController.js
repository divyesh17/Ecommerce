import React from 'react'
import BOOKS from "../data/allBooks.js";
import CartView from './CartView';

/* ============================ MODEL ==================================== */

const model = {
    cartValue: 0,
    clickedItemOldQuantity: 0,
    deliveryCharge: 50,
    itemIdArray: [],
    totalQuantity: 0,
    totalItemPrice: 0
};

/* ============================= OCTOPUS ================================== */

const octopus = {

    init: function () {
        this.initItemIdArray();
        this.updateCartValue();
        this.initTotalPriceAndQuantity();
    },

    changeEvent: function (event) {
        let newQuantity = event.target.value;
        let oldQuantity = octopus.getOldQuantity();

        if (octopus.isCorrectValue(newQuantity, event) === false)
            return false;

        let quantityDiff = parseInt(newQuantity,10) - oldQuantity;
        let selectedItemPrice = octopus.getCurrentItemPrice(event);
        octopus.updateItemPriceAndQuantity(selectedItemPrice * quantityDiff, quantityDiff);
        octopus.updateValueInItemArray(octopus.getBookId(event),quantityDiff);

        return true;
    },

    clickEvent: function (event) {
        let selectedItemPrice = octopus.getCurrentItemPrice(event);
        let bookId = octopus.getBookId(event);

        if (event.target.closest(".quantity-update--plus")) {
            octopus.updateValueInItemArray(bookId,1);
            octopus.updateItemPriceAndQuantity(selectedItemPrice, 1);
        }
        else if (event.target.closest(".quantity-update--minus")) {
            octopus.updateValueInItemArray(bookId,-1);
            octopus.updateItemPriceAndQuantity(-selectedItemPrice, -1);
        }
        else if (event.target.closest(".quantity-remove__button")) {
            let selectedItemQuantity = octopus.getCurrentItemQuantity(bookId);
            // update total price and quantity
            octopus.updateItemPriceAndQuantity(-selectedItemPrice * selectedItemQuantity, -selectedItemQuantity);
            // remove id from local storage
            octopus.removeFromLocalStorage(bookId);
        }
        else if (event.target.closest(".name-block__name")) {
            octopus.storeIdToLocalStorage(bookId);
        }
    },

    focusEvent: function (event) {
        octopus.setOldQuantity(event.target.value);
    },

    getBookId: function (event) {
        if(typeof event === 'undefined')
            return -1;
        // get dom element that has id of book
        let itemDivBlock = event.target.closest(".cart-items-list");
        return itemDivBlock.dataset.itemid;
    },

    getCartValue: function () {
        return model.cartValue;
    },

    getCurrentItemPrice: function (event) {
        if(typeof event === 'undefined')
            return 0;
        let bookId = this.getBookId(event);
        let itemPrice = BOOKS[bookId].price;
        return parseInt(itemPrice,10);
    },

    getCurrentItemQuantity: function (bookId) {
        let itemInd = model.itemIdArray.reduce((itemInd,itemObj,curInd) => {
            if(itemObj.bookId === bookId) {
                itemInd = curInd;
            }
            return itemInd;
        },0);
        return model.itemIdArray[itemInd].quantity;
    },

    getDeliveryCharge: function () {
        return model.deliveryCharge;
    },

    getItemIdArray: function () {
        return model.itemIdArray;
    },

    getOldQuantity: function () {
        return model.clickedItemOldQuantity;
    },

    getTotalQuantity: function () {
        return model.totalQuantity;
    },

    getTotalItemPrice: function () {
        return model.totalItemPrice;
    },

    initItemIdArray: function () {
        let itemIdArray = JSON.parse(window.localStorage.getItem("cart"));
        //alert(window.localStorage.getItem("cart"));
        if (itemIdArray !== null)
            model.itemIdArray = itemIdArray;
    },

    initTotalPriceAndQuantity: function () {
        model.itemIdArray.forEach((bookIdObj) => {
            let price = BOOKS[bookIdObj.bookId].price;
            let quantity = bookIdObj.quantity;
           octopus.updateItemPriceAndQuantity(price*quantity, quantity);
        });
    },

    isCorrectValue: function (newQuantity, event) {
        if(newQuantity === '')
            return false;
        if (isNaN(newQuantity) || parseInt(newQuantity,10) <= 0) {
            alert("Please Enter Correct Quantity.");
            event.target.value = model.clickedItemOldQuantity;
            return false;
        }
        return true;
    },

    removeFromLocalStorage: function (bookId) {
        let itemInd = model.itemIdArray.reduce((itemInd,itemObj,curInd) => {
            if(itemObj.bookId === bookId)
                itemInd = curInd;
            return itemInd;
        },0);
        model.itemIdArray.splice(itemInd, 1);
        window.localStorage.setItem("cart", JSON.stringify(model.itemIdArray));
        octopus.updateCartValue();
    },

    setOldQuantity: function (quantity) {
        model.clickedItemOldQuantity = parseInt(quantity,10);
    },

    storeIdToLocalStorage: function (bookId) {
        window.localStorage.setItem("bookId", bookId);
    },

    updateCartValue: function () {
        model.cartValue = model.itemIdArray.length;
    },

    updateItemPriceAndQuantity: function (price, quantity) {
        model.totalItemPrice += parseInt(price,10);
        model.totalQuantity += parseInt(quantity,10);
    },

    updateValueInItemArray: function (bookId, value) {
        let itemInd = model.itemIdArray.reduce((itemInd,itemObj,curInd) => {
            if(itemObj.bookId === bookId) {
                itemInd = curInd;
            }
            return itemInd;
        },0);
        model.itemIdArray[itemInd].quantity += value;
        window.localStorage.setItem("cart", JSON.stringify(model.itemIdArray));
    }
};

/* ============================= VIEW ================================== */

const Cart = () => {
    octopus.init();
    return <CartView
        bookData = {BOOKS}
        getItemIdArray={octopus.getItemIdArray}
        getCartValue={octopus.getCartValue}
        getTotalQuantity={octopus.getTotalQuantity}
        getTotalPrice={octopus.getTotalItemPrice}
        deliveryCharge={octopus.getDeliveryCharge()}
        clickEvent={octopus.clickEvent}
        focusEvent={octopus.focusEvent}
        changeEvent={octopus.changeEvent}
    />
};

export default Cart;