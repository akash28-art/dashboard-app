const token = localStorage.getItem("token");

async function fetchUsers() {
  const res = await fetch("http://localhost:5000/users", {
    headers: {
      Authorization: token
    }
  });

  const users = await res.json();

  let html = "";

  users.forEach(user => {
    html += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("usersTable").innerHTML = html;
}

async function addUser() {
  await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value
    })
  });

  fetchUsers();
}

async function deleteUser(id) {
  await fetch(`http://localhost:5000/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token
    }
  });

  fetchUsers();
}

fetchUsers();