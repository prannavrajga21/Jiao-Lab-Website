const members = [
  {
    name: "Chunlei Jiao",
    role: "Principal Investigator",
    focus: "I lead the lab's work on engineering CRISPR and bacterial defense systems.",
    research:
      "My research focuses on discovering, reprogramming, and engineering CRISPR and novel bacterial defense systems for diagnostics, therapeutics, genome editing, RNA sensing, and molecular recording.",
    outside: "I enjoy mentoring early-career scientists, reading across biology and engineering, and exploring Singapore's food scene."
  },
  {
    name: "Dr. Wenjie Han",
    role: "Research Fellow",
    focus: "I apply functional nucleic acids to gene editing and RNA recording.",
    research:
      "My research focuses on the application of functional nucleic acids to gene editing, particularly in large-gene knock-in, off-target site detection, and RNA recording.",
    outside: "I enjoy eating and discovering good food."
  },
  {
    name: "Dr. Shuanshuan Xu",
    role: "Research Fellow",
    focus: "I engineer CRISPR tools for large-scale genomic deletions.",
    research:
      "My research specializes in molecular biology and gene editing, and my current projects involve engineering CRISPR tools for large-scale genomic deletions.",
    outside: "I spend my time boxing and practicing archery."
  },
  {
    name: "Dr. Chen Meng",
    role: "Research Fellow",
    focus: "I work on gene editing tools, imaging, biosensors, and diagnostics.",
    research:
      "My research focuses on gene editing tools and their applications, with interests in cell imaging, biosensors, and disease diagnostics.",
    outside: "I enjoy swimming, hiking, playing badminton, and watching TV dramas."
  },
  {
    name: "Zhang Bin",
    role: "PhD Candidate",
    focus: "I develop novel gene-editing technologies for precision medicine.",
    research:
      "My research focuses on developing novel gene-editing technologies and exploring their applications in precision medicine.",
    outside: "I enjoy discovering new foods, traveling, watching movies, hiking, meeting new people, and exploring the world together."
  },
  {
    name: "Wang Lehua",
    role: "PhD Candidate",
    focus: "I develop and optimize programmable genome-editing systems.",
    research:
      "My research focuses on developing and optimizing programmable genome-editing systems, with an emphasis on molecular tool engineering and experimental validation.",
    outside: "I enjoy staying active and exploring new places and cultures."
  },
  {
    name: "Haixin Gao",
    role: "PhD Candidate",
    focus: "I study programmable biology through CRISPR and genome engineering.",
    research:
      "My research explores CRISPR-based molecular tools and their applications in genome engineering, with a focus on building reliable experimental systems for precise biological control.",
    outside: "I enjoy learning new things, staying curious, and spending time with friends."
  },
  {
    name: "Angela Meng",
    role: "Intern",
    focus: "I am interested in gene editing, cell imaging, and intracellular protein delivery.",
    research:
      "My research interests include gene editing, cell imaging, and intracellular protein delivery systems.",
    outside: "I enjoy photography, traveling, and snowboarding."
  },
  {
    name: "Prannavraj G A",
    role: "Visiting Scholar",
    focus: "I combine computational biology and structural bioinformatics to study tCRISPR-Cas systems.",
    research:
      "My research combines computational biology and structural bioinformatics to study tCRISPR-Cas systems.",
    outside: "I enjoy playing the guitar, rewatching favorites, and exploring new food spots."
  },
  {
    name: "Melissa Ng",
    role: "FYP Student",
    focus: "I work on improving gene editing technology.",
    research:
      "My research work focuses on improving gene editing technology.",
    outside: "I enjoy drinking Chagee, listening to music, and enjoying the outdoors."
  },
  {
    name: "Ziyi Wang",
    role: "Exchange Student",
    focus: "I am exploring CRISPR biology and molecular tool development.",
    research:
      "My research interests center on CRISPR biology, molecular biology workflows, and learning how programmable gene-editing systems can be developed into useful research tools.",
    outside: "I enjoy exploring new places, learning from different cultures, and spending time with friends."
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
