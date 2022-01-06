const userSignUp = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector("#username-input-signup");
  const passwordInput = document.querySelector("#password-input-signup");

  const addUser = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (addUser.ok) {
    document.location.replace("/landingpage");
  } else {
    alert(`Something went wrong!
      Try again!`);
  }
};

document.querySelector("#signup-form").addEventListener("submit", userSignUp);
