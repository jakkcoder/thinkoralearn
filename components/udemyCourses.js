/**
 * Renders a Udemy courses section.
 * @param {HTMLElement} mountEl - Element to render into
 * @param {object} instructor - { name, tagline, profileUrl, learners?, reviews? }
 * @param {Array} courses - [{ title, url, image }]
 */
export function renderUdemySection(mountEl, instructor, courses) {
  if (!mountEl) return;

  const section = document.createElement("section");
  section.id = "udemy-courses";
  section.className = "container";

  const statsText = (instructor.learners || instructor.reviews)
    ? ` with over <strong>${instructor.learners || ""}</strong>${instructor.learners && instructor.reviews ? " and " : ""}<strong>${instructor.reviews || ""}</strong>`
    : "";

  section.innerHTML = `
    <h2>Courses by ${instructor.name} on Udemy</h2>
    <p>
      Learn from <strong>${instructor.name}</strong>, a <strong>top-rated Udemy instructor</strong> (${instructor.tagline})${statsText}.
  Courses focus on practical, project-based learning in Data Analysis, Web Development, and AI.
    </p>

    <div class="course-cards"></div>

    <div class="more-courses">
      <a href="${instructor.profileUrl}" target="_blank" rel="noopener noreferrer">
        View all courses on Udemy
      </a>
    </div>
  `;

  const grid = section.querySelector(".course-cards");

  courses.forEach((c) => {
    const card = document.createElement("div");
    card.className = "course";
    card.innerHTML = `
      <a href="${c.url}" target="_blank" rel="noopener noreferrer">
        <img src="${c.image}" alt="${c.title}" />
        <h3>${c.title}</h3>
      </a>
    `;
    grid.appendChild(card);
  });

  mountEl.replaceChildren(section);
}
