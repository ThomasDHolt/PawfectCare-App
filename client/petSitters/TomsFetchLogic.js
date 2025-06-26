async function FetchPetSitters()
{
    // TODO: Change url so we fetch by account type
    const res = await fetch("https://week5-petsitterapp-server.onrender.com/accounts");
    const accounts = await res.json();
    return accounts;
}