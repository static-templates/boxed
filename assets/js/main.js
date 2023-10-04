import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

let activeSlide = 0;
let totalSlides = 0;

if ( localStorage.getItem('dark') ) {
    showNight();
} else {
    showDay();
}

document.getElementById('day-toggle').addEventListener('click', function(){
    if(day){
        showNight();
    } else {
        showDay();
    }
});

function showDay(){
    document.documentElement.classList.remove('dark');
    day = true;
    localStorage.removeItem('dark');
}

function showNight(){
    document.documentElement.classList.add('dark');
    day = false;
    localStorage.setItem('dark', true);
}

recalculateSliderHeight();
window.addEventListener('DOMContentLoaded', (event) => {

    if(document.querySelector('.slider')){
        recalculateSliderHeight();

        totalSlides = document.querySelectorAll('.slide').length;

        let heightInterval = setInterval(function(){
            recalculateSliderHeight();
            if( document.querySelector('.slider') && document.querySelector('.slider').offsetHeight > 100){
                clearInterval(heightInterval);   
            }
        }, 100);

        sliderButtons();
    }

    document.getElementsByTagName('body')[0].classList.remove('opacity-0');
});

window.slideLoopInterval = setInterval(function(){
    nextSlide();
}, 4000);

window.nextSlide = function(){
    document.querySelector('.slide-' + activeSlide).classList.remove('active');
    activeSlide += 1;
    if(activeSlide > (totalSlides-1)){
        activeSlide = 0;
    }
    if(document.querySelector('.slide-' + activeSlide)){
        document.querySelector('.slide-' + activeSlide).classList.add('active');
    }
    recalculateSliderHeight();
}

window.prevSlide = function(){
    document.querySelector('.slide-' + activeSlide).classList.remove('active');
    activeSlide -= 1;
    if(activeSlide <= 0){
        activeSlide = (totalSlides-1);
    }
    if(document.querySelector('.slide-' + activeSlide)){
        document.querySelector('.slide-' + activeSlide).classList.add('active');
    }
    recalculateSliderHeight();
}

function sliderButtons(){
    // Click Left and Right Events
    let leftBtns = document.querySelectorAll('.left');
    for(i=0; i<leftBtns.length; i++){
        leftBtns[i].addEventListener('click', function(){
            clearInterval(slideLoopInterval);
            console.log('left');
            prevSlide();
        });
    }

    let rightBtns = document.querySelectorAll('.right');
    for(i=0; i<rightBtns.length; i++){
        rightBtns[i].addEventListener('click', function(){
            clearInterval(slideLoopInterval);
            nextSlide();
        });
    }
}

window.addEventListener('resize', function(){
    recalculateSliderHeight();
});

function recalculateSliderHeight(){
    if( document.querySelector('.slide.active') ){
        let initialHeight = document.querySelector('.slide.active').offsetHeight;
        document.querySelector('.slider').style.height=initialHeight + 'px';
    }
}

window.clickActiveSlide = function(e){
    if( !hasParentWithMatchingSelector(e.target, '.left') && !hasParentWithMatchingSelector(e.target, '.right') && !e.target.classList.contains('left') && !e.target.classList.contains('right') ){
        window.location = document.querySelector('.slide.active').dataset.href;
    }
    console.log(e.target);
}

window.showMenu = function(){
    document.getElementById('sidemenu').classList.remove('invisible');
    document.getElementById('sidemenu-box').classList.remove('-translate-x-full');
    document.getElementById('sidemenu-box').classList.add('translate-x-0');
    document.getElementById('sidemenu-overlay').classList.remove('opacity-0');
    document.getElementById('sidemenu-overlay').classList.add('opacity-100');
}

window.hideMenu = function(){
    document.getElementById('sidemenu-box').classList.remove('translate-x-0');
    document.getElementById('sidemenu-box').classList.add('-translate-x-full');
    document.getElementById('sidemenu-overlay').classList.remove('opacity-100');
    document.getElementById('sidemenu-overlay').classList.add('opacity-0');
    setTimeout(function(){
        document.getElementById('sidemenu').classList.add('invisible');
    }, 500);
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        hideMenu();
    }
};

function hasParentWithMatchingSelector (target, selector) {
    return [...document.querySelectorAll(selector)].some(el =>
        el !== target && el.contains(target)
    )
}
