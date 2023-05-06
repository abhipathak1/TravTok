const carousel = document.querySelector(".carousel"),
    arrowIcons = document.querySelectorAll(".wrapper i"),
    firstImgWidth = carousel.querySelector("img").clientWidth + 14; // getting first img width & adding 14 margin value

let isDragging = false,
    startX,
    scrollLeft;

// showing and hiding prev/next icon according to carousel scroll left value
const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

// scrolling images/carousel to left according to mouse pointer
const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const diff = startX - x;
    carousel.scrollLeft = scrollLeft + diff;
    showHideIcons();
}

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add("dragging");
});

carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
});

document.addEventListener("touchend", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
});

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

// if there is no image left to scroll then return from here
const autoSlide = () => {
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    const valDifference = firstImgWidth - Math.abs(startX - (startX - scrollLeft + carousel.scrollLeft));
    carousel.scrollLeft += (carousel.scrollLeft > scrollLeft) ? (startX - (startX - scrollLeft + carousel.scrollLeft) > firstImgWidth / 3 ? valDifference : -startX + startX - scrollLeft + carousel.scrollLeft) : (startX - (startX - scrollLeft + carousel.scrollLeft) > firstImgWidth / 3 ? -valDifference : startX - startX + scrollLeft - carousel.scrollLeft);

    setTimeout(() => autoSlide(), 3000);
};

setTimeout(() => autoSlide(), 3000);
