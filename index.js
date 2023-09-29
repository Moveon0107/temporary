window.onload = function () {
    pageLoad('home');
    menuStatus = "close";
    click = 0;
}
function menu() {
    if(click == 0){
    if(menuStatus=="open"){
        document.getElementById("menu").classList.remove("menu-open");
        document.getElementById("menu-background").classList.remove("menu-open");

menuTransform = setTimeout(() => {
document.getElementById("menu-background").style = 'transform: translateY(100%);';
}, 200);
        menuStatus = "close";
    } else {
       //clearTimeout(menuTransform);
document.getElementById("menu").classList.add("menu-open");
        document.getElementById("menu-background").classList.add("menu-open");

document.getElementById("menu-background").style = 'transform: translateY(0px);';
        menuStatus = "open";
    }
    }
}
function pageLoad(page) {
    document.getElementById("home").classList.remove("active");
    document.getElementById("search").classList.remove("active");
    document.getElementById("event").classList.remove("active");
    document.getElementById("profile").classList.remove("active");
    document.getElementById(page).classList.add("active");
    if (page == "profile") {
        xhr = new XMLHttpRequest();
        xhr.open('GET', './page/profile/profile.html', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.querySelector("#wrapper").innerHTML = xhr.responseText;
            }
        };

        xhr.send();
    }

}