var currentFocusedInput;
var lastScrolledPos;


(function ($) {
    'use strict';

    $.fn.scrollToSimple = function ($target) {
        const $container = this.first();      // Only scrolls the first matched container

        var pos = $target.position(), height = $target.outerHeight();
        var containerScrollTop = $container.scrollTop(), containerHeight = $container.height();
        var top = pos.top + containerScrollTop;     // position.top is relative to the scrollTop of the containing element

        var paddingPx = containerHeight * 0.15;      // padding keeps the target from being butted up against the top / bottom of the container after scroll

        if (top < containerScrollTop) {
            $container.animate({
                scrollTop: top - paddingPx
            })// scroll up
            // $container.scrollTop(top - paddingPx);
        } else if (top + height > containerScrollTop + containerHeight) {     // scroll down
            $container.animate({scrollTop: top + height - containerHeight + paddingPx});
            // $container.scrollTop(top + height - containerHeight + paddingPx);
        }
    };
})(jQuery);

$('#bell').click(function () {
    console.log('Clicked')
    $(this).toggleClass("bell-on bell-off");

})

$('.clickable-handicap-item').click(function () {
    showModalDialog('Handicap')
})

$('.clickable-overunder-item').click(function () {
    showModalDialog('Over/Under')
})

function showModalDialog(title) {
    window.sessionStorage.setItem("betTitle",title)
    $('.modal-title').html(title)
    console.log($('.modal-title').html())
    console.log($('.handi-txt').html(title + ' :0.25 @ 0 - 0'))
    $('#myModal').show()
}


function hideModalDialog() {
    $('#myModal').hide()

}


$(".info_icn").click(function () {
    $(".betting_simple").addClass("active");
    lastScrolledPos = document.documentElement.scrollTop
    // addPadding();
});

$(".fast-betting-container").on('click', '.keyId', function (event) {
    onKeyClicked(event.target);
});

$(".dialog-close").click(function () {
    $(".modal").removeClass("active");
});

$(".times_x").click(function () {
    $(".betting_simple").removeClass("active");
});


$(document).click(function (event) {
        // Detecting click outside the keyboard
        const container = $(".keypad_box");
        const keyId = $(".keyId");
        if (
            (!container.is(event.target) && !container.has(event.target).length) &&
            (!keyId.is(event.target) && !keyId.has(event.target).length)
        ) {
            hideKeyboard();
        }

        const dialog = $("#myModal");
        if (
            (!dialog.is(event.target) && !dialog.has(event.target).length)
        ) {
            // hideModalDialog();
        }


    }
);

$(function () {
    simpleBettingHandler('simple-betting-1');
    populateImagesProgrammatically();
    populateBetTitle();
})

$(".numpad-btn").click(function (event) {
    const firstChild = $(event.currentTarget).children().first()
    const className = firstChild.attr('class')
    console.log(className)
    if (className === 'number') {
        const isPin = $(currentFocusedInput).hasClass('pin')
        if (isPin === true) {
            insertPin(firstChild);
        } else {
            const val = firstChild.text()
            currentFocusedInput.value = currentFocusedInput.value + val;
        }
    } else if (firstChild.hasClass('btn-next')) {
        appendFastBettingDiv()
    }
});

$(".backspace").click(function (event) {
    const isPin = $(currentFocusedInput).hasClass('pin')
    if (isPin) {
        removePin();
    } else {
        currentFocusedInput.value = currentFocusedInput.value.substring(0, currentFocusedInput.value.length - 1);
    }
})

$(".keyId").click(function (event) {
    onKeyClicked(event.target);
});

$(".keypad_arrow, .btn_arrow, .dismiss").click(function () {
    hideKeyboard();
});

$(".icon_box").click(function () {
    $(this).toggleClass("active");
});

$(".bet_bx").click(function () {
    $(this).toggleClass("active");
});


function onKeyClicked(target) {
    currentFocusedInput = target;
    showKeyboard();
}

function showAnimate(id) {
    var div = $(id + ":not(:visible)");

    var height = div.css({
        display: "block"
    }).height();

    div.css({
        overflow: "hidden",
        marginTop: height,
        height: 0
    }).animate({
        marginTop: 0,
        height: height
    }, 200, function () {
        $(this).css({
            display: "block",
            overflow: "",
            height: "",
            marginTop: ""
        });
    });
}

function showKeyboard() {
    console.log('Showing keyboard')

    $(".cost_wrapper").hide()

    showAnimate(".keypad_box");

    $('#main').scrollToSimple($(currentFocusedInput));
}

