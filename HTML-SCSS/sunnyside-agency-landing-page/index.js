const menu = document.querySelector(".menu");
const removeMobileMenu = () => {
    menu.classList.remove("menu--mobile");
    if(window.screen.width > 576){
        menu.style.display = "flex"; 
    }
    else{
        menu.style.display = "none"; 
    }
}
const handleMenuClick = () => {
    const menuMobile = menu.classList.value.split(" ")[1];
    if(menuMobile === undefined){
        menu.classList.add("menu--mobile");
        menu.style.display = "flex";
    }
    else{
        menu.classList.remove("menu--mobile");
        menu.style.display = "none"; 
    }
}
document.querySelector(".hamburger__image").addEventListener("click", handleMenuClick);
window.addEventListener("resize", removeMobileMenu);