const activeAmountData = [
    {
      "day": "mon",
      "amount": 17.45
    },
    {
      "day": "tue",
      "amount": 34.91
    },
    {
      "day": "wed",
      "amount": 52.36
    },
    {
      "day": "thu",
      "amount": 31.07
    },
    {
      "day": "fri",
      "amount": 23.39
    },
    {
      "day": "sat",
      "amount": 43.28
    },
    {
      "day": "sun",
      "amount": 25.48
    }
  ]
console.log(activeAmountData);
const handleMouseOver = (event) => {
    const activeAmountElement = document.getElementById(event.target.id);
    const activeAmount = activeAmountData.find(data => data.day === event.target.id).amount;
    activeAmountElement.previousElementSibling.innerHTML = "$" + activeAmount;
    activeAmountElement.previousElementSibling.style.display = "block";
    activeAmountElement.style.opacity = "0.7";
}
const handleMouseOut = (event) => {
    const activeAmountElement = document.getElementById(event.target.id);
    activeAmountElement.previousElementSibling.innerHTML = "";
    activeAmountElement.previousElementSibling.style.display = "none";
    activeAmountElement.style.opacity = "1";
}
const dayBar = document.querySelectorAll("#mon, #tue, #wed, #thu, #fri, #sat, #sun");
dayBar.forEach((day) => day.addEventListener("mouseover", (day)=>handleMouseOver(day)))
dayBar.forEach((day) => day.addEventListener("mouseout", (day)=>handleMouseOut(day)))