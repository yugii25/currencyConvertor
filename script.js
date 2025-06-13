// const BASE_URL = "https://api.frankfurter.app/latest?";
// const dropdown = document.querySelectorAll(".dropdown select");
// const API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";



// const btn = document.querySelector('button');
// btn.addEventListener("click",(evt)=>{
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal= amount.value;
//     if(amtVal === "" || amtVal < 1){
//         amtVal = 1;
//         amount.value = '1';
//     }

//     const URL = `{BASE_URL}from=${fromCurr}&to=${toCurr}`; 
// });
const dropdown = document.querySelectorAll(".dropdown select");
const API_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const btn = document.querySelector('button');

async function getExchangeRate(from, to) {
  from = from.toLowerCase();
  to = to.toLowerCase();
  
  try {
    const response = await fetch(`${API_URL}/${from}.json`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data[from][to]; // Returns the exchange rate
    
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    return null;
  }
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  
  const amount = document.querySelector('input').value;
  const fromCurr = document.querySelector('[name="from"]').value;
  const toCurr = document.querySelector('[name="to"]').value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  const rate = await getExchangeRate(fromCurr, toCurr);
  
  if (rate) {
    const result = (amount * rate).toFixed(2);
    document.querySelector('.msg').innerText = 
      `${amount} ${fromCurr.toUpperCase()} = ${result} ${toCurr.toUpperCase()}`;
  } else {
    document.querySelector('.msg').innerText = 
      "Error fetching rates. Try again later.";
  }
});

// Rest of your existing code for dropdowns and flags...


for (let select of dropdown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }  


    select.append(newOption);
  }
  select.addEventListener('change',(evt)=>{
    updateFlag(evt.target);
  })
}



const updateFlag = (element) =>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
   let img = element.parentElement.querySelector('img');
   img.src = newSrc;

}

