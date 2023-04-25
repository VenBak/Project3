import axios from "axios";

const apiKey = "";

function findStockSymbol() {
  const companyName = document.getElementById("companyName").value.trim();
  if (companyName === "") {
    alert("Please enter a company name.");
    return;
  }

  axios
    .get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${apiKey}`
    )
    .then((response) => {
      const stockSymbols = response.data.bestMatches;
      const durationSelect = document.getElementById("duration");
      const selectedDuration = durationSelect.value;
      console.log(selectedDuration);

      if (stockSymbols.length > 0) {
        const stockSymbolList = document.getElementById("stockSymbols");
        stockSymbolList.innerHTML = "";

        for (const stockSymbol of stockSymbols) {
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.classList.add("list-group-item-action");
          li.textContent = `Symbol: ${stockSymbol["1. symbol"]}, Name: ${stockSymbol["2. name"]}`;
          li.addEventListener("click", () => {
            // Removes the other stocks from being visible
            selectStockSymbol(
              stockSymbol["1. symbol"],
              stockSymbolList,
              selectedDuration
            );
          });
          stockSymbolList.appendChild(li);
        }
      } else {
        alert(`Sorry, we couldn't find a stock symbol for ${companyName}`);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Sorry, an error occurred while looking up stock symbols.");
    });
}


function selectStockSymbol(symbol, stockSymbolList, duration) {
	// Renders block which holds closing price and MA
	const content = document.getElementById('content')

	content.classList.remove("hidden");

	const selectedSymbol = document.createElement("li");
	selectedSymbol.classList.add("list-group-item");
	selectedSymbol.classList.add("active");
	selectedSymbol.textContent = `Selected Symbol: ${symbol}`;
	stockSymbolList.innerHTML = "";
	stockSymbolList.appendChild(selectedSymbol);
    // Selected symbol
    console.log(symbol)

}


export { findStockSymbol };
