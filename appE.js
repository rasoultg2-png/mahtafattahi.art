const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
if(menuToggle && mobileMenu){
    menuToggle.addEventListener("click", ()=>{
        const isOpen = mobileMenu.classList.toggle("open");
        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );
    });
    mobileMenu
    .querySelectorAll("a").forEach(link =>{
        link.addEventListener("click" , ()=>{
            mobileMenu.classList.remove("open");
            menuToggle.setAttribute(
                "aria-expanded", "false"
            );
        });
    });
}
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");
filters.forEach(filter =>{
    filter.addEventListener("click" , ()=>{
        filters.forEach(item => {
            item.classList.remove("active")
        });
        filter.classList.add("active");
        const selected = filter.dataset.filter;
        cards.forEach(card =>{
            const category = card.dataset.category;
            const shouldShow = 
            selected === "all" ||
            selected === category;
            if(shouldShow){
                card.style.display = "";
                requestAnimationFrame(()=>{
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";

                });
            } else{
                card.style.opacity = "0";
                card.style.transform = "translateY(10px)";
                setTimeout(() =>{
                    card.style.display = "none";
                }, 250);
                 }
        });
    });
});
/* =========================================
   IMAGE LIGHTBOX
========================================= */

const lightbox =
    document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lightbox-image");

const lightboxClose =
    document.querySelector(".lightbox-close");

const expandButtons =
    document.querySelectorAll(".image-expand");


expandButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();


        /* پیدا کردن عکس همان کارت */

        const thumbnail =
            this
                .closest(".work-image")
                .querySelector("img");


        /* مسیر عکس اصلی */

        const fullImage =
            this.getAttribute("data-full");


        /* قرار دادن عکس در Lightbox */

        lightboxImage.src =
            fullImage || thumbnail.src;


        lightboxImage.alt =
            thumbnail.alt || "";


        /* باز کردن Lightbox */

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        /* جلوگیری از اسکرول صفحه */

        document.body.style.overflow =
            "hidden";

    });

});


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";


    setTimeout(() => {

        lightboxImage.src = "";

    }, 300);

}


/* دکمه × */
if (lightbox && lightboxClose){
    lightboxClose.addEventListener("click" , closeLightbox);
}


/* کلیک روی فضای بیرون عکس */

lightbox.addEventListener(
    "click",
    function(event) {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* کلید Escape */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {

            closeLightbox();

        }

    }
);
const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");
filterButtons.forEach(button =>{
    button.addEventListener("click" , () =>{
        const filter = button.dataset.filter;
        filterButtons.forEach(btn =>{
            btn.classList.remove("active");
        });
        button.classList.add("active");
    });
    button.addEventListener("click" , ()=>{
        button.classList.add("active")
    })
    workCards.forEach(card =>{
        const category = card.dataset.category;
        const shouldShow = filter === "all" || category === filter;
        if(shouldShow){
            card.classList.remove("filter-hide");
            setTimeout(() =>{
                card.classList.remove(".filter-show");
            },600);
        } else{
            card.classList.remove(".filter-show");
            card.classList.add("filter-hide");
        }
    });
});
const mainSite = document.querySelector("#main-site");
const articlesPage = document.querySelector("#articles-page");
const ideasPage = document.querySelector("#ideas-page");
const pageLinks = document.querySelectorAll(".nav-submenu a[data-page]");
console.log(pageLinks)
const backButtons = document.querySelectorAll(".back-to-site");
function openPage(pageName){
    mainSite.classList.add("site-hidden");
    articlesPage.classList.remove("active");
    ideasPage.classList.remove("active");
    if ( pageName === "articles"){
        articlesPage.classList.add("active");
    }
    if (pageName === "ideas"){
        ideasPage.classList.add("active");
    }
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}
pageLinks.forEach(link =>{
    link.addEventListener("click", event =>{
        event.preventDefault();
        const pageName = link.dataset.page;
        openPage(pageName);
    }) ;
});
backButtons.forEach(button =>{
    button.addEventListener("click" , () =>{
        articlesPage.classList.remove("active");
        ideasPage.classList.remove("active");
        mainSite.classList.remove("site-hidden");
        window.scrollTo({
            top:0 , behavior:"smooth"
        });
    });
});
const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
dropdownToggle.addEventListener("click", event =>{
    if(window.innerWidth <= 700){
        event.preventDefault();
        dropdownToggle
        .parentElement
        .classList
        .toggle("open");
    }
});
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link =>{
    link.addEventListener("click" , function(event){
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;
        mainSite.classList.remove("site-hidden");
        articlesPage.classList.remove("active");
        ideasPage.classList.remove("active");
        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
})
/* =========================================
   ABOUT SCROLL TEXT
========================================= */

const aboutSection = document.querySelector(".about-section");
const aboutText1 = document.querySelector(".about-bg-text-1");
const aboutText2 = document.querySelector(".about-bg-text-2");

function animateAboutBackground(){

    if(!aboutSection || !aboutText1 || !aboutText2){
        return;
    }

    const rect = aboutSection.getBoundingClientRect();
    const vh = window.innerHeight;

    const progress =
        (vh - rect.top) / (vh + rect.height);

    const p = Math.max(0, Math.min(1, progress));

    /* ABOUT US */

    const y1 = 180 - (p * 260);

    aboutText1.style.transform =
        `translate3d(0, ${y1}px, 0)`;

    aboutText1.style.opacity =
        Math.min(0.08, p * 0.12);


    /* WE TURN IDEAS INTO IMAGES */

    const y2 = 220 - (p * 280);

    aboutText2.style.transform =
        `translate3d(0, ${y2}px, 0)`;

    aboutText2.style.opacity =
        Math.min(0.08, Math.max(0, (p - 0.15) * 0.12));
}


window.addEventListener(
    "scroll",
    animateAboutBackground,
    { passive: true }
);

window.addEventListener(
    "load",
    animateAboutBackground
);
/* =========================================
   TYPEWRITER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const elements =
        document.querySelectorAll(".typewriter");

    elements.forEach((element, index) => {

        const originalText =
            element.textContent.trim();

        element.textContent = "";

        let i = 0;

        function type(){

            if(i < originalText.length){

                element.textContent +=
                    originalText.charAt(i);

                i++;

                setTimeout(type, 45);

            }
        }

        setTimeout(type, index * 500);

    });

});
const aboutHeading = document.querySelector(".about-heading");
function revealAboutHeading() {
    if (!aboutHeading) return;

    const rect = aboutHeading.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.85) {
        aboutHeading.classList.add("show");
    }
}

window.addEventListener("scroll", revealAboutHeading);
window.addEventListener("load", revealAboutHeading);
const GalleryHeader = document.querySelector(".section-header");
const Gallerytext = document.querySelector(".eyebrow");
function revealGallerytext(){
    if (!GalleryHeader || !Gallerytext) return;
    const position = GalleryHeader.getBoundingClientRect();
    if (position.top< window.innerHeight * .85){
        Gallerytext.classList.add("show");
    }
}
window.addEventListener("scroll" , revealGallerytext);
window.addEventListener("load", revealGallerytext)
