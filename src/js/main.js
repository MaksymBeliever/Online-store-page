// Add to cart and add to wishes
const wishes = document.querySelector('.wishes'),
      cart = document.querySelector('.cart'),
      wishButton = document.querySelector('.wish-button'),
      buyButton = document.querySelector('.buy-button'),
      counterWishField = document.querySelector('.header-menu_right__counter-wish'),
      counterCartField = document.querySelector('.header-menu_right__counter-cart');

let counterWish = 0;
let counterCart = 0;

function addToCart(storage) {
    counterCart++;
    storage.innerText = `(${counterCart})`;   
}

function addToWish(storage) {
    counterWish++;
    storage.innerText = `(${counterWish})`;   
}

buyButton.addEventListener('click', () => addToCart(counterCartField));
wishButton.addEventListener('click', () => addToWish(counterWishField));


// Active/notactive classes toggler
const headerRightButtons = document.querySelectorAll('.header-menu_right__item');

for (let i = 0; i < headerRightButtons.length; i++) {
    headerRightButtons[i].addEventListener('click', function () {
        let current = document.getElementsByClassName('header-menu_right__item_active');
        current[0].className = current[0].className.replace(' header-menu_right__item_active', '');
        this.className += ' header-menu_right__item_active';
    });
}


// Callback and sign in popup
function bindModal(triggerSelector, modalSelector, closeSelector, modalBodySelector) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelectorAll(closeSelector),
          modalBody = document.querySelector(modalBodySelector),
          scroll = calcScroll();

    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
    
                modal.style.opacity = 1;
                modal.style.visibility = 'initial';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            }
        });
    });

    close.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.opacity = 0;
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modalBody) {
            modal.style.opacity = 0;
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.which === 27) {
            modal.style.opacity = 0;
            modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }
    });
}

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}

bindModal('.sign-in', '.popup', '.popup__close', '.popup__body');
bindModal('.subheder__callback-button', '.popup-callback', '.popup__close', '.popup-callback-body');
bindModal('.callback-header__callback-button', '.popup-callback', '.popup__close', '.popup-callback-body');


// Add a phone mask to popup
$('input[name=phone]').mask("+38 (999) 999-99-99");


// Visible properties of password
const showPasswordBtn = document.querySelector('.icon-eye'),
      passwordInput = document.querySelector('.popup__password');
      
let state = false;

showPasswordBtn.addEventListener('click', () => {
    if (state) {
        passwordInput.setAttribute('type', 'password');
        state = false;
        showPasswordBtn.style.color = '#8f8e8e';
        passwordInput.style.color = '#8f8e8e';
    } else {
        passwordInput.setAttribute('type', 'text');
        state = true;
        showPasswordBtn.style.color = '#89c238';
        passwordInput.style.color ='#89c238';
    }
});


// Change sizes and prices
const sizes = document.querySelectorAll('.radio-size'),
      newPrice = document.querySelector('.product-prices__price_big'),
      oldPrice = document.querySelector('.product-prices__price_small');

const newPrices = [5748, 5948, 6148, 6348, 6548, 6748, 6948, 7148],
      allPrices = {5748: 6574, 5948: 6774, 6148: 6974, 6348: 7174, 6548: 7374, 6748: 7574, 6948: 7774, 7148: 7974};

sizes.forEach(item => {
    item.addEventListener('click', () => {
        let sizeValue = item.getAttribute('value');

        for (let i = 0; i < newPrices.length; i++) {
            if (i+1 == sizeValue) {
                for (let item in allPrices) {
                    if (newPrices[i] == item) {
                        newPrice.innerText = newPrices[i];
                        oldPrice.innerText = allPrices[item];
                    }
                }
            }
        }
    });
});


// Redirect function
const buttons = document.querySelectorAll('.network');

function redirect(url) {
    window.location.assign(url);
}

buttons.forEach(item => {
    item.addEventListener('click', () => {
        classNameChecker(item, 'network-facebook', 'https://www.facebook.com');
        classNameChecker(item, 'network-vk', 'https://vk.com');
        classNameChecker(item, 'network-google', 'https://plus.google.com');
    });
});

function classNameChecker(element, btnClass, url) {
    if (element.classList.contains(btnClass)) {
        redirect(url);
    }
}


// Carousel
$(document).ready(function(){
    $('.carousel-horizontal').slick({
        slidesToShow: 1,
        arrows: false,
        draggable: false,
        cssEase: 'ease-in',
        asNavFor: '.carousel',
    });
});

$(document).ready(function(){
    $('.carousel').slick({
        slidesToShow: 5,
        nextArrow: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/down_arrow.png"></button>',
        vertical: true,
        verticalSwiping: true,
        asNavFor: '.carousel-horizontal',
        focusOnSelect: true,
        cssEase: 'ease-in'
    });
});


// Show img in popup
const carouselItems = document.querySelectorAll('.carousel-horizontal__item');
let carouselPopup = document.querySelector('.popup-carousel__content');

carouselItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        
        let idSelector = e.target.getAttribute('id'),
            src = document.getElementById(idSelector).src;

        carouselPopup.innerHTML = `
            <span class="popup__close icon-cross"></span>
            <img src="${src}" class="carousel-horizontal__slide popup-slide" alt="Constructor LEGO big 1">
        `;

        bindModal('.carousel-horizontal__slide', '.popup-carousel', '.popup__close', '.popup-carousel-body');
    });
});


// Burger menu
const burgerBtn = document.querySelector('.burger__btn');

function toggleMenu(){
    document.querySelector('.icon-menu').classList.toggle('icon-menu3');
    document.getElementById('burger').classList.toggle('active');
}

burgerBtn.addEventListener('click', function () {
    toggleMenu();
});
