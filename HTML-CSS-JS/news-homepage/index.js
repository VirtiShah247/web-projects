const mobileNavbar = (event) => {
    if (event.target.id == "hamburgerMenuImage" || event.target.id == "mobileNavbarLinks") {
        const elements = document.querySelectorAll(".webImageContainer,.buttonContainer,.rightComponent");
        Object.keys(elements).forEach((key) => elements[key].style.opacity = "0.5");
        document.getElementsByClassName("mainContainer")[0].style.backgroundColor = "rgb(163, 159, 159)";
        document.getElementById("mobileNavbarLinks").style.visibility = "visible";
        document.getElementById("mobileNavbarLinks").style.opacity = "1";
    }
    else {
        const elements = document.querySelectorAll(".webImageContainer,.buttonContainer,.rightComponent");
        Object.keys(elements).forEach((key) => elements[key].style.opacity = "1");
        document.getElementsByClassName("mainContainer")[0].style.backgroundColor = "hsl(36, 100%, 99%)";
        document.getElementById("mobileNavbarLinks").style.visibility = "hidden";
        document.getElementById("mobileNavbarLinks").style.opacity = "0";
    }
    document.getElementById("hamburgerCloseMenuImage").classList.remove("animate");
    setTimeout(() => {
        document.getElementById("hamburgerCloseMenuImage").classList.add("animate");
    }, 0);

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
document.getElementById("hamburgerMenuImage").addEventListener('click', mobileNavbar);
document.getElementById("hamburgerCloseMenuImage").addEventListener('click', mobileNavbar);

const url = window.location.href.split("#")[1];
if (url === '') {
    handleActiveTag('Home');
}
else {
    handleActiveTag(url);
}
