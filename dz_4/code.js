
function fun() {
    let user_name = document.querySelector("#user_name").value;
    let url = document.querySelector("#url_field").value;
    let comm = document.querySelector("#comment_field").value;

    if (user_name.value == "" || url.value == "" || comm.value == "") 
        return;

    let t =
        `<div class="comment">
            <div class="user_info">
                <img src="${url}" alt="">
                <p>${user_name}</p>
            </div>
            <p class="comment">${comm}</p>
        </div>`;

    document.querySelector(".list_comments").innerHTML += t;
}
