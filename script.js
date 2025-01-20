const apiURL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
const tableBody = document.querySelector("table tbody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const errorSection = document.getElementById("error-section");
const themeToggle = document.getElementById("themeToggle");
const recordsPerPageDropdown = document.getElementById("recordsPerPage");
let currentPage = 1;
let projects = [];
let recordsPerPage = 5;

const fetchProjectsPage = async (page) => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    projects = await response.json();
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return projects.slice(startIndex, endIndex);
  } catch (error) {
    errorSection.textContent = "Failed to load data. Please try again later.";
    return [];
  }
};

const updateTable = (data) => {
  tableBody.innerHTML = "";
  data.forEach((project) => {
    const row = document.createElement("tr");
    const serialCell = document.createElement("td");
    serialCell.textContent = project["s.no"];
    row.appendChild(serialCell);
    const percentFundedCell = document.createElement("td");
    percentFundedCell.textContent = project["percentage.funded"];
    row.appendChild(percentFundedCell);
    const amountPledgedCell = document.createElement("td");
    amountPledgedCell.textContent = project["amt.pledged"];
    row.appendChild(amountPledgedCell);
    tableBody.appendChild(row);
  });
};

const updatePaginationButtons = () => {
  const totalPages = Math.ceil(projects.length / recordsPerPage);
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
};

const loadPage = async (page) => {
  currentPage = page;
  const data = await fetchProjectsPage(page);
  updateTable(data);
  updatePaginationButtons();
  const totalPages = Math.ceil(projects.length / recordsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
};

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    loadPage(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(projects.length / recordsPerPage);
  if (currentPage < totalPages) {
    loadPage(currentPage + 1);
  }
});

const applyTheme = () => {
  const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isSystemDark) {
    document.body.classList.add('dark');
    themeToggle.textContent = '🌙';
  } else {
    document.body.classList.remove('dark');
    themeToggle.textContent = '☀️';
  }
};

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    themeToggle.textContent = '☀️';
  } else {
    document.body.classList.add('dark');
    themeToggle.textContent = '🌙';
  }
});

const initializeDropdown = () => {
  const totalRecords = projects.length;
  const dropdownFragment = document.createDocumentFragment();
  for (let i = 5; i <= totalRecords; i += 5) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    dropdownFragment.appendChild(option);
  }
  recordsPerPageDropdown.appendChild(dropdownFragment);
};

recordsPerPageDropdown.addEventListener("change", (event) => {
  recordsPerPage = parseInt(event.target.value, 10);
  currentPage = 1;
  loadPage(currentPage);
});

fetchProjectsPage(1).then(() => {
  initializeDropdown();
  loadPage(currentPage);
});
applyTheme();