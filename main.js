// Fekra Creative Team
const team = [
  { name: "Ahmed Adel", role: "Creative Director / Lead Designer", initials: "AA" },
  { name: "Abdelhalim", role: "Event & Social Media Designer", initials: "AH" },
  { name: "Abdelrahman", role: "Healthcare & Presentation Designer", initials: "AR" },
  { name: "Ali El-Desouky", role: "Brand Identity & Logo Designer", initials: "AD" }
];


// Tailwind + Plugins
function initUI() {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#38BDF8', secondary: '#0F172A', accent: '#7DD3FC',
          background: '#F8FAFC', surface: '#FFFFFF'
        },
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
          inter: ['Inter', 'sans-serif']
        }
      }
    }
  };

  lucide.createIcons();
  AOS.init({ duration: 700, once: true });
}
initUI();


// Render Team
function displayTeam() {
  $('#team-container').html(team.forEach((m, i) => `
    <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-md border-2 border-primary hover:!scale-105 duration-100 hover:shadow-lg flex items-center gap-6" data-aos="flip-left" data-aos-delay="${i * 120}">
      <div class="shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white font-montserrat font-bold text-xl shadow-lg">
        ${m.initials}
      </div>
      <div>
        <h3 class="font-montserrat font-bold text-lg text-secondary">${m.name}</h3>
        <p class="text-gray-600 text-sm">${m.role}</p>
      </div>
    </div>
  `));
  lucide.createIcons();
  AOS.refresh();
} 
displayTeam();


// Fetch Portfolio
async function FetchData() {
  try {
    const res = await fetch(
      "https://api.airtable.com/v0/appw8GOABUgJsGQ0q/tblBcFBon75lpzS4E",
      { headers: { Authorization: "Bearer patib1nAKVIqWtaqw.ffb77a36000f0605f78da8c04ac879d0a684408cda09e2626fb1573b9c3228b5" } }
    );

    const { records } = await res.json();
    records.sort((a, b) => (a.fields.id || 0) - (b.fields.id || 0));
    displayPortfolio(records);

  } catch (err) {
    console.error("Fetch error:", err);
  }
}
FetchData();


// Render Portfolio
function displayPortfolio(data) {
  const container = $('#portfolio-container').empty();

  // Group by category
  const groups = data.reduce((all, G) => {
    (all[G.fields.category] ||= []).push(G);
    return all;
  }, {});

  for (const cat in groups) {
    const items = groups[cat];

    container.append(`
      <div class="mb-12">
        <h3 data-aos="fade-right" class="font-montserrat font-bold text-2xl text-secondary border-l-4 border-primary pl-4 mb-6">
          ${cat}
        </h3>

        <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${items.map((item, i) => {
              const pro = item.fields;
              return `
                <li data-aos="fade-up" data-aos-delay="${i * 80}">
                  <div class="bg-white rounded-xl shadow-xl hover:shadow-lg transition overflow-hidden">

                    <div class="overflow-hidden bg-blue-50 flex items-center justify-center *:hover:scale-110 *:duration-300">
                      <img src="${pro.img?.[0]?.url}" class="object-cover w-full h-fit" />
                    </div>

                    <div class="mt-3 p-3">
                      <h4 class="font-montserrat font-semibold text-lg text-secondary">${pro.title}</h4>

                      <div class="mt-3 flex items-center justify-between">
                        <p class="text-sm text-gray-500">By ${pro.designer}</p>
                        <p class="text-xs text-gray-400">${pro.category}</p>
                      </div>
                    </div>

                  </div>
                </li>
              `;
            })
            .join("")}
        </ul>
      </div>
    `);
  }
}


// Block DevTools
function preventDevTools() {
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.onkeydown = e => {
    if (e.keyCode === 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;
    if (e.ctrlKey && e.keyCode === 85) return false;
    if (e.ctrlKey && e.keyCode === 83) return false;
  };
}
preventDevTools();