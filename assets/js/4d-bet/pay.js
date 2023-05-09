$(function () {
    populatePayItems()
    $('.set_x').click(function() {
        var setIndex = $(this).parent().index();
        console.log(setIndex);
        const data = get4dDataArray()
        data.splice(setIndex,1)
        console.log('newData',data)
        save4dDataArray(data)
        window.location.reload()
    });

})


function populatePayItems() {
    const data = get4dDataArray()
    $.each(data, function (index, item) {
        // create a new sets_wrapper element
        var setsWrapper = $('<div>').addClass('sets_wrapper');

        // set the set_number
        var setNumber = $('<span>').addClass('set_number').text(index + 1);
        setsWrapper.append(setNumber);

        // create and set the sets_card
        var setsCard = $('<div>').addClass('sets_card');
        setsWrapper.append(setsCard);

        // create and set the sets_top
        var setsTop = $('<div>').addClass('sets_top');
        setsCard.append(setsTop);

        // create and set the sets_bet
        var setsBet = $('<div>').addClass('sets_bet');
        setsBet.append($('<h3>').text(item.pin));
        setsTop.append(setsBet);

        // create and set the heart
        var heart = $('<img>').addClass('heart').attr('src', '../assets/img/heart%20(2).png');
        setsTop.append(heart);

        // create and set the sets_price
        var setsPrice = $('<div>').addClass('sets_price');
        setsPrice.append($('<p>').text('Total Bet'));
        setsPrice.append($('<h2>').text('36.00'));
        setsTop.append(setsPrice);

        // create and set the sets_logo
        var setsLogo = $('<div>').addClass('sets_logo');
        $.each(item.activeAssets, function (index, logo) {
            setsLogo.append($('<img>').attr('src', logo));
        });
        setsCard.append(setsLogo);

        // create and set the sets_info buttons
        var setsInfo = $('<div>').addClass('sets_info');
        setsInfo.append($('<button>').text(item.selectedDay));
        setsInfo.append($('<button>').text('Straight'));
        setsCard.append(setsInfo);

        // create and set the sets_info d_info
        var setsInfoD = $('<div>').addClass('sets_info d_info');
        setsInfoD.append($('<button>').text('3A:1 3B:1 3C:1 3D:1 3E:1 3N:1'));
        setsCard.append(setsInfoD);

        // create and set the set_x
        var setX = $('<span>').addClass('set_x').text('x');
        setsWrapper.append(setX);

        // append the sets_wrapper to the container element
        $('#sets_container').append(setsWrapper);
    });

    // Get the number of existing sets
    const numSets = data.length;

// Increment by 1 to get the next set number
    const nextSetNum = numSets + 1;
    console.log(
        'nextSetNum',nextSetNum
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
    $('#sets_container').append(newSetHtml);

}

function openProBetting() {
    window.open('pro-betting-1.html', "_self")
}
