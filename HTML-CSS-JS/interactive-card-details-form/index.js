const displayCardDetails = () => {
    const card = document.card;
    const cardHolderName = card.cardHolderName.value;
    const cardNumber = card.cardNumber.value;
    const expMonth = card.expMonth.value;
    const expYear = card.expYear.value;
    const CVC = card.CVC.value;

    const imageCardHolderName = document.getElementById("imageCardHolderName");
    const imageCardNumber = document.getElementById("imageCardNumber");
    const imageExpDate = document.getElementById("imageExpDate");
    const imageCVC = document.getElementById("imageCVC");
    cardHolderName !== '' && (imageCardHolderName.innerHTML = cardHolderName);
    cardNumber !== '' && (imageCardNumber.innerHTML = cardNumber);
    expMonth !== '' && expYear !== '' && (imageExpDate.innerHTML = expMonth + "/" + expYear);
    CVC !== '' && (imageCVC.innerHTML = CVC);
}
const showErrorMessage = (id, inputName,message = null) => {
    document.getElementById(id).style.display = "block";
    document.forms["card"][inputName].style.borderColor = "hsl(0, 100%, 66%)";
    message !== null && (document.getElementById(id).innerHTML = message);
}
const hideErrorMessage = (id, inputName) => {
    document.getElementById(id).style.display = "none";
    document.forms["card"][inputName].style.borderColor = "hsl(270, 3%, 87%)";
} 
const handleCardValidation = () => {
    const cardNumberRegex = /^[0-9]{16}$/;
    const monthRegex = /^(0[1-9]|1[0-2])$/;
    const yearRegex = /^([0-9]{4}|[0-9]{2})$/;
    const cvcRegex = /^[0-9]{3,4}$/;

    const card = document.card;
    const cardHolderName = card.cardHolderName.value;
    const cardNumber = card.cardNumber.value;
    const expMonth = card.expMonth.value;
    const expYear = card.expYear.value;
    const CVC = card.CVC.value;
    let validated = true;
    if(cardHolderName == ''){
        showErrorMessage("cardHolderNameErrorMessage", "cardHolderName");
        validated = false;
    }
    else{
        hideErrorMessage("cardHolderNameErrorMessage", "cardHolderName");
    }
    if(cardNumber == ''){
        showErrorMessage("cardNumberErrorMessage", "cardNumber");
        validated = false;
    }
    else if(!cardNumberRegex.test(cardNumber)){
        message = "Wrong format, numbers only";
        showErrorMessage("cardNumberErrorMessage", "cardNumber", message);
        validated = false;
    }
    else{
        hideErrorMessage("cardNumberErrorMessage", "cardNumber");
    }
    if(expMonth == ''){
        showErrorMessage("expMonthErrorMessage", "expMonth");
        validated = false;
    }
    else if(!monthRegex.test(expMonth)){
        message = "Wrong month format";
        showErrorMessage("expMonthErrorMessage", "expMonth", message);
        validated = false;
    }
    else{
        hideErrorMessage("expMonthErrorMessage", "expMonth");
    }
    if(expYear == ''){
        showErrorMessage("expYearErrorMessage", "expYear");
        validated = false;
    }
    else if(!yearRegex.test(expYear)){
        showErrorMessage("expYearErrorMessage", "expYear", message);
        validated = false;
    }
    else{
        hideErrorMessage("expYearErrorMessage", "expYear");
    }
    if(CVC == ''){
        showErrorMessage("CVCErrorMessage", "CVC");
        validated = false;
    }
    else if(!cvcRegex.test(CVC)){
        message = "3 or 4 digit number only";
        showErrorMessage("CVCErrorMessage", "CVC", message);
        validated = false;
    }
    else{
        hideErrorMessage("CVCErrorMessage", "CVC");
    }
    if(!validated){
        return false;
    }
    return true;
}
const submitCardDetails = () => {
    event.preventDefault();
    displayCardDetails();
    const state =  handleCardValidation();
    if(state){
        document.card.style.display = "none";
        document.getElementById("completeContainer").style.display = "flex";
    }
    return state;
}
const handleContinue = () => {
    console.log("continue");
    document.card.style.display = "grid";
    document.getElementById("completeContainer").style.display = "none";
    document.card.cardHolderName.value = null;
    document.card.cardNumber.value = null;
    document.card.expMonth.value = null;
    document.card.expYear.value = null;
    document.card.CVC.value = null;    
}
document.querySelector("#completeContainer .buttonComponent").addEventListener('click', handleContinue);