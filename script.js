'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Opening modal window
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Closing modal Window
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

// Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navigation Propagration

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab Components

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // REmove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabContent.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  // Active Tab

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


// Navigation Menu Animation

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

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', hunleHover.bind(0.5));

nav.addEventListener('mouseout', hunleHover.bind(1));


// stricky Navigation Menu

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerOvserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Same as height of navigation menu bar
});
headerOvserve.observe(header);

//... Revel Section lazy loading 

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

const lazyLoadFunc = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  // console.log(entry.target.src);
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
console.log(dotscontainer)

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