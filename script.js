const members = [
  {
    name: "Dr. Jiao Chunlei",
    role: "Principal Investigator",
    focus: "",
    research:
      "My research focuses on discovering, reprogramming, and engineering CRISPR and novel bacterial defense systems for diagnostics, therapeutics, genome editing, RNA sensing, and molecular recording.",
    outside: "I enjoy mentoring early-career scientists, reading across biology and engineering, and exploring Singapore's food scene.",
    photo: "images/members/chunlei-jiao.jpg",
    photoPosition: "37% center"
  },
  {
    name: "Dr. Han Wenjie",
    role: "Research Fellow",
    focus: "Off-targeting detection, RNA recording, precise knock-in.",
    research:
      "My research focuses on the application of functional nucleic acids to gene editing, particularly in large-gene knock-in, off-target site detection, and RNA recording.",
    outside: "I enjoy eating and discovering good food.",
    photo: "images/members/wenjie-han.jpg",
    photoPosition: "58% center",
    photoZoom: 1.1
  },
  {
    name: "Dr. Xu Shuanshuan",
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
    photoPosition: "50% center",
    photoZoom: 1.1
  },
  {
    name: "Dr. He Yan",
    role: "Research Fellow",
    focus: "Development and application of gene editing tools.",
    research:
      "My research focuses on the development and application of gene editing tools, using them more safely and efficiently to solve biological problems.",
    outside: "I enjoy reading and hiking.",
    photo: "images/members/yan.jpg",
    photoPosition: "50% center",
    photoZoom: 1.12
  },
  {
    name: "Dr. He Kaining",
    role: "Visiting Scholar",
    focus: "Polyampholyte hydrogels and mycelium-based biomaterials.",
    research:
      "My research focuses on tough polyampholyte (PA) and living mycelium-based hydrogels, exploring their properties and applications in advanced materials and bioengineering.",
    outside: "I enjoy reading novels and watching films.",
    photo: "images/members/kaining-he.jpg",
    photoPosition: "50% center",
    photoZoom: 1.1
  },
  {
    name: "Zhang Bin",
    role: "PhD Candidate",
    focus: "Precise genome editing.",
    research:
      "My research focuses on developing novel genome editing technologies and exploring their applications in precision medicine.",
    outside: "I enjoy discovering new foods, traveling, watching movies, hiking, meeting new people, and exploring the world together.",
    photo: "images/members/zhang-bin.jpg",
    photoPosition: "58% center",
    photoZoom: 1.1
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
    name: "Qi Xiaoyang",
    role: "PhD Candidate",
    focus: "CRISPR tools for precise, large-scale genome engineering.",
    research:
      "My research focuses on developing CRISPR-based tools for precise and large-scale genome engineering.",
    outside: "I love reading novels and experimenting with homemade coffee drinks. I also enjoy working out and swimming. I love traveling and hope to explore different cities and countries through their local food and ski slopes.",
    photo: "images/members/qi-xiaoyang.jpg",
    photoPosition: "46% center",
    photoZoom: 1.12
  },
  {
    name: "Shao Xinjuan",
    role: "PhD Candidate",
    focus: "RNA imaging, CRISPR, and protein engineering.",
    research:
      "My research focuses on RNA imaging, CRISPR, and protein engineering for advancing molecular tools and cellular understanding.",
    outside: "I enjoy traveling, exploring culinary delights, and photography.",
    photo: "images/members/shaoxinjuan.jpg",
    photoPosition: "52% center",
    photoZoom: 1.12
  },
  {
    name: "Tang Zifan",
    role: "Master's Student",
    focus: "Gene editing platform — engineering programmable tools for precise and targeted genomic modification.",
    research:
      "My research focuses on the development of gene editing platforms, exploring how programmable tools such as CRISPR systems can be engineered and optimized for precise genomic modifications across diverse biological contexts.",
    outside: "I enjoy movies and badminton.",
    photo: "images/members/tang-zifan.jpg",
    photoPosition: "50% center",
    photoZoom: 1.1
  },
  {
    name: "G A Prannavraj",
    role: "Visiting Intern",
    focus: "Mining new CRISPR systems.",
    research:
      "My research combines computational biology and structural bioinformatics to study CRISPR-Cas systems.",
    outside: "I enjoy playing the guitar, rewatching favorites, and exploring new food spots.",
    photo: "images/members/prannavraj-ga.jpg",
    photoZoom: 1.15
  },
  {
    name: "Melissa Ng",
    role: "UROPS Student",
    focus: "I work on improving gene editing technology.",
    research:
      "My research work focuses on improving gene editing technology.",
    outside: "I enjoy drinking Chagee, listening to music, and enjoying the outdoors.",
    photo: "images/members/melissa-ng.jpeg",
    photoZoom: 1.15
  },
  {
    name: "Guo Ziyu",
    role: "Master's Student",
    focus: "Discovering and engineering CRISPR and bacterial defense systems.",
    research:
      "My research focuses on discovering, reprogramming, and engineering CRISPR and novel bacterial defense systems for diagnostics, therapeutics, genome editing, RNA sensing, and molecular recording.",
    outside: "I enjoy photography, watching movies, and traveling to explore new places and cultures.",
    photo: "images/members/guo-ziyu.jpg",
    photoPosition: "48% center",
    photoZoom: 1.1
  },
  {
    name: "Zhang Sunxiang",
    role: "Master's Student",
    focus: "Efficient, precise RNA-guided genome-editing tools.",
    research:
      "My research focuses on developing and engineering efficient and precise genome-editing tools, particularly through programmable RNA-guided systems. I am interested in understanding and reprogramming novel molecular systems and exploring their potential applications in genome engineering.",
    outside: "I enjoy playing video games and football, traveling, and watching movies.",
    photo: "images/members/sunxiang-zhang.jpg",
    photoPosition: "50% center",
    photoZoom: 1.1
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
  const originX = (member.photoPosition || "center").split(" ")[0];
  return `transform: scale(${member.photoZoom}); transform-origin: ${originX} top;`;
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

// Smooth reveal on scroll (opacity + rise); respects reduced-motion
(function () {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
})();
