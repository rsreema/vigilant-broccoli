/* ========================================================= 
    FOLIO — script.js 
   ========================================================= */ 

/* ---------- 1. DARK MODE TOGGLE ---------- */ 
const themeToggle = document.querySelector('#theme-toggle'); 

themeToggle.addEventListener('click', () => { 
  document.body.classList.toggle('dark'); 
  const isDark = document.body.classList.contains('dark'); 
  themeToggle.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19'; 
}); 

/* ---------- 2. BACK-TO-TOP BUTTON ---------- */ 
const toTop = document.querySelector('#to-top'); 

window.addEventListener('scroll', () => { 
  if (window.scrollY > 300) { 
    toTop.classList.add('show'); 
  } else { 
    toTop.classList.remove('show'); 
  } 
}); 

toTop.addEventListener('click', () => { 
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}); 

/* ---------- 3. GALLERY FILTER WITH GRADUAL SMOOTH TRANSITIONS ---------- */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-container .card');
const projectCounter = document.querySelector('#project-counter');

function updateProjectCount(visibleCount, totalCount) {
  if (visibleCount === totalCount) {
    projectCounter.textContent = `All projects displayed (${totalCount})`;
  } else {
    projectCounter.textContent = `Showing ${visibleCount} of ${totalCount} items`;
  }
}

// Initial count assignment
updateProjectCount(projectCards.length, projectCards.length);

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // UI active classes swapping safely
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');

    const selectedFilter = button.getAttribute('data-filter');
    let matchingItems = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        // Step 1: Remove hidden state block so height can expand fluidly
        card.classList.remove('hidden');
        matchingItems++;
      } else {
        // Step 2: Add hidden state to shrink layout track and fade item
        card.classList.add('hidden');
      }
    });

    updateProjectCount(matchingItems, projectCards.length);
  });
});

/* ---------- 4. SCROLL REVEAL ---------- */ 
const revealItems = document.querySelectorAll('.reveal'); 

const observer = new IntersectionObserver((entries) => { 
  entries.forEach((entry) => { 
    if (entry.isIntersecting) { 
      entry.target.classList.add('is-visible'); 
      observer.unobserve(entry.target); 
    } 
  }); 
}, { 
  threshold: 0.10 
}); 

revealItems.forEach((item) => observer.observe(item));
document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById("projects-container");

  // Grab the JSON file created by the Python script
  fetch("projects.json")
    .then(res => res.json())
    .then(projects => {
      // Clear out any placeholder HTML design cards first
      grid.innerHTML = ""; 
      
      // Generate standard design cards for each project
      projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category", project.category);
        
        card.innerHTML = `
          <span class="tag">${project.category} Category</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="chips">
            <span class="chip">${project.tech}</span>
          </div>
          <a href="${project.link}" target="_blank" class="card-link">View Project ↗</a>
        `;
        
        grid.appendChild(card);
      });
    })
    .catch(err => console.log("Run the Python script locally first to generate the file:", err));
});