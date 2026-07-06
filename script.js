const members = [
  {
    name: "Jiao Chunlei",
    role: "Principal Investigator",
    focus: "Designing CRISPR and bacterial defense platforms for diagnostics and therapeutics.",
    research:
      "Chunlei leads the lab's work on discovering, reprogramming, and engineering CRISPR systems, with an emphasis on RNA-guided sensing, precise genome editing, and molecular recording technologies.",
    outside: "Mentoring early-career scientists, reading across biology and engineering, and exploring Singapore's food scene."
  },
  {
    name: "Postdoc Fellow 01",
    role: "Postdoctoral Researcher",
    focus: "High-throughput RNA detection with reprogrammed Cas systems.",
    research:
      "This project develops sensitive RNA detection workflows that combine engineered guide RNAs, nuclease screening, and scalable assay readouts for diagnostic applications.",
    outside: "Coffee brewing, trail walks, and science illustration."
  },
  {
    name: "Postdoc Fellow 02",
    role: "Postdoctoral Researcher",
    focus: "Precise knock-in platforms for programmable genome writing.",
    research:
      "This work focuses on increasing knock-in efficiency and specificity by pairing CRISPR effectors with optimized repair templates and delivery conditions.",
    outside: "Badminton, cooking, and building small lab gadgets."
  },
  {
    name: "PhD Student 01",
    role: "PhD Student",
    focus: "Non-cytotoxic RNA knock-down systems.",
    research:
      "This project investigates RNA-targeting mechanisms that suppress transcripts while preserving cellular viability, enabling cleaner functional studies.",
    outside: "Photography, climbing, and late-night playlists."
  },
  {
    name: "PhD Student 02",
    role: "PhD Student",
    focus: "Long-range genome knock-out engineering.",
    research:
      "This project designs CRISPR strategies for deleting large genomic regions, then measures editing outcomes with sequencing-based validation.",
    outside: "Board games, swimming, and handmade noodles."
  },
  {
    name: "PhD Student 03",
    role: "PhD Student",
    focus: "Spatial RNA recording in living cells.",
    research:
      "This work adapts molecular recording approaches to capture RNA signals across space and time, connecting transcript dynamics with cell state.",
    outside: "Sketching, podcasts, and weekend museums."
  },
  {
    name: "Visiting Scholar 01",
    role: "Visiting Scholar",
    focus: "Comparative analysis of bacterial defense systems.",
    research:
      "This project mines bacterial genomes for defense-system diversity, prioritizing candidates that may be engineered into new research tools.",
    outside: "Cycling, language learning, and market wandering."
  },
  {
    name: "Research Assistant 01",
    role: "Research Assistant",
    focus: "Assay optimization and molecular cloning workflows.",
    research:
      "This role supports cloning, screening, and validation pipelines, making experimental systems reproducible and ready for larger-scale testing.",
    outside: "Baking, cinema, and organizing satisfyingly labeled boxes."
  },
  {
    name: "Research Assistant 02",
    role: "Research Assistant",
    focus: "Cell culture, sequencing prep, and data handoff.",
    research:
      "This work bridges bench execution and analysis-ready datasets through careful sample preparation, quality control, and protocol tracking.",
    outside: "Running, cafe hunting, and mechanical keyboards."
  },
  {
    name: "Intern 01",
    role: "Intern",
    focus: "Prototype screens for guide RNA design.",
    research:
      "This internship project contributes to early-stage guide RNA design and small-scale screens that help identify promising CRISPR configurations.",
    outside: "Tennis, digital art, and learning new programming tools."
  }
];

const memberGrid = document.querySelector("#memberGrid");
const modal = document.querySelector("#memberModal");
const modalPhoto = document.querySelector("#modalPhoto");
const modalRole = document.querySelector("#modalRole");
const modalTitle = document.querySelector("#modalTitle");
const modalResearch = document.querySelector("#modalResearch");
const modalOutside = document.querySelector("#modalOutside");

function renderMembers() {
  memberGrid.innerHTML = members
    .map(
      (member, index) => `
        <button class="member-card" type="button" data-member-index="${index}">
          <span class="member-photo" style="filter: hue-rotate(${index * 18}deg)"></span>
          <span class="member-front">
            <span class="member-name">${member.name}</span>
          </span>
          <span class="member-back">
            <span class="member-name">${member.name}</span>
            <span class="member-role">${member.role}</span>
            <span class="member-focus">${member.focus}</span>
          </span>
        </button>
      `
    )
    .join("");
}

function openModal(member, index) {
  modalPhoto.style.filter = `hue-rotate(${index * 18}deg)`;
  modalRole.textContent = member.role;
  modalTitle.textContent = member.name;
  modalResearch.textContent = member.research;
  modalOutside.textContent = member.outside;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

renderMembers();

memberGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".member-card");
  if (!card) return;
  const index = Number(card.dataset.memberIndex);
  openModal(members[index], index);
});

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});
