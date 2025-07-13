function formatNumber(num) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function calcBreakEven(fixedCost, grossMarginRate, price, variableCost) {
    var margin = grossMarginRate / 100;
    var breakEvenSales = fixedCost / margin;
    var breakEvenQty = (price - variableCost) !== 0 ? fixedCost / (price - variableCost) : Infinity;
    return { sales: breakEvenSales, qty: breakEvenQty };
}

document.getElementById('calcBasic').addEventListener('click', function() {
    var fixedCost = parseFloat(document.getElementById('fixedCost').value) || 0;
    var grossMargin = parseFloat(document.getElementById('grossMargin').value) || 0;
    var price = parseFloat(document.getElementById('price').value) || 0;
    var variable = parseFloat(document.getElementById('variableCost').value) || 0;
    var result = calcBreakEven(fixedCost, grossMargin, price, variable);
    document.getElementById('basicResult').textContent =
        '損益平衡金額：' + formatNumber(result.sales) + '，損益平衡數量：' + formatNumber(result.qty);
});

document.getElementById('calcFinance').addEventListener('click', function() {
    var fixedCost = parseFloat(document.getElementById('fixedCost').value) || 0;
    var grossMargin = parseFloat(document.getElementById('grossMargin').value) || 0;
    var price = parseFloat(document.getElementById('price').value) || 0;
    var variable = parseFloat(document.getElementById('variableCost').value) || 0;
    var oldLoan = parseFloat(document.getElementById('oldLoanPayment').value) || 0;
    var newLoanAmount = parseFloat(document.getElementById('newLoanAmount').value) || 0;
    var newLoanYears = parseFloat(document.getElementById('newLoanYears').value) || 0;
    var newLoanRate = parseFloat(document.getElementById('newLoanRate').value) || 0;

    var months = newLoanYears * 12;
    var monthlyRate = newLoanRate / 100 / 12;
    var newLoanPayment = 0;
    if (months > 0 && monthlyRate > 0) {
        newLoanPayment = newLoanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    } else if (months > 0) {
        newLoanPayment = newLoanAmount / months;
    }

    var totalFixed = fixedCost + oldLoan + newLoanPayment;
    var result = calcBreakEven(totalFixed, grossMargin, price, variable);

    var text = '每月新增貸款攤還：' + formatNumber(newLoanPayment) + '\n';
    text += '新的損益平衡金額：' + formatNumber(result.sales) + '，損益平衡數量：' + formatNumber(result.qty);
    document.getElementById('financeResult').textContent = text;
});
