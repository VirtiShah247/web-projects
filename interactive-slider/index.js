const slider = document.getElementById("slider");
let startImage = 0, n = 0;
let cycleCount;
const data = [
    {
        id: 'image1',
        url: './images/image1.jpg',
        alt: 'image1'
    },
    {
        id: 'image2',
        url: './images/image2.jpg',
        alt: 'image2'
    },
    {
        id: 'image3',
        url: './images/image3.jpg',
        alt: 'image3'
    },
    {
        id: 'image4',
        url: './images/image4.jpg',
        alt: 'image4'
    },
    {
        id: 'image5',
        url: './images/image5.jpg',
        alt: 'image5'
    },
    {
        id: 'image6',
        url: './images/image6.jpg',
        alt: 'image6'
    },
    {
        id: 'image7',
        url: './images/image7.jpg',
        alt: 'image7'
    },
    {
        id: 'image8',
        url: './images/image8.jpg',
        alt: 'image8'
    }
]
const radioBtn = (count) => {
    document.getElementById("radiobutton").innerHTML = "";
    for (let i = 0; i < count; i++) {
        document.getElementById("radiobutton").innerHTML += `
            <input type="radio" name="sliderRadio" id="sliderRadio${i + 1}"
                onclick="handleStartImageOnRadioButton(this)" /> &nbsp;
        `;
    }
}
const handleSubmit = () => {
    event.preventDefault();
    const sliderCount = document.forms["sliderForm"]["sliderCount"].value;
    if (sliderCount === "0") {
        slider.innerHTML = "Pls. Enter a number between 0 and 8";
        return false;
    }
    n = Number(sliderCount);
    slider.innerHTML = `
    <div id="sliderContent">
        <button id="previous">&lt;</button>
        <div id="sliderImages">

        </div>
        <button id="next">&gt;</button>
        </div>
    <div id="radiobutton">
    </div>
    `
    cycleCount = 0;
    radioBtn(Number(sliderCount));
    changeImage();
    if(startImage === 0){
        document.querySelector("#previous").setAttribute("disabled",true);
    }
    else{
        document.querySelector("#previous").removeAttribute("disabled");
    }
    document.querySelector("#previous").addEventListener('click', handlePreviousImage);
    document.querySelector("#next").addEventListener('click', handleNextImage);
    document.forms["sliderForm"]["sliderCount"].value = '';
    return true;
}
const handlePreviousImage = () => {
    // startImage -= 3;
    startImage = (n + (startImage - 1)) % n;
    startImage === 0 && (cycleCount += 1);
    changeImage();
}
const handleNextImage = () => {
    // startImage += 3;
    startImage = (startImage + 1) % n;
    startImage === 0 && (cycleCount += 1);
    if(startImage === 0 && cycleCount === 0){
        document.querySelector("#previous").setAttribute("disabled",true);
    }
    else{
        document.querySelector("#previous").removeAttribute("disabled");
    }
    // document.getElementById("sliderImages").innerHTML = `
    //     <img src=${data[startImage - 1].url} alt=${data[startImage - 1].alt} id=${data[startImage - 1].id} />
    //     `;

    // if (n - startImage === 0) {
    //     startImage = 0;
    // }
    // document.getElementById("sliderImages").innerHTML += `
    //     <img src=${data[startImage].url} alt=${data[startImage].alt} id=${data[startImage].id} />
    //     `;
    // if (n - startImage === 1) {
    //     startImage = 0;
    //     document.getElementById("sliderImages").innerHTML += `
    // <img src=${data[startImage].url} alt=${data[startImage + 1].alt} id=${data[startImage + 1].id} />
    // `;
    // }
    // document.getElementById("sliderImages").innerHTML += `
    // <img src=${data[startImage + 1].url} alt=${data[startImage + 1].alt} id=${data[startImage + 1].id} />
    // `;
    changeImage();
}
const changeImage = () => {
    const width = window.innerWidth;
    if (width < "768") {
        slidesToShow = 1;
    }
    else if (width >= "768" && width < "992") {
        slidesToShow = 2;
    }
    else if (width >= "992" && width < "1200") {
        slidesToShow = 3;
    }
    else if (width >= "1200") {
        slidesToShow = 4;
    }
    document.getElementById("sliderImages").innerHTML = '';
    for (let imageCount = 0; imageCount < slidesToShow; imageCount++) {
        data[(startImage + imageCount) % n] !== undefined && (document.getElementById("sliderImages").innerHTML += `
        <img src=${data[(startImage + imageCount) % n].url} alt=${data[(startImage + imageCount) % n].alt} id=${data[(startImage + imageCount) % n].id} />
        `)
    }
    document.querySelector(`#sliderRadio${startImage+1}`).checked = true;
    console.log(cycleCount);
}
const handleStartImageOnRadioButton = (ele) => {
    startImage = ele.id.split('sliderRadio')[1] - 1;
    changeImage();
}
window.onresize = changeImage;


