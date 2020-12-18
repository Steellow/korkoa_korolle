// Alkupääoma = initialInvestment
// Kuukausisäästö = monthlyInvestment
// Säästöaika = investmentTime
// Vuosituotto = interestRate

// Pääoma = totalSaved
// Tuotto = profit
// Yhteensä = total

$(document).ready(calculateEverything);

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
    const total = calculateTotal()
    const savedMoney = calculateSavedMoney()
    const profit = total - savedMoney

    $("#totalSavedText").text(numberWithSpaces(savedMoney) + " €")
    $("#profitText").text(numberWithSpaces(profit) + " €")
    $("#yhteensaText").text(numberWithSpaces(total) + " €")
}

function calculateTotal() {
    // Get inputs
    const initialInvestment = Number($("#initialInvestmentInput").val())
    const monthlyInvestment = Number($("#monthlyInvestmentInput").val())
    const interestRate = Number($("#interestRateInput").val())
    let investmentTime = Number($("#investmentTimeInput").val())

    if (yearsSelected) {
        investmentTime *= 12
    }

    const monthlyMultiplyer = (interestRate / 100 / 12) + 1

    let total = initialInvestment

    for (let i = 0; i < investmentTime; i++) {
        total += monthlyInvestment
        total *= monthlyMultiplyer
    }

    return total
}

function calculateSavedMoney() {
    const initialInvestment = Number($("#initialInvestmentInput").val())
    const monthlyInvestment = Number($("#monthlyInvestmentInput").val())
    let investmentTime = Number($("#investmentTimeInput").val())

    if (yearsSelected) {
        investmentTime *= 12
    }

    let total = initialInvestment + (monthlyInvestment * investmentTime)

    return total
}

function numberWithSpaces(x) {
    if (x > Number.MAX_SAFE_INTEGER) {
        return "∞"
    }
    return x.toLocaleString('fi-FI', { maximumFractionDigits: 0 })
}