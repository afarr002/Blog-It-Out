const postId = document.querySelector('input[name="post-id]').value;

const editUserPost = async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector('input[name="post-title"]').value;
  const bodyInput = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/dashboard");
};

const deleteUserPost = async () => {
  await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editUserPost);

document.querySelector("#delete-btn").addEventListener("click", deleteUserPost);
