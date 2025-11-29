// Site Data
const siteData = {
    team: [
        { name: "Ahmed Adel", role: "Creative Lead & Brand Designer", initials: "AA" },
        { name: "Ali El-Desouky", role: "Visual Identity Designer", initials: "AE" },
        { name: "Abdelhalim", role: "Social Media Designer", initials: "AH" },
        { name: "Abdelrahman", role: "Layout Designer", initials: "AR" }
    ],
    services: [
        { icon: "palette", title: "Brand Identity", id: "Brand", desc: "Complete brand kits with logos and style guides" },
        { icon: "instagram", title: "Social Media", id: "social", desc: "Posts, stories, and cover designs for all platforms" },
        { icon: "megaphone", title: "Marketing", id:"marketing", desc: "Flyers, brochures, and promotional materials" },
    ],
    portfolio: {
        Brand: [
            { title: "Instagram Pack", rating: 4.9, desc: "50+ professional Instagram templates", img: "" },
            { title: "Facebook Stories", rating: 4.7, desc: "Engaging story templates", img: "" },
            { title: "LinkedIn Covers", rating: 4.8, desc: "Professional cover designs", img: "" }
        ],
        social: [
            { title: "Instagram Pack", rating: 4.9, desc: "50+ professional Instagram templates", img: "" },
            { title: "Facebook Stories", rating: 4.7, desc: "Engaging story templates", img: "" },
            { title: "LinkedIn Covers", rating: 4.8, desc: "Professional cover designs", img: "" }
        ],
        marketing: [
            { title: "Business Flyers", rating: 4.8, desc: "Eye-catching promotional flyers", img: "" },
            { title: "Event Brochures", rating: 4.6, desc: "Professional event materials", img: "" },
            { title: "Promotional Posters", rating: 4.9, desc: "Attention-grabbing posters", img: "" }
        ]
    }
};

// Initialize site with jQuery
$(document).ready(function () {
    function init() {
        tailwind.config = {
            theme: {
                extend: {
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
                }
            }
        }

        // Initialize Lucide icons
        lucide.createIcons();
        AOS.init({ duration: 1000, once: true, offset: 100 }); 
    } init();

    // Load team members
    $.each(siteData.team, function (index, member) {
        $('#team-container').append(`
            <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-md border-2 border-secondary hover:!scale-105 duration-100 hover:shadow-lg flex items-center gap-6">
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
            <div class="bg-white rounded-2xl p-6 shadow-md border-l-4 border-secondary hover:shadow-lg hover:scale-105 transition-all" data-aos="flip-left" data-aos-delay="${index * 150}">
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
        console.log(categoryTitle);
        $('#portfolio-container').append(`
            <div class="mb-12">
                <h3 class="font-montserrat font-bold text-2xl text-primary border-l-4 border-secondary pl-4 mb-6">${categoryTitle}</h3>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${items.map((item, index) => `
                        <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg cursor-pointer" data-aos="fade-up" data-aos-delay="200" onclick="openModal('${item.title}', '${category}')" >
                            <div class="h-fit max-h-72 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100 rounded-t-xl flex items-center justify-center">
                                <img src="${item.img || "./imgs/default_img.jpeg"}" class="object-cover w-full h-full hover:scale-105 duration-300" alt="${item.title}"/>
                            </div>
                            <div class="p-4">
                                <h4 class="font-montserrat font-semibold text-lg text-primary mb-2">${item.title}</h4>
                                <div class="flex justify-between items-center">
                                    <div class="flex items-center gap-1">
                                        <i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400"></i>
                                        <span class="font-semibold text-sm">${item.rating}</span>
                                    </div>
                                    <button class="px-4 py-2 bg-blue-50 text-secondary rounded-lg text-sm font-medium hover:bg-secondary hover:text-white">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
    });

    // Modal handlers
    $('#modal-close, #modal').on('click', function (e) {
        if (e.target === this || e.target.closest('#modal-close')) {
            $('#modal').addClass('hidden');
        }
    });

    // Re-initialize icons
    lucide.createIcons();
    
    // Refresh AOS animations
    AOS.refresh();
});

// Modal function
function openModal(title, category) {
    const item = siteData.portfolio[category].find(i => i.title === title);
    if (item) {
        $('#modal-title').text(title);
        $('#modal-content').html(`
            <div class="size-full rounded-2xl relative">
                <button id="modal-close" class="absolute top-2 right-2 p-2 bg-gray-300/30 hover:bg-gray-100 rounded-lg transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button> 
                <img src="${item.img || "./imgs/default_img.jpeg"}" class="rounded-lg object-cover size-full shadow-xl shadow-sky-500/30" alt="${item.title}"/>
            </div>
        `);
        $('#modal').removeClass('hidden').addClass('flex');
        lucide.createIcons();
    }
}

// SDK Integration (simplified)
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig: {
            hero_title: "Fekra Creative",
            hero_subtitle: "Canva Templates for Brands, Creators & Digital Publishers"
        },
        onConfigChange: function (config) {
            $('#hero-title').text(config.hero_title || "Fekra Creative");
            $('#hero-subtitle').text(config.hero_subtitle || "Canva Templates for Brands, Creators & Digital Publishers");
        }
    });
}

function preventDevTools(e) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault(); 
    }, false);

    document.onkeydown = function(e) {
        // منع مفتاح F12
        if (e.keyCode == 123) {
            return false;
        }
        // منع Ctrl+Shift+I (لفتح أدوات المطور)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        // منع Ctrl+U (لعرض مصدر الصفحة)
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
        // منع Ctrl+S (لحفظ الصفحة)
        if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
            return false;
        }
    };
}

preventDevTools();
