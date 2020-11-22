// Alkupääoma = initialInvestment
// Kuukausisäästö = monthlyInvestment
// Säästöaika = investmentTime
// Vuosituotto = interestRate

// Pääoma = totalSaved
// Tuotto = profit
// Yhteensä = total

$(document).ready(function() {
    calculateEverything()
});

let yearsSelected = true

// Select all text on input focus
$("input[type='number']").click(function() {
    $(this).select();
});

// When any value is changed, result is recalculated
$("input[type='number']").on('input', function() {
    calculateEverything()
});

$("#yearButton").click(function() {
    $('#yearButton').removeClass('btn-outline-secondary')
    $('#yearButton').addClass('btn-secondary')
    $('#monthButton').removeClass('btn-secondary')
    $('#monthButton').addClass('btn-outline-secondary')
    yearsSelected = true
    calculateEverything()
})


$("#monthButton").click(function() {
    $('#monthButton').removeClass('btn-outline-secondary')
    $('#monthButton').addClass('btn-secondary')
    $('#yearButton').removeClass('btn-secondary')
    $('#yearButton').addClass('btn-outline-secondary')
    yearsSelected = false
    calculateEverything()
})

// Calculates and displays all stuff
function calculateEverything() {
    let total = calculateTotal()
    let savedMoney = calculateSavedMoney()
    let profit = total - savedMoney

    $("#paaomaText").text(numberWithSpaces(savedMoney) + " €")
    $("#tuottoText").text(numberWithSpaces(profit) + " €")
    $("#yhteensaText").text(numberWithSpaces(total) + " €")
}

function calculateTotal() {
    // Get inputs
    let initialInvestment = Number($("#initialInvestmentInput").val())
    let monthlyInvestment = Number($("#monthlyInvestmentInput").val())
    let investmentTime = Number($("#investmentTimeInput").val())
    let interestRate = Number($("#interestRateInput").val())

    // If "years" unit selected, multiplay investmentTime with 12
    if (yearsSelected === true) {
        investmentTime = investmentTime * 12
    }

    let monthlyMultiplyer = (interestRate / 100 / 12) + 1

    let total = initialInvestment

    for (let i = 0; i < investmentTime; i++) {
        total += monthlyInvestment
        total = total * monthlyMultiplyer
    }

    return total
}

function calculateSavedMoney() {
    let initialInvestment = Number($("#initialInvestmentInput").val())
    let monthlyInvestment = Number($("#monthlyInvestmentInput").val())
    let investmentTime = Number($("#investmentTimeInput").val())

    if (yearsSelected === true) {
        investmentTime = investmentTime * 12
    }

    let total = initialInvestment + (monthlyInvestment * investmentTime)

    return total
}

function numberWithSpaces(x) {
    if (x > Number.MAX_SAFE_INTEGER) {
        return "∞"
    }
    return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}