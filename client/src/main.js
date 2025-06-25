const app = document.getElementById("app");

async function fetchNames() {
  const rawData = await fetch(`https://localhost:4000/petpals`);
  const data = await rawData.json();
  return data;
}

fetchNames();

async function displayNames() {
  app.innerHTML = "";
  const data = await fetchNames();

  accounts.forEach((account) => {
    const div = document.createElement("div");
    const nameperson = document.createElement("p");

    nameperson.innerText = account.name;
    nameperson.className = "nameperson";

    div.className = "gridForInfo";

    div.append(nameperson);
    app.appendChild(div);
  });
}

displayNames();
