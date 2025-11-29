// Site Data
const siteData = {
    team: [
        { name: "Ahmed Adel", role: "Creative Lead & Brand Designer", initials: "AA" },
        { name: "Ali El-Desouky", role: "Visual Identity Designer", initials: "AD" },
        { name: "Abdelhalim", role: "Social Media Designer", initials: "AH" },
        { name: "Abdelrahman", role: "Layout Designer", initials: "AR" }
    ],
    services: [
        { icon: "palette", title: "Brand & Identity", id: "brand", desc: "Logo systems, brand books, and stationery sets" },
        { icon: "instagram", title: "Social Media Growth", id: "social", desc: "Carousels, stories ads, and YouTube thumbnails" },
        { icon: "megaphone", title: "Marketing & Sales", id: "marketing", desc: "Flyers, brochures, and menu & pricing designs" },
        { icon: "layout", title: "UI & Digital Products", id: "ui", desc: "Landing pages, mobile UI screens, and ebook layouts" }
    ],
    portfolio: {
        brand: [
            { title: "Logo Kit Templates", img: "" },
            { title: "Brand Guidelines Book", img: "" },
            { title: "Business Stationery Set", img: "" }
        ],
        social: [
            { title: "Instagram Carousel Templates", img: "" },
            { title: "Story Ads Templates", img: "" },
            { title: "YouTube Thumbnail Pack", img: "" }
        ],
        marketing: [
            { title: "Promo Flyer Templates", img: "" },
            { title: "Tri-Fold Brochure Layout", img: "" },
            { title: "Menu & Price List Design", img: "" }
        ],
        ui: [
            { title: "Landing Page UI Layout", img: "" },
            { title: "Mobile App UI Screens", img: "" },
            { title: "Digital Ebook Layout", img: "" }
        ]
    }
};

function tailwindCss() {
    tailwind.config = { darkMode: 'class', theme: { extend: { 
      colors: {
        primary: '#0F172A',
        secondary: '#38BDF8',
        accent: '#7DD3FC',
        background: '#F8FAFC',
        surface: '#FFFFFF'
    },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
    } } };
    
    lucide.createIcons();
    AOS.init({ duration: 800, once: true })
 } tailwindCss()


// Initialize site with jQuery
$(document).ready(function () {
    // Load team members
    $.each(siteData.team, function (index, member) {
        $('#team-container').append(`
            <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-md border-2 border-secondary hover:!scale-105 duration-100 hover:shadow-lg flex items-center gap-6" data-aos="flip-left" data-aos-delay="${index * 150}">
                <div class="shrink-0 w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-2xl flex items-center justify-center text-white font-montserrat font-bold text-xl shadow-lg">
                    ${member.initials}
                </div>
                <div>
                    <h3 class="font-montserrat font-bold text-lg text-primary">${member.name}</h3>
                    <p class="text-gray-600 text-sm">${member.role}</p>
                </div>
            </div>
        `);
    });

    // Load services
    $.each(siteData.services, function (index, service) {
        $('#services-container').append(`
            <div class="bg-white rounded-2xl p-6 shadow-md border-l-4 border-secondary hover:shadow-lg hover:scale-105 transition-all" data-aos="zoom-out" data-aos-delay="${index * 80}">
                <div class="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <i data-lucide="${service.icon}" class="w-6 h-6 text-white"></i>
                </div>
                <h3 class="font-montserrat font-bold text-lg text-primary mb-2">${service.title}</h3>
                <p class="text-gray-600 text-sm">${service.desc}</p>
            </div>
        `);
    });

    // Load portfolio
    $.each(siteData.portfolio, function (category, items) {
        const categoryTitle = siteData.services.find(s => s.id === category).title;
        $('#portfolio-container').append(`
            <div class="mb-12">
                <h3 data-aos="fade-right" class="font-montserrat font-bold text-2xl text-primary border-l-4 border-secondary pl-4 mb-6">${categoryTitle}</h3>
                <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  ${items.map((item, i) => `
                    </li class="block">
                      <div data-aos="fade-up" data-aos-delay="400">
                        <img src="${item.img || "./imgs/default_img.jpeg"}" class="object-cover w-full hover:scale-105 hover:-translate-y-2 hover:shadow-2xl shadow-black/30 duration-300 rounded-xl shadow-sm h-fit max-h-72 overflow-hidden" alt="${item.title}"/>
                        <h4 class="font-montserrat font-semibold text-lg text-primary mt-2">${item.title}</h4>
                      </div>
                    </li>
                  `).join('')}
                </ul>
            </div>
        `);
    });

    AOS.refresh(); 
    lucide.createIcons();
});


function preventDevTools(e) {
    document.addEventListener('contextmenu', function(e) { e.preventDefault() }, false);
    document.onkeydown = function(e) {
        if (e.keyCode == 123) { return false } // F12 
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false }
        if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) { return false }
    };
} preventDevTools();
