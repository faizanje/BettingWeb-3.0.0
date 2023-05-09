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

    const hasTime = hasAllCompaniesHasTime()
    console.log('hasTime',hasTime)
    if (hasTime) {
        $('.dialog-container').toggleClass('active');
    } else {
        $('.modal').addClass('active')
    }

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

    // $(this).parent().parent().find('.icon_box-small').addClass('active')
    console.log('pre data', selectedCompanies)
    let selectedTime = $(this).text();
    // get selected company's selectedSrc
    let selectedSrc = $(this).parent().siblings(".brand_logo").find(".logo_2").attr("src");
    $("img[src='" + selectedSrc + "']").parent().addClass("active");

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
    console.log('isActive', isActive)

    if (!selectedCompanies.hasOwnProperty(selectedSrc)) {
        selectedCompanies[selectedSrc] = [];
    }

    if (!isActive) {
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

// function addClicked(){
//     const pin = fetchEnteredPin()
//     saveEnteredPin(pin)
//     saveSelectedBrandLogos(getSelectedCompanies())
//     window.open('pay.html', '_self');
// }

function getSelectedCompanies() {
    let selectedCompanies = {}; // Initialize an empty object to store the selected companies and times

// Loop through each selected company
    $('.icon_box-small.active').each(function () {
        let companySrc = $(this).find('.logo_2').attr('src'); // Get the source of the selected company
        let times = []; // Initialize an empty array to store the times for this company

        // Loop through each chip for this company and add its text content to the times array
        $(this).closest('.flex-row').find('.chip.selected').each(function () {
            times.push($(this).text());
        });

        selectedCompanies[companySrc] = times; // Add the company and times to the selectedCompanies object
    });

    console.log(selectedCompanies); // Outputs the object containing selected companies and their times
    return selectedCompanies;
}

$('#reset-btn').click(function () {
    $('.icon_box-small').removeClass('active')
    $('.bet_bx-2').removeClass('active')
    $('.chip').removeClass('selected')
    selectedCompanies = {}
})

function isCompanySelected() {
    return Object.keys(selectedCompanies).length !== 0;
}

function hasAllCompaniesHasTime() {
    console.log('selectedCompanies',selectedCompanies)
    return Object.entries(selectedCompanies).every(([company, times]) => {
        console.log('times', times, times.length, times && times.length > 0)
        return Array.isArray(times) && times.length > 0;
    })
}

function on4d2rdPayClicked() {
    let selected = isCompanySelected();
    if (selected) {
        window.open('pay.html', '_self')
    } else {
        $(".modal").addClass('active')
    }
}

$('.time-wrapper').click(function () {
    $('.dialog-container').addClass('active');
})


function addClicked() {
    // getSelectedCompanies()
    // let isCompanySelected = is4dCompanySelected();
    // if(!isCompanySelected) {
    //     $(".modal").addClass('active')
    //     return
    // }
    //
    const _4d2DataArray = get4d2DataArray()
    const data4d2 = {}
    // var activeAssets = $("div.let_logo").find("div.bet_bx.active img.bk_2").map(function () {
    //     return $(this).attr("src");
    // }).get();
    // console.log('activeAssets', activeAssets)
    //
    const pin = fetchEnteredPin()
    console.log('pin', pin)

    const selectedDay = $("#days select").val();
    console.log('selectedDay', selectedDay)

    data4d2.activeAssets = selectedCompanies
    data4d2.pin = pin
    data4d2.selectedDay = selectedDay
    _4d2DataArray.push(data4d2)
    save4d2DataArray(_4d2DataArray)
}