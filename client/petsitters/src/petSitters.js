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

        const div = document.createElement("div");

        const name = document.createElement("p");
        const location = document.createElement("p");
        const description = document.createElement("p");
        const fees = document.createElement("p");

        console.log(div);

        div.append(name, location, description, fees);

        name.innerText = personalInfo.name;
        location.innerText = personalInfo.location;
        description.innerText = sitterInfo.description;
        fees.innerText = sitterInfo.fees;

        petSittersSection.appendChild(div);
    });
}

DisplayPetSitters();