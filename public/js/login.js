const userLogIn = async (event) => {
  event.preventDefault();

  const usernameInput = document
    .querySelector("#username-input-login")
    .value.trim();
  const passwordInput = document
    .querySelector("#password-input-login")
    .value.trim();

  if (usernameInput && passwordInput) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(`Something went wrong!
      Try again!`);
    }
  }
};

document.querySelector("#login-form").addEventListener("submit", userLogIn);
