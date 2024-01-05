const bodyContent = document.getElementsByClassName("parentContainer")[0].innerHTML;
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
    document.getElementsByClassName("parentContainer")[0].innerHTML = "";
    document.getElementsByClassName("parentContainer")[0].innerHTML += mobileNavbarLinks;
    document.getElementById("hamburgerMenuImage").addEventListener('click',displayNavbar);
}
const hideNavbar = () => {
    document.getElementsByClassName("parentContainer")[0].innerHTML = bodyContent;
    document.getElementById("hamburgerMenuImage").addEventListener('click',displayNavbar);
}
document.addEventListener('click', function (event) {
    if(event.target.id === 'hamburgerCloseMenuImage'){
        hideNavbar();
    }
})
document.getElementById("hamburgerMenuImage").addEventListener('click',displayNavbar);