$(function () {
    populatePayItems()
    $('.set_x').click(function() {
        const setIndex = $(this).parent().index();
        console.log(setIndex);
        const data = get4d2DataArray()
        data.splice(setIndex,1)
        console.log('newData',data)
        save4d2DataArray(data)
        window.location.reload()
    });
    // initSelectedBrands()
    // initPin()
})

function populatePayItems() {
    const data = get4d2DataArray()
    console.log(data)

    var container = $('#sets_container');

    $.each(data, function (index, item) {
        // Create the wrapper for each set
        var setWrapper = $('<div>').addClass('sets_wrapper');

        // Add the set number
        var setNumber = $('<span>').addClass('set_number').text(index + 1);
        setWrapper.append(setNumber);

        // Create the sets card
        var setsCard = $('<div>').addClass('sets_card');

        // Add the sets top section
        var setsTop = $('<div>').addClass('sets_top');
        var setsBet = $('<div>').addClass('sets_bet');
        var pinTxt = $('<h3>').addClass('pin-txt').text(item.pin);
        setsBet.append(pinTxt);
        setsTop.append(setsBet);
        var setsPrice = $('<div>').addClass('sets_price');
        var priceP = $('<p>').text('Total Bet');
        var priceH2 = $('<h2>').text('36.00');
        setsPrice.append(priceP, priceH2);
        setsTop.append(setsPrice);
        setsCard.append(setsTop);

        // Add the flex-column section
        var flexColumn = $('<div>').addClass('flex-column');
        $.each(item.activeAssets, function (key, value) {
            var flexRow = $('<div>').addClass('flex-row');
            var img = $('<img>').addClass('small-img').attr('src', key);
            var chips = $('<div>').addClass('chips');
            $.each(value, function (index, chipValue) {
                var chip = $('<div>').addClass('chip-small-black').text(chipValue);
                chips.append(chip);
            });
            flexRow.append(img, chips);
            flexColumn.append(flexRow);
        });
        setsCard.append(flexColumn);

        // Add the sets info section
        var setsInfo = $('<div>').addClass('sets_info');
        var selectedDayBtn = $('<button>').text(item.selectedDay);
        setsInfo.append(selectedDayBtn);
        setsInfo.append($('<button>').text('Straight'));
        setsCard.append(setsInfo);

        // Add the d_info section
        var dInfo = $('<div>').addClass('sets_info d_info');
        var dInfoBtn = $('<button>').text('3A:1 3B:1 3C:1 3D:1 3E:1 3N:1');
        dInfo.append(dInfoBtn);
        setsCard.append(dInfo);

        setWrapper.append(setsCard);

        // Add the x button
        setWrapper.append($('<span>').addClass('set_x').text('x'));

        // Append the set to the container
        container.append(setWrapper);
    });

    // Appent the 'Add Number' button at the end
    // Get the number of existing sets
    const numSets = data.length;

// Increment by 1 to get the next set number
    const nextSetNum = numSets + 1;
    console.log(
        'nextSetNum', nextSetNum
    );

    // Create the HTML code as a string with the updated set number
    const newSetHtml = `
  <div class="sets_wrapper sets_add">
    <span class="set_number">${nextSetNum}</span>
    <div class="sets_number_add">
      <div class="button-bar text-center btn" onclick="openProBetting()">Add number</div>
    </div>
  </div>
`;

// Append the new HTML code to the sets_wrapper container
//     $('.sets_wrapper:last').after(newSetHtml);
    container.append(newSetHtml);
}

function openProBetting(){
    window.open('pro-betting-1.html','_self')
}

function initPin() {
    const pin = getEnteredPin()
    if (pin) {
        $('.pin-txt').text(pin);
    }

}


function initSelectedBrands() {
    const selectedBrandLogos = getSelectedBrandLogos()
    const parentElement = $('.flex-column');

// Loop through the JSON object and generate HTML for each item
    $.each(selectedBrandLogos, function (key, values) {
        const image = $('<img>', {src: key, class: 'small-img'});
        const chips = $('<div>', {class: 'chips'});

        // Loop through the values and generate HTML for each chip
        $.each(values, function (index, value) {
            // const chip = $('<div>', {class: 'chip-close', text: value});
            const chip = `<div class="chip-small-black">${value}</div>`;
            chips.append(chip);
        });

        // Create a container for the image and chips, and append it to the parent element
        const container = $('<div>', {class: 'flex-row'});
        container.append(image, chips);
        parentElement.append(container);
    });
}
