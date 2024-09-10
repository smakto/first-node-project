let userEmails = [];
let membershipIds = [];
let newUserForm = document.forms[0];

async function renderOptions() {
  const response = await fetch(`http://localhost:3000/memberships`);
  const membershipList = await response.json();
  membershipList.forEach((membership) => {
    let newOption = document.createElement("option");
    newOption.innerText = membership.name;
    document.querySelector("select").appendChild(newOption);
    membershipIds.push(membership);
  });
}

async function getTakenMails() {
  const response = await fetch(`http://localhost:3000/users/1`);
  const userList = await response.json();
  userList.forEach((user) => userEmails.push(user.email));
}

newUserForm.addEventListener("submit", async (event) => {
  if (!userEmails.includes(newUserForm.elements.userEmail.value)) {
    let newName = newUserForm.elements.userName.value;
    let newSurname = newUserForm.elements.userSurame.value;
    let newUserEmail = newUserForm.elements.userEmail.value;
    let newUserMembID = "";

    for (let i = 0; i < membershipIds.length; i++) {
      if (membershipIds[i].name === newUserForm.elements.selectMemb.value) {
        newUserMembID = membershipIds[i]._id;
      }
    }

    let userEntry = {
      name: newName,
      surname: newSurname,
      email: newUserEmail,
      service_id: newUserMembID,
    };

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEntry),
    });
  } else {
    alert("No can do - email taken.");
  }
  window.location.href = "./usersPage.html";
});

getTakenMails();
renderOptions();
