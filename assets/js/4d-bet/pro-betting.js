function addClicked() {
    let isCompanySelected = is4dCompanySelected();
    if(!isCompanySelected) {
        $(".modal").addClass('active')
        return
    }

    const _4dDataArray = get4dDataArray()
    const dataSimple4d = {}
    var activeAssets = $("div.let_logo").find("div.bet_bx.active img.bk_2").map(function () {
        return $(this).attr("src");
    }).get();
    console.log('activeAssets', activeAssets)

    const pin = fetchEnteredPin()
    console.log('pin', pin)

    const selectedDay = $("#days select").val();
    console.log('selectedDay', selectedDay)

    dataSimple4d.activeAssets = activeAssets
    dataSimple4d.pin = pin
    dataSimple4d.selectedDay = selectedDay
    _4dDataArray.push(dataSimple4d)
    save4dDataArray(_4dDataArray)
}