import bcrypt from "bcryptjs"

const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let errors = [];

  if (firstname_input) {
    //If we have a firstname input the we are in the signup
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );

    const formData = new FormData(form);
    const newAccountData = Object.fromEntries(formData);

    await HandleSignUp(newAccountData);
  } else {
    // If we dont have a firstname input the we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    // if there any errors inside array
    error_message.innerText = errors.join(". ");
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
  }
  if (password !== repeatPassword) {
    errors.push("Passwords do not match");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}
const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
];

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

async function HandleSignUp(signUpData)
{
  const salt = bcrypt.genSaltSync(10);
  const plainPassword = signUpData.password;

  const passwordHash = bcrypt.hashSync(plainPassword, salt);

  const accountObject = {
    accountName: signUpData.firstname,
    accountType: "petOwner",
    hashedPassword: passwordHash,
    salt: salt,
    personalInfoId: 100,
    email: signUpData.email
  }

  await fetch("https://week5-petsitterapp-server.onrender.com/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(accountObject)
  });
}
