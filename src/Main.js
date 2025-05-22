const API_URL = 'https://restcountries.com/v3.1/all';

const container = document.getElementById('country-container');
const searchInput = document.getElementById('searchInput');
const regionFilter = document.getElementById('regionFilter');
const currencyFilter = document.getElementById('currencyFilter');
const sortFilter = document.getElementById('sortFilter');
const darkToggle = document.getElementById('darkModeToggle');
const favoritesButton = document.getElementById('favoritesButton');
const paginationContainer = document.getElementById('pagination');

let landen = [];
let favorieten = JSON.parse(localStorage.getItem('favorieteLanden')) || [];
let toonFavorieten = false;
const ITEMS_PER_PAGE = 24;
let huidigePagina = 1;

// Event listeners
searchInput.addEventListener('input', () => { huidigePagina = 1; filterAndRender(); });
regionFilter.addEventListener('change', () => { huidigePagina = 1; filterAndRender(); });
currencyFilter.addEventListener('change', () => { huidigePagina = 1; filterAndRender(); });
sortFilter.addEventListener('change', () => { huidigePagina = 1; filterAndRender(); });
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
favoritesButton.addEventListener('click', () => {
  toonFavorieten = !toonFavorieten;
  favoritesButton.textContent = toonFavorieten ? '🔙 Alle Landen' : '❤️ Mijn Landen';
  huidigePagina = 1;
  filterAndRender();
});

// API-data ophalen
async function fetchLanden() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    landen = data;
    vulCurrencyFilter(landen);
    filterAndRender();
  } catch (err) {
    container.innerHTML = '<p>Fout bij het laden van de landen.</p>';
  }
}

// Valuta-opties vullen
function vulCurrencyFilter(lijst) {
  const currencySet = new Set();
  lijst.forEach(land => {
    if (land.currencies) {
      Object.keys(land.currencies).forEach(code => currencySet.add(code));
    }
  });

  [...currencySet].sort().forEach(valuta => {
    const optie = document.createElement('option');
    optie.value = valuta;
    optie.textContent = valuta;
    currencyFilter.appendChild(optie);
  });
}

// Filteren, sorteren en pagineren
function filterAndRender() {
  const zoekterm = searchInput.value.toLowerCase();
  const regio = regionFilter.value;
  const valuta = currencyFilter.value;
  const sorteerOptie = sortFilter.value;

  const lijst = toonFavorieten
    ? landen.filter(land => favorieten.includes(land.cca3))
    : landen;

  let gefilterd = lijst.filter(land => {
    const naam = land.name.common.toLowerCase();
    const regioMatch = regio ? land.region === regio : true;
    const valutaMatch = valuta
      ? land.currencies && Object.keys(land.currencies).includes(valuta)
      : true;
    return naam.includes(zoekterm) && regioMatch && valutaMatch;
  });

  // Sorteren
  gefilterd.sort((a, b) => {
    switch (sorteerOptie) {
      case 'az': return a.name.common.localeCompare(b.name.common);
      case 'za': return b.name.common.localeCompare(a.name.common);
      case 'popLowHigh': return a.population - b.population;
      case 'popHighLow': return b.population - a.population;
      default: return 0;
    }
  });

  // Paginering
  const start = (huidigePagina - 1) * ITEMS_PER_PAGE;
  const eind = start + ITEMS_PER_PAGE;
  const paginated = gefilterd.slice(start, eind);

  renderLanden(paginated);
  renderPagination(gefilterd.length);
}

// Landen weergeven
function renderLanden(lijst) {
  container.innerHTML = '';
  lijst.forEach(land => {
    const kaart = document.createElement('div');
    kaart.className = 'country-card';

    const isFavoriet = favorieten.includes(land.cca3);
    const talen = land.languages ? Object.values(land.languages).join(', ') : 'Onbekend';
    const munten = land.currencies ? Object.values(land.currencies).map(c => c.name).join(', ') : 'Onbekend';

    kaart.innerHTML = `
      <div class="flag-wrapper">
        <img data-src="${land.flags.svg}" alt="Vlag van ${land.name.common}" class="lazy-flag" />
        <span class="star ${isFavoriet ? 'active' : ''}" data-code="${land.cca3}">★</span>
      </div>
      <div class="country-info">
        <h3>${land.name.common}</h3>
        <p><strong>Hoofdstad:</strong> ${land.capital?.[0] || 'Onbekend'}</p>
        <p><strong>Regio:</strong> ${land.region}</p>
        <p><strong>Bevolking:</strong> ${land.population.toLocaleString()}</p>
        <p><strong>Talen:</strong> ${talen}</p>
        <p><strong>Munt:</strong> ${munten}</p>
      </div>
    `;

    kaart.querySelector('.star').addEventListener('click', (e) => {
      e.stopPropagation();
      const code = e.target.dataset.code;
      if (favorieten.includes(code)) {
        favorieten = favorieten.filter(c => c !== code);
      } else {
        favorieten.push(code);
      }
      localStorage.setItem('favorieteLanden', JSON.stringify(favorieten));
      filterAndRender();
    });

    container.appendChild(kaart);
  });

  observeLazyImages(); // 👈 Observer API activeren
}

// Paginering
function renderPagination(totaalAantal) {
  paginationContainer.innerHTML = '';
  const totaalPaginas = Math.ceil(totaalAantal / ITEMS_PER_PAGE);

  for (let i = 1; i <= totaalPaginas; i++) {
    const knop = document.createElement('button');
    knop.textContent = i;
    knop.className = i === huidigePagina ? 'active' : '';
    knop.addEventListener('click', () => {
      huidigePagina = i;
      filterAndRender();
    });
    paginationContainer.appendChild(knop);
  }
}

// Observer API: lazy load vlaggen
function observeLazyImages() {
  const afbeeldingen = document.querySelectorAll('.lazy-flag');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-flag');
        obs.unobserve(img);
      }
    });
  });

  afbeeldingen.forEach(img => observer.observe(img));
}

fetchLanden();