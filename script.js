document.body.innerHTML = `
<div class="user-form">
<input type="text" placeholder="Enter user name" class="add-user-name">
<input type="text" placeholder="Enter pic url" class="add-user-avatar">
<button onclick="addUser()">ADD USER</button>
</div>
<section class="container-list"></section>`;

async function getAllDetails() {
  const data = await fetch("https://616a3fa516e7120017fa0ee6.mockapi.io/users");
  const details = await data.json();
  const userContainer = document.querySelector(".container-list");
  userContainer.innerHTML = "";
  details.forEach((user) => {
    userContainer.innerHTML += `
    <div class="container">
    <img class="userAvatar" src="${user.avatar}">
    <div>
    <p class="userName">${user.name}</p>
    <button onclick="editUser(${user.id})">EDIT</button>
    <button onclick="deleteUser(${user.id})">DELETE</button>
    <div class="edit-user-form edit-${user.id}">
    <input type="text" value="${user.name}" placeholder="Enter your name" class="edit-${user.id}-user-name">
    <input type="text" value="${user.avatar}" placeholder="Enter pic url" class="edit-${user.id}-user-avatar">
    <button onclick="saveUser(${user.id})">Save</button>
    </div>
    </div>
    </div>`;
  });
  console.log(details);
}
getAllDetails();

async function deleteUser(userId) {
  // console.log("deleting...", userId);
  const data = await fetch(
    "https://616a3fa516e7120017fa0ee6.mockapi.io/users/" + userId,
    { method: "DELETE" }
  );
  getAllDetails();
}

async function addUser() {
  const name = document.querySelector(".add-user-name").value;
  const avatar = document.querySelector(".add-user-avatar").value;
  const data = await fetch(
    "https://616a3fa516e7120017fa0ee6.mockapi.io/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, avatar: avatar }),
    }
  );
  getAllDetails();
}

function editUser(userId) {
  const editUserForm = document.querySelector(`.edit-${userId}`);
  editUserForm.style.display =
    editUserForm.style.display === "block" ? "none" : "block";
}

async function saveUser(userId) {
  const name = document.querySelector(`.edit-${userId}-user-name`).value;
  const avatar = document.querySelector(`.edit-${userId}-user-avatar`).value;
  const data = await fetch(
    "https://616a3fa516e7120017fa0ee6.mockapi.io/users/" + userId,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, avatar: avatar }),
    }
  );
  getAllDetails();
}


