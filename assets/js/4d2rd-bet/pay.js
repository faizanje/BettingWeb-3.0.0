$(function () {
    initSelectedBrands()
    initPin()
})

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
