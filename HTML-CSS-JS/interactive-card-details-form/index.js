const card = document.card;
const cardHolderName = card.cardHolderName;
const cardNumber = card.cardNumber;
const expMonth = card.expMonth;
const expYear = card.expYear;
const CVC = card.CVC;

const handleCardNumberChange = () =>{
    cardNumber.value = cardNumber.value.match(/[0-9]{4}/g).join(" ");
}

const displayCardDetails = () => {
    const imageCardHolderName = document.getElementById("imageCardHolderName");
    const imageCardNumber = document.getElementById("imageCardNumber");
    const imageExpDate = document.getElementById("imageExpDate");
    const imageCVC = document.getElementById("imageCVC");
    // console.log(cardNumber.value.split(""));
    imageCardHolderName.innerHTML = cardHolderName.value || "Jane Appleseed";
    imageCardNumber.innerHTML = cardNumber.value || "0000 0000 0000 0000";
    imageExpDate.innerHTML = (expMonth.value && expYear.value) ? (expMonth.value + "/" + expYear.value) : "00/00";
    imageCVC.innerHTML = CVC.value || "000";
}

const errorMessage = {
    cardNumber: "Wrong format, numbers only",
    expMonth: "Wrong month format",
    expYear: "Wrong year format",
    CVC: "3 or 4 digit number only"
}
const validationRegex = {
    cardHolderName: /.+/,
    cardNumber: /((\d{4}[\s-]?){3}\d{4})/,
    expMonth: /^(0[1-9]|1[0-2])$/,
    expYear: /^([0-9]{4}|[0-9]{2})$/,
    CVC: /^[0-9]{3,4}$/
}

const showErrorMessage = (inputName, message = null) => {
    document.getElementById(inputName + "ErrorMessage").style.display = "flex";
    document.forms["card"][inputName].style.borderColor = "hsl(0, 100%, 66%)";
    message !== null && (document.getElementById(inputName + "ErrorMessage").innerHTML = message);
}
const hideErrorMessage = (inputName) => {
    document.getElementById(inputName + "ErrorMessage").style.display = "none";
    document.forms["card"][inputName].style.borderColor = "hsl(270, 3%, 87%)";
}
const validateCard = (field, regex) => {
    // console.log(field, regex, field.name + "ErrorMessage", field.value);
    if(field.value == ""){
        showErrorMessage(field.name);
        return false;
    }
    else if(!regex.test(field.value)){
        showErrorMessage(field.name, errorMessage[field.name]);
        return false;
    }
    else{
        hideErrorMessage(field.name);
    }
    return true;
} 
const handleFormValidation = () => {
    let isValid = true;
    isValid &= validateCard(cardHolderName, validationRegex.cardHolderName);
    isValid &= validateCard(cardNumber, validationRegex.cardNumber);
    isValid &= validateCard(expMonth, validationRegex.expMonth);
    isValid &= validateCard(expYear, validationRegex.expYear);
    isValid &= validateCard(CVC, validationRegex.CVC);
    return isValid;   
}
const submitCardDetails = () => {
    event.preventDefault();
    displayCardDetails();
    const state =  handleFormValidation();
    if(state){
        card.style.display = "none";
        document.getElementById("completeContainer").style.display = "flex";
    }
    return state;
}
const handleContinue = () => {
    card.style.display = "grid";
    document.getElementById("completeContainer").style.display = "none";
    cardHolderName.value = "";
    cardNumber.value = "";
    expMonth.value = "";
    expYear.value = "";
    CVC.value = "";
    displayCardDetails();    
}
document.querySelector("#completeContainer .buttonComponent").addEventListener("click", handleContinue);
card.addEventListener("submit", submitCardDetails);
cardNumber.addEventListener("change", handleCardNumberChange);