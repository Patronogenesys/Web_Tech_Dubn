
function input_button_onClick() {
    if (document.querySelector('input[name="gender"]:checked') == null) {
        let t = `<p>Заполните все поля</p>`;
        document.querySelectorAll('input[name="gender"]').forEach(el => el.classList.add("mistake"));
        document.querySelector(".info").innerHTML = t;
        return;
    }
    document.querySelectorAll('input[name="gender"]').forEach(el => el.classList.remove("mistake"));

    let f_name = document.querySelector("#f_name");
    let s_name = document.querySelector("#s_name");
    let speciality = document.querySelector("#speciality");
    let gender = document.querySelector('input[name="gender"]:checked');
    let country = document.querySelector("#country");
    let email = document.querySelector("#email");
    let phone = document.querySelector("#phone");
    let address = document.querySelector("#address");

    let fields = [f_name, s_name, speciality, gender, country, email, phone, address];

    let mistake_el = verify(f_name, s_name, speciality, gender, country, email, phone, address);

    let t = `
    <p>f_name = ${f_name.value}</p>
    <p>s_name = ${s_name.value}</p>
    <p>speciality = ${speciality.value}</p>
    <p>gender = ${gender.value}</p>
    <p>country = ${country.value}</p>
    <p>email = ${email.value}</p>
    <p>phone = ${phone.value}</p>
    <p>address = ${address.value}</p>
    `;

    fields.forEach(element => {
        element.classList.remove("mistake");
    });

    if (mistake_el != null) {
        mistake_el.classList.add("mistake");
        t = `<p>mistake in field</p>`
    }

    document.querySelector(".info").innerHTML = t;
}


function verify(f_name, s_name, speciality, gender, country, email, phone, address) {
    if (!/^[a-zA-Z]{2,}$/.test(f_name.value)) return f_name;
    if (!/^[a-zA-Z]{4,}$/.test(s_name.value)) return s_name;
    if (!/^(\w|\+|-|\.)+@(\w|\+|-)+\.(\w|\+|-)+$/.test(email.value)) return email;
    if (!/^(8|(\+7))\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone.value)) return phone;
    if (!/^[a-zA-Z]+$/.test(address.value)) return address;

    return null;
}

window.onload = () => {
    var minute = 1;
    var sec = 0;

    let timerId = setInterval(() => {
        document.getElementById("timer").innerHTML = minute + ":" + sec;
        sec--;
        if (sec <= 0) {
            if (sec <= 0) {
                sec = minute <= 0 ? 0 : 60;
            }
            minute--;
            if (minute <= 0) {
                minute = 0;
            }
        }
    }, 1000);

    setTimeout(() => { clearInterval(timerId); alert('time is out'); location.reload() }, 63000);
} 