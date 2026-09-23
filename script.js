const members = [
  {
    name: "Dr. Chunlei Jiao",
    role: "Principal Investigator",
    focus: "",
    research:
      "My research focuses on discovering, reprogramming, and engineering CRISPR and novel bacterial defense systems for diagnostics, therapeutics, genome editing, RNA sensing, and molecular recording.",
    outside: "I enjoy mentoring early-career scientists, reading across biology and engineering, and exploring Singapore's food scene.",
    photo: "images/members/chunlei-jiao.jpg",
    photoPosition: "62% 15%"
  },
  {
    name: "Dr. Wenjie Han",
    role: "Research Fellow",
    focus: "Off-targeting detection, RNA recording, precise knock-in.",
    research:
      "My research focuses on the application of functional nucleic acids to gene editing, particularly in large-gene knock-in, off-target site detection, and RNA recording.",
    outside: "I enjoy eating and discovering good food.",
    photo: "images/members/wenjie-han.jpg",
    photoPosition: "center 15%",
    photoZoom: 1.15
  },
  {
    name: "Dr. Shuanshuan Xu",
    role: "Research Fellow",
    focus: "Large genomic deletions.",
    research:
      "My research focuses on biochemistry characterization of a new CRISPR system and engineering it into a tool for long-range genomic deletions.",
    outside: "I spend my time boxing and practicing archery.",
    photo: "images/members/shuanshuan-xu.jpg",
    photoZoom: 1.15
  },
  {
    name: "Dr. Chen Meng",
    role: "Research Fellow",
    focus: "Biosensors, cell imaging, and precise genome editing.",
    research:
      "My research focuses on developing tools for biosensors, cell imaging, and precise genome editing.",
    outside: "I enjoy swimming, hiking, playing badminton, and watching TV dramas.",
    photo: "images/members/chen-meng.jpg",
    photoPosition: "center 15%",
    photoZoom: 1.15
  },
  {
    name: "Zhang Bin",
    role: "PhD Candidate",
    focus: "Precise genome editing.",
    research:
      "My research focuses on developing novel genome editing technologies and exploring their applications in precision medicine.",
    outside: "I enjoy discovering new foods, traveling, watching movies, hiking, meeting new people, and exploring the world together.",
    photo: "images/members/zhang-bin.jpg",
    photoPosition: "center 15%",
    photoZoom: 1.15
  },
  {
    name: "Wang Lehua",
    role: "PhD Candidate",
    focus: "Engineering novel genome editors.",
    research:
      "My research focuses on developing and optimizing programmable genome-editing systems, with an emphasis on biochemical characterization and protein evolution.",
    outside: "I enjoy staying active and exploring new places and cultures.",
    photo: "images/members/wang-lehua.png",
    photoZoom: 1.15
  },
  {
    name: "Haixin Gao",
    role: "PhD Candidate",
    focus: "Engineer precise RNA targeting tools.",
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
    outside: "I enjoy photography, traveling, and snowboarding.",
    photo: "images/members/angela-meng.jpg",
    photoZoom: 1.15
  },
  {
    name: "Lyu Weichen",
    role: "Intern",
    focus: "Protein mutation prediction, molecular recording systems.",
    research:
      "My research interests include computational and statistical methods for predicting the effects of protein mutations, as well as the development and optimization of molecular recording systems.",
    outside: "I enjoy powerlifting, archery, and reading mystery and detective novels.",
    photo: "images/members/lyu-weichen.jpg",
    photoPosition: "center 15%",
    photoZoom: 1.15
  },
  {
    name: "Prannavraj G A",
    role: "Visiting Scholar",
    focus: "Mining new CRISPR systems.",
    research:
      "My research combines computational biology and structural bioinformatics to study CRISPR-Cas systems.",
    outside: "I enjoy playing the guitar, rewatching favorites, and exploring new food spots.",
    photo: "images/members/prannavraj-ga.jpg",
    photoZoom: 1.15
  },
  {
    name: "Melissa Ng",
    role: "FYP Student",
    focus: "I work on improving gene editing technology.",
    research:
      "My research work focuses on improving gene editing technology.",
    outside: "I enjoy drinking Chagee, listening to music, and enjoying the outdoors.",
    photo: "images/members/melissa-ng.jpeg",
    photoZoom: 1.15
  },
  {
    name: "Ziyi Wang",
    role: "Exchange Student",
    focus: "I am exploring CRISPR biology and molecular tool development.",
    research:
      "My research interests center on CRISPR biology, molecular biology workflows, and learning how programmable gene-editing systems can be developed into useful research tools.",
    outside: "I enjoy exploring new places, learning from different cultures, and spending time with friends.",
    photo: "images/members/ziyi-wang.jpg",
    photoZoom: 1.15
  }
];

const memberGrid = document.querySelector("#memberGrid");
const modal = document.querySelector("#memberModal");
const modalPhoto = document.querySelector("#modalPhoto");
const modalRole = document.querySelector("#modalRole");
const modalTitle = document.querySelector("#modalTitle");
const modalResearch = document.querySelector("#modalResearch");
const modalOutside = document.querySelector("#modalOutside");

function photoStyle(member, index) {
  return member.photo
    ? `background-image: url('${member.photo}'); background-size: cover; background-position: ${member.photoPosition || "center"};`
    : `filter: hue-rotate(${index * 18}deg)`;
}

function photoFrameStyle(member) {
  if (!member.photoZoom || member.photoZoom === 1) return "";
  const origin = member.photoPosition || "center";
  return `transform: scale(${member.photoZoom}); transform-origin: ${origin};`;
}

function renderMembers() {
  memberGrid.innerHTML = members
    .map(
      (member, index) => `
        <button class="member-card" type="button" data-member-index="${index}">
          <span class="member-photo-frame" style="${photoFrameStyle(member)}">
            <span class="member-photo" style="${photoStyle(member, index)}"></span>
          </span>
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
  modalPhoto.setAttribute("style", photoStyle(member, index));
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
