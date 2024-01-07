const mobileNavbar = (event) => {
    if (event.target.id == "hamburgerMenuImage" || event.target.id == "mobileNavbarLinks") {
        const elements = document.querySelectorAll(".webImageContainer,.buttonContainer,.rightComponent");
        Object.keys(elements).forEach((key) => elements[key].style.opacity = "0.5");
        document.getElementsByClassName("mainContainer")[0].style.backgroundColor = "rgb(163, 159, 159)";
        document.getElementById("mobileNavbarLinks").style.display = "block";
    }
    else {
        const elements = document.querySelectorAll(".webImageContainer,.buttonContainer,.rightComponent");
        Object.keys(elements).forEach((key) => elements[key].style.opacity = "1");
        document.getElementsByClassName("mainContainer")[0].style.backgroundColor = "hsl(36, 100%, 99%)";
        document.getElementById("mobileNavbarLinks").style.display = 'none';
    }

}
const handleActiveTag = (activeTag) => {
    // const activeTag = event.target.id;

    // ['Home', 'New', 'Popular', 'Trending', 'Categories'].forEach((tag) => {

    // })
    for (let tag of ['Home', 'New', 'Popular', 'Trending', 'Categories']) {
        if (tag === activeTag) {
            document.getElementById(activeTag).classList.add("active");
        }
        else {
            document.getElementById(tag).classList.remove("active");
        }
    }
}
document.getElementsByClassName("mainContainer")[0].addEventListener('click', mobileNavbar);
document.getElementById("hamburgerMenuImage").onclick = mobileNavbar;
document.getElementById("hamburgerCloseMenuImage").onclick = mobileNavbar;

const url = window.location.href.split("#")[1];
if (url === '') {
    handleActiveTag('Home');
}
else {
    handleActiveTag(url);
}
