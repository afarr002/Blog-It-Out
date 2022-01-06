const userLogout = async () => {
  const logout = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (logout.ok) {
    document.location.replace("/");
  } else {
    alert(`Something went wrong!
      Try again!`);
  }
};

document.querySelector("#logout-link").addEventListener("click", userLogout);
