const userLogIn = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector("#username-input-logic");
  const passwordInput = document.querySelector("#password-input-logic");

  const logIn = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (logIn.ok) {
    document.location.replace("/landingpage");
  } else {
    alert(`Something went wrong!
      Try again!`);
  }
};

document.querySelector("#login-form").addEventListener("submit", userLogIn);
