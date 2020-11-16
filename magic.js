$(document).ready(function() {
    // Ready
    calculateEverything()
});

let vuotta = true

// Select all text on input focus
$("input[type='number']").click(function() {
    $(this).select();
});

// When any value is changed, result is recalculated
$("input[type='number']").on('input', function() {
    calculateEverything()
});

$("#vuottaButton").click(function() {
    $('#vuottaButton').removeClass('btn-outline-secondary')
    $('#vuottaButton').addClass('btn-secondary')
    $('#kuukauttaButton').removeClass('btn-secondary')
    $('#kuukauttaButton').addClass('btn-outline-secondary')
    vuotta = true
    calculateEverything()
})


$("#kuukauttaButton").click(function() {
    $('#kuukauttaButton').removeClass('btn-outline-secondary')
    $('#kuukauttaButton').addClass('btn-secondary')
    $('#vuottaButton').removeClass('btn-secondary')
    $('#vuottaButton').addClass('btn-outline-secondary')
    vuotta = false
    calculateEverything()
})

// Calculates and displays all stuff
function calculateEverything() {
    let yhteensa = calculateTotal()
    let paaoma = calculatePaaoma()
    let tuotto = yhteensa - paaoma

    $("#paaomaText").text(numberWithSpaces(paaoma) + " €")
    $("#tuottoText").text(numberWithSpaces(tuotto) + " €")
    $("#yhteensaText").text(numberWithSpaces(yhteensa) + " €")
}

function calculateTotal() {
    // Get inputs
    let alkupaaoma = Number($("#alkupaaomaInput").val())
    let kuukausisaasto = Number($("#kuukausisaastoInput").val())
    let saastoaika = Number($("#saastoaikaInput").val())
    let vuosituotto = Number($("#vuosituottoInput").val())

    // If "years" unit selected, multiplay saastoaika with 12
    if (vuotta === true) {
        saastoaika = saastoaika * 12
    }

    let monthlyMultiplyer = (vuosituotto / 100 / 12) + 1

    let total = alkupaaoma

    for (let i = 0; i < saastoaika; i++) {
        total += kuukausisaasto
        total = total * monthlyMultiplyer
    }

    return total
}

function calculatePaaoma() {
    let alkupaaoma = Number($("#alkupaaomaInput").val())
    let kuukausisaasto = Number($("#kuukausisaastoInput").val())
    let saastoaika = Number($("#saastoaikaInput").val())

    if (vuotta === true) {
        saastoaika = saastoaika * 12
    }

    let total = alkupaaoma + (kuukausisaasto * saastoaika)

    return total
}

function numberWithSpaces(x) {
    if (x > Number.MAX_SAFE_INTEGER) {
        return "∞"
    }
    return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}