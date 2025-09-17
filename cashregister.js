
let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

// helper
function formatCurrency(num) {
  return Number(num.toFixed(2));
}

purchaseBtn.addEventListener("click", () => {
  let cash = parseFloat(cashInput.value);

  if (isNaN(cash)) return;

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeToGive = formatCurrency(cash - price);
  let totalCid = formatCurrency(cid.reduce((sum, curr) => sum + curr[1], 0));

  if (totalCid < changeToGive) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalCid === changeToGive) {
    let closedChange = cid
      .filter(([unit, amount]) => amount > 0)
      .map(([unit, amount]) => `${unit}: $${formatCurrency(amount)}`)
      .join(" ");
    changeDue.textContent = `Status: CLOSED ${closedChange}`;
    return;
  }

  let change = [];
  let reversedCid = [...cid].reverse();

  for (let [unit, amount] of reversedCid) {
    let unitValue = currencyUnit[unit];
    let amountAvailable = amount;
    let amountToReturn = 0;

    while (changeToGive >= unitValue && amountAvailable > 0) {
      amountToReturn += unitValue;
      amountAvailable -= unitValue;
      changeToGive = formatCurrency(changeToGive - unitValue);
    }

    if (amountToReturn > 0) {
      change.push([unit, formatCurrency(amountToReturn)]);
    }
  }

  if (changeToGive > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let openChange = change
    .map(([unit, amount]) => `${unit}: $${formatCurrency(amount)}`)
    .join(" ");
  changeDue.textContent = `Status: OPEN ${openChange}`;
});
