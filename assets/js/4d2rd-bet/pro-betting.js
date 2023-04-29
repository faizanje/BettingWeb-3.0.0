let selectedCompanies = {}
$(function () {
    // proBettingDropdownHandler('pro-betting-1');
})

function proBettingDropdownHandler(value) {
    console.log('proBettingDropdownHandler', value)
    // console.log($("#main-container").children())
    $('#main-container').children().hide()
    // $('.betting__number').children().hide()
    $('#' + value).show()
    // $('#pro-betting-1').show()
}


$('.next-btn').click(function () {
    $('.dialog-container').toggleClass('active');
})

$('.bet_bx-2').click(function () {
    const selectedSrc = $(this).find('.bk_2').attr('src');
    $("img[src='" + selectedSrc + "']").parent().addClass("active");
    $('.dialog-container').toggleClass('active');
    if (!selectedCompanies.hasOwnProperty(selectedSrc)) {
        selectedCompanies[selectedSrc] = [];
    }
    // $(this).addClass('selected');
    // var unselectedAsset = $(this).find('.logo_1').attr('src').split('/').pop().split('%20')[0];
    // console.log('Unselected asset:', unselectedAsset);
});


// add click event listener to time chips
$(".chip").on("click", function () {
    // get selected time

    console.log('pre data',selectedCompanies)
    let selectedTime = $(this).text();
    // get selected company's selectedSrc
    let selectedSrc = $(this).parent().siblings(".brand_logo").find(".logo_2").attr("src");

    //check if chip is selected

    const isActive = $(this).hasClass('selected')
    console.log('isActive', isActive)
    if (isActive) {
        // add selected time to selectedCompanies object
        if (selectedCompanies[selectedSrc] === undefined) {
            selectedCompanies[selectedSrc] = [selectedTime];
        } else {
            selectedCompanies[selectedSrc].push(selectedTime);
        }
    } else if (selectedCompanies[selectedSrc] !== undefined) {
        const index = selectedCompanies[selectedSrc].indexOf(selectedTime)

        selectedCompanies[selectedSrc].splice(index)
    }


    console.log('Chip clicked', selectedCompanies)
    // console.log(selectedCompanies);
});

// $('.brand_logo').on('click', function() {
//     $(this).find('icon_box-small').toggleClass('active');
//
//     // Clear selectedCompanies object
//     selectedCompanies = {};
//
//     // Loop through all selected companies and their selected times
//     $('.selected').each(function() {
//         var company = $(this).find('img.logo_2').attr('src');
//         var times = [];
//
//         $(this).siblings('.chips').find('.chip').each(function() {
//             times.push($(this).text());
//         });
//
//         selectedCompanies[company] = times;
//     });
//
//     console.log(selectedCompanies);
// });

$(".icon_box-small").click(function () {
    // $(this).toggleClass("active");
    const selectedSrc = $(this).find(".logo_2").attr("src");
    $("img[src='" + selectedSrc + "']").parent().toggleClass("active");

    // console.log($(this))
    const isActive = $(this).hasClass('active')
    console.log('isActive',isActive)
    if(isActive){
        if(!selectedCompanies.hasOwnProperty(selectedSrc)){
            !selectedCompanies.hasOwnProperty(selectedSrc)
        }
    }
    else {
        delete selectedCompanies[selectedSrc]
        // Deselect all chips for selectedSrc
        $("img[src='" + selectedSrc + "']").parent().parent().next('.chips').children().removeClass('selected');

    }
    // if($(this).hasClass('active')){
    //     selectedCompanies[selectedSrc] = []
    // }else{
    //     delete selectedCompanies[selectedSrc]
    // }
    // console.log('selectedCompanies',selectedCompanies)
});


$('#reset-btn').click(function () {
    $('.icon_box-small').removeClass('active')
    $('.bet_bx-2').removeClass('active')
    $('.chip').removeClass('selected')
    selectedCompanies = {}
})

function on4d2rdPayClicked() {
    let isCompanySelected = Object.keys(selectedCompanies).length !== 0;

    if (isCompanySelected) {
        window.open('pay.html', '_self');
    } else {
        $(".modal").addClass('active')
    }
}


