const userLogIn = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector("#username-input-login");
  const passwordInput = document.querySelector("#password-input-login");

  const logIn = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (logIn.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(`Something went wrong!
      Try again!`);
  }
};

document.querySelector("#login-form").addEventListener("submit", userLogIn);
