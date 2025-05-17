gsap.registerPlugin(ScrollTrigger);
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const frames = {
    currentIndex: 0,
    maxIndex: 204,
};

let imgLoaded = 0
const images = []
function preloadImg() {
    for (let i = 0; i <= frames.maxIndex; i++) {
        const imgUrl = `./laptop/frame_${i.toString().padStart(4, "0")}.jpeg`;
console.log(imgUrl);

        const img = new Image();
        img.src = imgUrl
        img.onload = () => {
            imgLoaded++;
            if (imgLoaded >= frames.maxIndex) {
                
                loadImage(frames.currentIndex)
                animation()

            }
        }
        images.push(img)

    }
}

function loadImage(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const pic = images[index];
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const scaleX = canvas.width / pic.width
        const scaleY = canvas.height / pic.height
        const scale = Math.max(scaleX, scaleY)
        const newWidth = pic.width * scale;
        const newHeight = pic.height * scale
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(pic,offsetX,offsetY,newWidth,newHeight)
        frames.currentIndex =index;
    }
}
function animation (){
    var tl = gsap.timeline({
        scrollTrigger :{
            trigger: ".parent",
            start: "top top",
            scrub: 1,
            end: "bottom bottom",
            markers:true
        }
    })
    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function(){
            loadImage(Math.floor(frames.currentIndex))
        }
           
    })
}


preloadImg()