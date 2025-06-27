const petSittersSection = document.getElementById("petSittersSection");

async function FetchPetSitterAccounts()
{
    const res = await fetch("https://week5-petsitterapp-server.onrender.com/accounts/getByType/petSitter");
    const accounts = await res.json();
    return accounts;
}

async function FetchPetSitterPersonalInfo(infoId)
{
    const res = await fetch(`https://week5-petsitterapp-server.onrender.com/personalInfo/getById/${infoId}`);
    const personalInfo = await res.json();
    return personalInfo[0];
}

async function FetchPetSitterInfo(accountId)
{
    const res = await fetch(`https://week5-petsitterapp-server.onrender.com/petSitters/getById/${accountId}`);
    const info = await res.json();
    return info[0];
}

async function DisplayPetSitters()
{
    const petSitterAccounts = await FetchPetSitterAccounts();

    petSitterAccounts.forEach(async (singleAccount) => {
        const personalInfo = await FetchPetSitterPersonalInfo(singleAccount.personal_info_id);
        const sitterInfo = await FetchPetSitterInfo(singleAccount.account_id);

        const blockDiv = document.createElement("div");
        const topDiv = document.createElement("div");
        const mainDiv = document.createElement("div");
        const minorDetailsDiv = document.createElement("div");

        const name = document.createElement("p");
        const location = document.createElement("p");
        const description = document.createElement("p");
        const fees = document.createElement("p");
        const rating = document.createElement("p");

        topDiv.append(name, fees);
        minorDetailsDiv.append(location, rating);
        mainDiv.append(minorDetailsDiv, description);
        blockDiv.append(topDiv, mainDiv);

        topDiv.classList.add("info-block-header", "flex-container", "flex-row", "flex-space-between", "flex-centre-vertical");
        minorDetailsDiv.classList.add("minor-details-padding", "flex-container", "flex-row", "flex-space-between", "flex-centre-vertical");
        mainDiv.classList.add("info-block-main");
        blockDiv.classList.add("sitter-block-margin");
        description.classList.add("description");

        name.innerText = personalInfo.name;
        location.innerText = `Location: ${personalInfo.location}`;
        description.innerText = sitterInfo.description;
        fees.innerText = `Fees: £${sitterInfo.fees}`;
        rating.innerText = `Rated ${sitterInfo.rating} out of 5`;

        petSittersSection.appendChild(blockDiv);
    });
}

DisplayPetSitters();