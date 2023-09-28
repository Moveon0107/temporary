window.onload = function () {
    pageLoad('home');
}
function pageLoad(page) {
    document.getElementById("home").classList.remove("active");
    document.getElementById("search").classList.remove("active");
    document.getElementById("event").classList.remove("active");
    document.getElementById("profile").classList.remove("active");
    document.getElementById(page).classList.add("active");
    if (page == "profile") {
        xhr = new XMLHttpRequest();
        xhr.open('GET', './page/profile.html', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.querySelector("#wrapper").innerHTML = xhr.responseText;
            }
        };

        xhr.send();
    }

}