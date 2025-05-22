# 🌍 Landen Explorer – Interactieve Webapp

Een single-page app gebouwd met JavaScript & Vite voor het vak **Advanced Web** aan de Erasmus Hogeschool Brussel.  
Gebruikers kunnen landen ontdekken, filteren, sorteren en opslaan in favorieten.

---

## ✨ Functionaliteiten

- API-data ophalen van [REST Countries API](https://restcountries.com/v3.1/all)
- Visuele kaartweergave van landen (vlag, naam, regio, inwoners, munt, talen…)
- Zoekfunctie op landnaam
- Filters op regio en valuta
- Sorteren op alfabet en bevolkingsgrootte
- Paginering (24 landen per pagina)
- Favorieten opslaan in localStorage
- Dark mode toggle
- Observer API voor lazy loading van vlaggen
- Responsive layout

---

## 🧠 Toegepaste JavaScript-concepten

| Concept                     | Toegepast in                          | Regels / Locatie               |
|----------------------------|----------------------------------------|--------------------------------|
| DOM Selectie               | `document.getElementById(...)`         | `main.js` regel 5–10           |
| DOM Manipulatie            | `renderLanden()`                       | `main.js` regel 100–140        |
| Event Listeners            | Klik-, input- en change-events         | `main.js` regel 12–30          |
| Template Literals          | HTML-rendering                         | `main.js` regel 110            |
| Array Methods              | `.map()`, `.filter()`, `.sort()`       | `main.js` regel 70–90          |
| Arrow Functions            | `entries.forEach(entry => { ... })`    | `main.js` regel 153            |
| Ternary Operator           | `regio ? ... : true`                   | `main.js` regel 72             |
| Callback Functions         | `.sort()`, `.forEach()`                | `main.js` regel 82–83          |
| Promises & Async/Await     | `fetchLanden()`                        | `main.js` regel 35–45          |
| Observer API               | `observeLazyImages()`                  | `main.js` regel 150+           |
| Fetch + JSON               | `fetch(...).then(res => res.json())`   | `main.js` regel 36–39          |
| LocalStorage               | Opslaan & ophalen van favorieten       | `main.js` regel 8–10 & 120     |

---

## 📸 Screenshots

> Voeg hier screenshots toe van je applicatie.
<img width="1404" alt="Screenshot 2025-05-22 at 23 14 54" src="https://github.com/user-attachments/assets/b188a15e-61b8-4e1c-af14-143002d07b19" />
<img width="1379" alt="Screenshot 2025-05-22 at 23 15 18" src="https://github.com/user-attachments/assets/4995fa88-c9e7-4cfa-a955-0e49a1a22666" />
<img width="831" alt="Screenshot 2025-05-22 at 23 15 40" src="https://github.com/user-attachments/assets/c05063f6-3a20-43be-8f12-2baa5841d5c1" />
<img width="773" alt="Screenshot 2025-05-22 at 23 15 59" src="https://github.com/user-attachments/assets/2767d0ad-b671-40c0-a9bc-b444c11bd52a" />
<img width="481" alt="Screenshot 2025-05-22 at 23 16 14" src="https://github.com/user-attachments/assets/7e38ef26-1d04-45e2-8ff6-1ed387870a2a" />



---

## 📚 Gebruikte Bronnen

- [REST Countries API](https://restcountries.com/)
- [Vite](https://vitejs.dev/)
- ChatGPT (assistentie bij observer en structuur)
- StackOverflow & MDN Docs
- Handleiding "Advanced Web" van Erasmus Hogeschool

---

## 👨‍💻 Auteur

- **Naam:** Denis Bujorean  
- **Opleiding:** Toegepaste Informatica 
- **Academiejaar:** 2024–2025
