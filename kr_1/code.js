let btn_send = document.querySelector("#send");

btn_send.addEventListener("click", sendOnClick);

let result = document.querySelector(".result");


function sendOnClick() {
    let name = document.querySelector("#name").value;
    let card_number = document.querySelector("#card_number").value;
    let expiration = document.querySelector("#expiration").value;
    let security_code = document.querySelector("#security_code").value;
    
    if (name.length == 0 || card_number.length == 0 || expiration.length == 0 || security_code.length == 0){
        result.innerHTML = `<h1>All fields must be filled in</h1>`
        return;
    }

    if (!validateCardNum()){
        result.innerHTML = `<h1>Wrong CardNum</h1>`
        return;
    }
    if (!validateName){
        result.innerHTML = `<h1>Wrong Name</h1>`
        return;
    }
    if (!validateCVC){
        result.innerHTML = `<h1>Wrong CVC</h1>`
        return;
    }
    
    console.log("Чопик")
    let t = `
        <h2>Name ${name}</h2>
        <h2>card_number ${card_number}</h2>
        <h2>expiration ${expiration}</h2>
        <h2>security_code ${security_code}</h2>
        `;

        result.innerHTML = t;
}

function validateCardNum(text){
    return true;
}

function validateName(text){
    return true;
}

function validateCVC(text){
    return true;
}

function validateDate(text){
    return true;
}