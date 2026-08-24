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
