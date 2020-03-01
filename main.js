const nav = document.querySelector("nav")

const toggleNav = () => {
    if (nav.classList.contains("shown")) {
        nav.classList.remove("shown")
    } else {
        nav.classList.add("shown")
    }
}

window.addEventListener('click', function (e) {
    if (nav.contains(e.target)) {
        nav.classList.remove("shown")
    } else if (document.getElementById('burger-menu').contains(e.target)) {

    } else {
        nav.classList.remove("shown")
    }
})

var scrollTopBtn = document.getElementById("top-button");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}







const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    // Assign initial css classes for gallery and nav items
    setInitialState() {
        this.carouselArray[4].classList.add('gallery-item-first');
        this.carouselArray[5].classList.add('gallery-item-previous');
        this.carouselArray[0].classList.add('gallery-item-selected');
        this.carouselArray[1].classList.add('gallery-item-next');
        this.carouselArray[2].classList.add('gallery-item-last');
        this.carouselArray[3].classList.add('gallery-item-hidden');

        document.querySelector('.gallery-nav').childNodes[4].className = 'gallery-nav-item gallery-item-first';
        document.querySelector('.gallery-nav').childNodes[5].className = 'gallery-nav-item gallery-item-previous';
        document.querySelector('.gallery-nav').childNodes[0].className = 'gallery-nav-item gallery-item-selected';
        document.querySelector('.gallery-nav').childNodes[1].className = 'gallery-nav-item gallery-item-next';
        document.querySelector('.gallery-nav').childNodes[2].className = 'gallery-nav-item gallery-item-last';
        document.querySelector('.gallery-nav').childNodes[3].className = 'gallery-nav-item gallery-item-hidden';

    }

    // Update the order state of the carousel with css classes
    setCurrentState(target, selected, previous, next, first, last, hidden) {

        selected.forEach(el => {
            el.classList.remove('gallery-item-selected');

            if (target.className == 'gallery-controls-previous') {
                el.classList.add('gallery-item-next');
            } else {
                el.classList.add('gallery-item-previous');
            }
        });

        previous.forEach(el => {
            el.classList.remove('gallery-item-previous');

            if (target.className == 'gallery-controls-previous') {
                el.classList.add('gallery-item-selected');
            } else {
                el.classList.add('gallery-item-first');
            }
        });

        next.forEach(el => {
            el.classList.remove('gallery-item-next');

            if (target.className == 'gallery-controls-previous') {
                el.classList.add('gallery-item-last');
            } else {
                el.classList.add('gallery-item-selected');
            }
        });

        first.forEach(el => {
            el.classList.remove('gallery-item-first');

            if (target.className == 'gallery-controls-previous') {
                el.classList.add('gallery-item-previous');
            } else {
                el.classList.add('gallery-item-hidden');
            }
        });

        last.forEach(el => {
            el.classList.remove('gallery-item-last');

            if (target.className == 'gallery-controls-previous') {
                el.classList.add('gallery-item-hidden');
            } else {
                el.classList.add('gallery-item-next');
            }
        });

        hidden.forEach(el => {
            el.classList.remove('gallery-item-hidden');

            if (target.className == 'gallery-controls-previous') {
                el.classList.add('gallery-item-first');
            } else {
                el.classList.add('gallery-item-last');
            }
        });
    }

    // Construct the carousel navigation
    setNav() {
        galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

        this.carouselArray.forEach(item => {
            const nav = galleryContainer.lastElementChild;
            nav.appendChild(document.createElement('li'));
        });
    }

    // Construct the carousel controls
    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
        });

        !!galleryControlsContainer.childNodes[0] ? galleryControlsContainer.childNodes[0].innerHTML = this.carouselControls[0] : null;
        !!galleryControlsContainer.childNodes[1] ? galleryControlsContainer.childNodes[1].innerHTML = this.carouselControls[1] : null;
    }

    // Add a click event listener to trigger setCurrentState method to rearrange carousel
    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];

        triggers.forEach(control => {
            control.addEventListener('click', () => {
                const target = control;
                const selectedItem = document.querySelectorAll('.gallery-item-selected');
                const previousSelectedItem = document.querySelectorAll('.gallery-item-previous');
                const nextSelectedItem = document.querySelectorAll('.gallery-item-next');
                const firstCarouselItem = document.querySelectorAll('.gallery-item-first');
                const lastCarouselItem = document.querySelectorAll('.gallery-item-last');
                const hiddenCarouselItem = document.querySelectorAll('.gallery-item-hidden');

                this.setCurrentState(target, selectedItem, previousSelectedItem, nextSelectedItem, firstCarouselItem, lastCarouselItem, hiddenCarouselItem);
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.setNav();
exampleCarousel.setInitialState();
exampleCarousel.useControls();

// keys change pic

// document.onkeydown = function(e) {
//     e = e || window.event;
//     if (e.keyCode == '37') {
//         changeImage(-1) //left <- show Prev image
//     } else if (e.keyCode == '39') {
//         // right -> show next image
//         changeImage()
//     }
// }