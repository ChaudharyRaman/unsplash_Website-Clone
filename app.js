const access_key = 'xiGhjaUo8usOem_o0gKwjxfvr6BWP1ou_sFAg0hkKBI';

let searchParam = location.search.split('=').pop();

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;

const gallery = document.querySelector('.gallery');

let allImages;  //store all images data..
let currentImage = 0;

const getImage = ()=>{
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
    });
};
const searchImage = ()=>{
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        makeImages(allImages);
    });
};

const makeImages = (data)=>{
    console.log(data);
    data.forEach((item,index) => {
        // console.log(item);

        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';
        // console.log(img)
        // gallery.appendChild(img);
        gallery.appendChild(img);

        // POPUP Image
        img.addEventListener('click',() => {
            currentImage = index;
            showPopup(item);
        });
    });
}

const showPopup = (item)=>{
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.large-img');

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    console.log(image)
    // console.log(image.src);
    image.src = item.urls.regular;
    // image.setAttribute('src',item.urls.regular);
    closeBtn.addEventListener('click',() =>{
        popup.classList.add('hide');
    })
};

if(searchParam == ''){

    getImage();
}else {
    searchImage();
}

// document.querySelector('.search-btn').addEventListener('click',getImage);


// Control BUTTONS....

const preBtn = document.querySelector('.pre-btn')
const nxtBtn = document.querySelector('.nxt-btn')

preBtn.addEventListener('click',()=>{
    if(currentImage>0){
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})
// console.log(allImages.length);
nxtBtn.addEventListener('click',()=>{
    if(allImages[currentImage+1]!=null){
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})


