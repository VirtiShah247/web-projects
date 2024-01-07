const bodyContent = document.getElementsByTagName("body")[0].innerHTML;
const displayNavbar = () => {
    let mobileNavbarLinks = `
    <div class="mobileNavbarLinks">
        <div>
            <img src="./assets/images/icon-menu-close.svg" alt="close-menu" id="hamburgerCloseMenuImage"/>
        </div>
        <div>
            <a href="#home" class="mobileNavbarLinkTag">Home</a>
            <a href="#new" class="mobileNavbarLinkTag">New</a>
            <a href="#popular" class="mobileNavbarLinkTag">Popular</a>
            <a href="#trending" class="mobileNavbarLinkTag">Trending</a>
            <a href="#categories" class="mobileNavbarLinkTag">Categories</a>
        <div>
    </div>
   `
    // document.getElementsByClassName("parentContainer")[0].innerHTML = "";
    document.getElementsByClassName("mainContainer")[0].style.backgroundColor = "rgb(163, 159, 159)";
    document.getElementsByClassName("webImageContainer")[0].style.opacity = "0.5";
    document.getElementsByClassName("buttonContainer")[0].style.opacity = "0.5";
    document.getElementsByClassName("rightComponent")[0].style.opacity = "0.5";
    document.getElementsByTagName("body")[0].innerHTML += mobileNavbarLinks;
    document.getElementsByClassName("mainContainer")[0].addEventListener('click', hideNavbar);
}
const hideNavbar = () => {
    document.getElementsByTagName("body")[0].innerHTML = bodyContent;
    document.getElementById("hamburgerMenuImage").addEventListener('click',displayNavbar);
}
document.addEventListener('click', function (event) {
    if(event.target.id === 'hamburgerCloseMenuImage' || event.target.className === 'mobileNavbarLinkTag'){
        hideNavbar();
    }
})
document.getElementById("hamburgerMenuImage").addEventListener('click',displayNavbar);