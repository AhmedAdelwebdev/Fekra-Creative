// ===== Site Data =====
const siteData = {
  team: [
    { name: "Ahmed Adel", role: "Primary Creator / Team Lead", initials: "AA" },
    { name: "Ali El-Desouky", role: "Branding Specialist", initials: "AD" },
    { name: "Abdelhalim", role: "Social Media Designer", initials: "AH" },
    { name: "Abdelrahman", role: "Layout & Presentation Designer", initials: "AR" }
  ],
  portfolio: {
    "Events & Conference Designs": [
      { title: "Conference Poster: One Health Annual Event", designerCredit: "Abdelhalim" },
      { title: "Academic Speakers Lineup Visual", designerCredit: "Abdelhalim" },
      { title: "Educational Workshop Promotion Design", designerCredit: "Abdelhalim" }
    ],
    "Brand Logos & Identity": [
      { title: "Colorful Personal Branding Logo", designerCredit: "Ahmed Adel" },
      { title: "Minimalist Spiral Logo Design", designerCredit: "Ali El-Desouky" },
      { title: "Contemporary Typographic Logo", designerCredit: "Abdelhalim" },
      { title: "Vibrant Personal Identity Logo", designerCredit: "Ahmed Adel" },
      { title: "Elegant Spiral Brand Symbol", designerCredit: "Abdelrahman" },
      { title: "Modern Letter-Based Logo", designerCredit: "Ahmed Adel" }
    ],
    "Medical & Healthcare Visuals": [
      { title: "Medical Diagnostics Awareness Banner", designerCredit: "Abdelrahman" },
      { title: "Dental Clinic Marketing Graphic", designerCredit: "Ali El-Desouky" },
      { title: "Healthcare Promotion Card Design", designerCredit: "Abdelrahman" }
    ],
  }
};

// ===== Tailwind + AOS + Lucide Init =====
function tailwindCss() {
  tailwind.config = {
    theme: { extend: {
      colors: { primary: '#38BDF8', secondary: '#0F172A', accent: '#7DD3FC', background: '#F8FAFC', surface: '#FFFFFF' },
      fontFamily: { montserrat: ['Montserrat','sans-serif'], inter: ['Inter','sans-serif'] } }
    }
  };
  lucide.createIcons();
  AOS.init({ duration: 700, once: true });
}
tailwindCss();

// ===== helpers =====
function createImageHolder(img_src) {
  return `<div class="template-img-holder w-full h-fit overflow-hidden bg-blue-50 flex items-center justify-center *:hover:scale-110 *:duration-300" data-src="${img_src}"></div>`;
}

// ===== render =====
$(document).ready(function() {
  // Team
  $('#team-container').empty();
  siteData.team.forEach((m,i) => {
    $('#team-container').append(`
      <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-md border-2 border-primary hover:!scale-105 duration-100 hover:shadow-lg flex items-center gap-6" data-aos="flip-left" data-aos-delay="${i*120}">
        <div class="shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white font-montserrat font-bold text-xl shadow-lg">${m.initials}</div>
        <div>
          <h3 class="font-montserrat font-bold text-lg text-secondary">${m.name}</h3>
          <p class="text-gray-600 text-sm">${m.role}</p>
        </div>
      </div>
    `);
  });

  // Portfolio
  $('#portfolio-container').empty();
  Object.keys(siteData.portfolio).forEach((cat, catIndex) => {
    const items = siteData.portfolio[cat];
    if (!items.length) return;
    $('#portfolio-container').append(`
      <div class="mb-12">
        <h3 data-aos="fade-right" class="font-montserrat font-bold text-2xl text-secondary border-l-4 border-primary pl-4 mb-6">${cat}</h3>
        <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${items.map((it,i)=>`
            <li data-aos="fade-up" data-aos-delay="${i*80}">
              <div class="bg-white rounded-xl shadow-xl hover:shadow-lg transition overflow-hidden">
                ${createImageHolder(`/imgs/${['A','B','C'][catIndex] + i}.jpg`)} 
                <div class="mt-3 p-3">
                  <h4 class="font-montserrat font-semibold text-lg text-secondary">${it.title}</h4>
                  <div class="mt-3 flex items-center justify-between gap-3">
                    <p class="text-sm text-gray-500">By ${it.designerCredit}</p>
                    <p class="text-xs text-gray-400">${cat}</p>
                  </div>
                </div>
              </div>
            </li>`).join('')}
        </ul>
      </div>
    `);
  });

  // Image load handling
  $('.template-img-holder').each(function() {
    const h=$(this), src=h.attr('data-src'), alt=h.attr('aria-label')||'';
    if(!src){showPlaceholder(h);return;}
    const img=new Image();
    img.onload=()=>h.html(`<img src="${src}" alt="${alt}" class="object-cover w-full h-fit" />`);
    img.onerror=()=>showPlaceholder(h);
    img.src=src;
  });

  lucide.createIcons();
  AOS.refresh();
});

// ===== placeholder =====
function showPlaceholder(h) {
  h.html(
  `<div class="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center text-center p-4">
    <div class="w-20 h-20 flex items-center justify-center"><i data-lucide="image" class="size-10 text-primary"></i></div>
  </div>`);
  lucide.createIcons();
}

function preventDevTools(e) {
    document.addEventListener('contextmenu', function(e) { e.preventDefault() }, false);
    document.onkeydown = function(e) {
        if (e.keyCode == 123) { return false } // F12 
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false }
        if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) { return false }
    };
} preventDevTools();
