const addNewUser = async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector('input[name="post-title]').value;
  const bodyInput = document.querySelector('textarea[name="post-body]').value;

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

document.querySelector("#new-post-form").addEventListener("submit", addNewUser);
