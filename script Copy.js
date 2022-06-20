/*
'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//..............................
//..............................

// Functionality................

const hunleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblingsLink = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblingsLink.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// const calcScrollingSectionSmooth = function(section){
//    window.scrollTo({
//     left: section.left + window.pageXOffset,
//     top: section.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// }
// smoot scrolling fo section1

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // const s1coors = section1.getBoundingClientRect();

  // calcScrollingSectionSmooth(s1coors)

  section1.scrollIntoView({ behavior: 'smooth' });
});

// page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// add even litsener propagation.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//.....................
//.....................
// Tab Components

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;

  // REmove Active Classes

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabContent.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  // Active Tab

  // Active Contents
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Navigation Menu Animation

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', hunleHover.bind(0.5));

nav.addEventListener('mouseout', hunleHover.bind(1));

//..... Navigation sticky at the top
// console.log(section1.getBoundingClientRect().top);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1.getBoundingClientRect().top)
//     nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry)

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerOvserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Same as height of navigation menu bar
});
headerOvserve.observe(header);

//... Revel Section

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};

const sectionsObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  sectionsObs.observe(section);
  section.classList.add('section--hidden');
});

//..... Image loading lazy

const allImage = document.querySelectorAll('img[data-src]');
// console.log(allImage)

const lazyLoadFunc = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {});
  observe.unobserve(entry.target);
};

const lazyImageobs = new IntersectionObserver(lazyLoadFunc, {
  root: null,
  threshold: 0,
});

allImage.forEach(img => lazyImageobs.observe(img));

//..... Slider

const slides = document.querySelectorAll('.slide');
const Slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotscontainer = document.querySelector('.dots');

let currentslide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotscontainer.insertAdjacentHTML(
      'beforeend',
      `<button class = "dots__dot", data-slide = "${i}"></button>`
    );
  });
};

const activeDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    // s.style.transition = '.5s'
  });
};

createDots();
goToSlide(0);
activeDots(0);

const nextSlide = function () {
  if (currentslide === maxSlide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  goToSlide(currentslide);
  activeDots(currentslide);
};

const previousSlide = function () {
  if (currentslide === 0) {
    currentslide = maxSlide - 1;
  } else {
    currentslide--;
  }
  goToSlide(currentslide);
  activeDots(currentslide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  // if (e.key === 'ArrowRight') nextSlide();
  // if (e.key === 'ArrowLeft') previousSlide();
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && previousSlide();
});

dotscontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDots(slide);
  }
});

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// const alertHtml = function (e) {
//   alert('addEventListener: Great! you are reading the heading :D ');
// };

// const heading = document.querySelector('h1');

// heading.addEventListener('mouseenter', alertHtml);

// setTimeout(() => {
//   heading.removeEventListener('mouseenter', alertHtml);
// }, 3000);

// console.log(document.querySelectorAll('.section'))

// const header = document.querySelector('.header');

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// // message.textContent = 'We use cookie for improved functionality and analytics';

// message.innerHTML = `We use cookie for improved functionality and analytics.
//  <button class="btn btn--close-cookie"> Got it! </button>`;

// // header.prepend(message);
// header.append(message);

// // header.append(message.cloneNode(true))

// const btnCookie = document.querySelector('.btn--close-cookie');

// btnCookie.addEventListener('click', function (e) {
//   e.preventDefault();

//   // header.remove(message);
//   message.remove();
// });

// styles

// message.style.background = '#37383d';

// // message.style.width

// console.log(getComputedStyle(message).width);

// message.style.width =
//   Number.parseFloat(getComputedStyle(message).width, 10) + 200 + 'px';

// console.log(getComputedStyle(message).height);

// // message.style.height =
// //   Number.parseFloat(getComputedStyle(message).height, 10) + 150 + 'px';

// // console.log(message.style.height)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(randomColor(), 'from link', e.target, e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log(randomColor(), 'from links', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();

//   e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log(randomColor(), 'from nav', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

*/
