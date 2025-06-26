export function getSignupFormErrors(
  firstname,
  email,
  password,
  repeatPassword
) {
  if (firstname === "" || firstname == null) {
    return "Firstname is required";
  }
  if (email === "" || email == null) {
    return "Email is required";
  }
  if (password === "" || password == null) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must have at least 8 characters";
  }
  if (password !== repeatPassword) {
    return "Passwords do not match";
  }
}