function hideAnimate(id, callback) {
    var div = $(id);

    var height = div.height();

    div.css({
        overflow: "hidden",
        marginTop: 0,
        height: height
    }).animate({
        marginTop: height,
        height: 0
    }, 200, function () {
        $(this).css({
            display: "none",
            overflow: "",
            height: "",
            marginTop: ""
        });
        callback()
    });
}

function hideKeyboard() {

    hideAnimate(".keypad_box", () => {
        $(".cost_wrapper").show()
    });

}


function populateBetTitle(){
    const title =  window.sessionStorage.getItem("betTitle")
    if(title){
        console.log(title)
        $('#bet-title').html(title)
    }
}
function populateImagesProgrammatically() {
    const arr = getImagesArray()
    arr.forEach(function (image) {
        $(".company_icon").append(getImgElement(image))
    })

}

function simpleBettingHandler(value) {
    console.log('Changed ', value);
    $(".my-table").children().hide()
    $('.' + value).show()
}

function handleNextSimpleBetting() {
    const activeChildren = $('.companny_logo').first().find('.icon_box').filter(function () {
        return $(this).hasClass('active')
    }).find('.logo_2')
    const imagesArray = $.map(activeChildren, function (elementOfArray, indexInArray) {
        console.log(indexInArray, elementOfArray)
        return elementOfArray.src;
    });
    console.log(JSON.stringify(imagesArray))
    window.sessionStorage.setItem("imagesArray", JSON.stringify(imagesArray))
    console.log(window.location)
    console.log(document.location)
    window.open('simple-betting-2.html', '_self');
    // window.location.assign("/simple-betting-2.html");
    // window.location.assign("/simple-betting-2.html");
}

function appendFastBettingDiv() {
    const fastBettingContainer = $(".fast-betting-container");
    const children = fastBettingContainer.children();
    console.log('fast-betting-container children', children.length);
    const div = `<div class="fast_betting">
        <div class="fast_bet">
            <label>${children.length + 1}</label>
            <input type="text" name="" class="keyId" readOnly placeholder="#">
        </div>
    </div>`;
    const preLastChild = children.last();
    console.log('preLastChild', preLastChild.children().first().children().first().html())
    fastBettingContainer.append(div)
    const postLastChild = $(".fast-betting-container").children().last();
    console.log('postLastChild', postLastChild.children().first().children().first().html())
    console.log('last', postLastChild.find('.keyId').get(0))
    onKeyClicked(postLastChild.last().find('.keyId').get(0))
}

function getImagesArray() {
    const imagesArrayStr = window.sessionStorage.getItem("imagesArray")
    if (!imagesArrayStr) {
        return [];
    }
    console.log('imagesArrayStr', imagesArrayStr);
    return JSON.parse(imagesArrayStr);
    // return [];
}

function getBetBxDiv(image1, image2) {
    return `<div className="bet_bx">
        <img src="${image1}" className="bk_1" alt="">
            <img src="${image2}" className="bk_2" alt="">
    </div>`;
}

function getImgElement(image) {
    return `<img src="${image}" className="bk_2" alt="">`;
}

function insertPin(firstChild) {
    let focusedPinIndex = -1;
    const array = $("#pin-container").children()
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
        console.log(array[i].value)
        if (array[i].value.length === 0) {
            focusedPinIndex = i;
            break;
        }
    }
    if (focusedPinIndex !== -1) {
        const val = firstChild.text()
        currentFocusedInput = array[focusedPinIndex];
        currentFocusedInput.value = currentFocusedInput.value + val;
    }
}


function removePin() {
    let focusedPinIndex = -1;
    const array = $("#pin-container").children()
    for (let i = (array.length - 1); i >= 0; i--) {
        console.log(array[i])
        if (array[i].value.length >= 1) {
            focusedPinIndex = i;
            break;
        }
    }
    if (focusedPinIndex !== -1) {
        currentFocusedInput = array[focusedPinIndex];
        currentFocusedInput.value = "";
    }
}

function onPayClicked() {
    let isCompanySelected = false;
    const activeChildren = $('.let_logo').first().find('.bet_bx').filter(function () {
        console.log($(this).hasClass('active'))
        return $(this).hasClass('active')
    });
    console.log(activeChildren.length)
    isCompanySelected = activeChildren.length !== 0;
    console.log('isCompanySelected', isCompanySelected)
    if (isCompanySelected) {
        window.open('pay.html', '_self');
    } else {
        $(".modal").addClass('active')
    }
}

function urlHandler(value) {
    window.location.assign(`${value}`);
}

function goBack() {
    history.back();
}
