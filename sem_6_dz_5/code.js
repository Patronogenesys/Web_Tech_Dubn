
function fun() {
    let user_name = document.querySelector("#user_name").value;
    let url = document.querySelector("#url_field").value;
    let comm = document.querySelector("#comment_field").value;

    if (user_name.length == 0 || url.length == 0 || comm.length == 0) 
        return;

    comm = comm.replace("instagram", "***").replace("facebook", "***")

    let t =
        `<div class="comment">
            <div class="user_info">
                <img src="${url}" alt="">
                <span>${user_name}</span>
            </div>
            <p class="comment_text">${comm}</p>
        </div>`;

    document.querySelector(".list_comments").innerHTML += t;
}
