// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}






var isMobile = false;
var toggle = true;

var mouseY = 0;


document.onmousemove = (e) => {
    mouseY = e.clientY;
}

var lastScrollTop = 0;
var up = false;

var pos = 0;


//positions
var spots = [0, document.getElementById("page2"), document.getElementById("page3"), document.getElementById("page4"), document.getElementById("page5"), document.getElementById("page6"), document.getElementById("page7"), document.getElementById("page8"), document.getElementById("page9"), document.getElementById("page10"), document.getElementById("page11"), document.getElementById("page12"), document.getElementById("page13"), document.getElementById("page14")];

timeout = ''

var navs = [document.getElementById("intro"), document.getElementById("top"), document.getElementById("stats"), document.getElementById("math"), document.getElementById("results"), document.getElementById("conclusion")];

function adjustNav() {
    if (pos >= 0 && pos <= 1) {
        navs[0].className = "selected";
    } else {
        navs[0].className = "unselected";
    }

    if (pos >= 2 && pos <= 6) {
        navs[1].className = "selected";
    } else {
        navs[1].className = "unselected";
    }

    if (pos == 7) {
        navs[2].className = "selected";
    } else {
        navs[2].className = "unselected";
    }

    if (pos >= 8 && pos <= 9) {
        navs[3].className = "selected";
    } else {
        navs[3].className = "unselected";
    }

    if (pos >= 10 && pos <= 11) {
        navs[4].className = "selected";
    } else {
        navs[4].className = "unselected";
    }

    if (pos >= 12) {
        navs[5].className = "selected";
    } else {
        navs[5].className = "unselected";
    }
}

function scrollToPos() {

    adjustNav();
    //window.location.hash = hash[pos];
    if (pos == 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    } else {
        var height = (innerHeight - spots[pos].offsetHeight) / 2;
        window.scrollTo({
            top: spots[pos].offsetTop - height,
            behavior: 'smooth'
        })
    }

    clearTimeout(timeout);

}




var scrolling = false;
var static = true;
var staticVal = 0;

window.scroll({
    left: 0
});


function tempScroll(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
        up = true;
    } else {
        up = false;
    }

    adjustPos();
    scrollToPos();

    staticVal = 0;
    static = true;
}

document.addEventListener('wheel', tempScroll, { passive: false });

function swipe(e) {
    e.preventDefault();
}

window.addEventListener('touchmove', swipe, { passive: false });

var clientX, clientY;

window.addEventListener('touchstart', function (e) {
    // Cache the client X/Y coordinates
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
}, false);

window.addEventListener('touchend', function (e) {
    var deltaX, deltaY;

    deltaX = e.changedTouches[0].clientX - clientX;
    deltaY = e.changedTouches[0].clientY - clientY;

    var dist = 60

    if (deltaY > 60) {
        up = true;
    } else if (deltaY < -60) {
        up = false;
    } else if (!e.target.classList.contains("headerTap")) {
        return;
    } else {
        return;
    }

    adjustPos();
    scrollToPos();


}, false);


function adjustPos() {
    scrolling = true;
    if (up) {
        pos--;
        if (pos < 0) {
            pos = 0;
        }
    } else {
        pos++;
        if (pos >= spots.length) {
            pos = spots.length - 1;
        }
    }
}


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 38: 1, 40: 2, 32: 2, 33: 1, 34: 2, 35: 3, 36: 3 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);

        if (keys[e.keyCode] == 1) {
            up = true;
        } else if (keys[e.keyCode] == 2) {
            up = false;
        } else if (e.keyCode == 35) {
            up = false;
            pos = spots.length - 1;
        } else if (e.keyCode == 36) {
            up = true;
            pos = 0;
        }



        adjustPos();
        scrollToPos();

        return false;
    }
}

samePage = { 1: 1, 2: 1, 4: 1, 3: 1 }
function scrollToSetPos(tempPos) {
    if (samePage[tempPos]) {
        pos = tempPos;
        scrollToPos();
    }


}

//window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
window.addEventListener('keydown', preventDefaultForScrollKeys, false);



function redirect(url) {
    window.location.replace(url);
}

function repage(page) {
    pos = page;
    scrollToPos();
}

adjustNav();
