console.log("i'm linked!");


async function loadJSON() {
    const res = await fetch("/assets/data/content.json");
    return await res.json();
}

async function loadSidebar(data) {
    const sidebar = document.getElementById("sidebar");
    const brand = data.sidebar.brand;

    sidebar.innerHTML = `
        <section class="row">
            <img class="img-fluid col-2" src="${brand.logo}" alt="Logo" />
            <p class="col fw-semibold fs-5">${brand.title}</p>
        </section>
        <ul id="sidebar-main"></ul>
        <ul id="sidebar-bottom"></ul>
    `;

    const mainList = document.getElementById("sidebar-main");
    const bottomList = document.getElementById("sidebar-bottom");

    data.sidebar.main.forEach(item => {
        mainList.innerHTML += `
            <li class="row p-2">
                <a class="icon-link text-decoration-none text-reset" href="${item.href}">
                    <img src="${item.icon}" height="16" width="16"> ${item.label}
                </a>
            </li>`;
    });

    data.sidebar.bottom.forEach(item => {
        bottomList.innerHTML += `
            <li class="row p-2">
                <a class="icon-link text-decoration-none text-reset" href="${item.href}">
                    <img src="${item.icon}" height="16" width="16"> ${item.label}
                </a>
            </li>`;
    });
}

function loadHeader(data) {
    document.getElementById("header-title").textContent = data.header.title;
    document.getElementById("header-user").innerHTML = `
        <p class="col fs-6"><small>${data.header.user.name}</small></p>
        <img class="img col-4" src="${data.header.user.photo}" alt="User">
    `;
}

function loadOverviewCounters(data) {
    const container = document.getElementById("overview-counters");
    data.overviewCounters.forEach(item => {
        container.innerHTML += `
            <section class="container-fluid m-2 col-sm text-center bg-body border border-2 border-light-subtle rounded tickets">
                <p class="text-black-50">${item.label}</p>
                <h2>${item.value}</h2>
            </section>`;
    });
}

function loadTrends(data) {
    document.getElementById("trend-date").textContent = data.trends.date;
    document.getElementById("trend-img").src = data.trends.image;
}

function loadStatistics(data) {
    const container = document.getElementById("stats");
    data.statistics.forEach(item => {
        container.innerHTML += `
            <section class="row p-3 border-bottom border-light-subtle">
                <h6 class="fw-semibold">${item.label}</h6>
                <p>${item.value}</p>
            </section>`;
    });
}

function loadTickets(data) {
    const container = document.getElementById("tickets-list");
    data.tickets.forEach(item => {
        container.innerHTML += `
            <section class="row row-cols-auto justify-content-between p-2 border-bottom border-dark-subtle">
                <p class="col-9 text-light-emphasis">${item.label}</p>
                <p class="col text-light-emphasis">${item.value}</p>
            </section>`;
    });
}

function loadTasks(data) {
    const container = document.getElementById("tasks-list");
    data.tasks.forEach(item => {
        container.innerHTML += `
            <section class="row row-cols-auto justify-content-between p-2 border-bottom border-dark-subtle">
                <p class="col-9 text-light-emphasis">${item.label}</p>
                <p class="col text-light-emphasis ${item.class} rounded">${item.status}</p>
            </section>`;
    });
}

async function getData() {
    const data = await loadJSON();
    await loadSidebar(data);
    loadHeader(data);
    loadOverviewCounters(data);
    loadTrends(data);
    loadStatistics(data);
    loadTickets(data);
    loadTasks(data);
}

getData();
