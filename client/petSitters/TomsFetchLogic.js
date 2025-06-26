async function FetchPetSitters()
{
    const res = await fetch("https://week5-petsitterapp-server.onrender.com/accounts/getByType/petSitter");
    const accounts = await res.json();
    return accounts;
}