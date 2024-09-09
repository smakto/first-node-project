let newMembForm = document.forms[0];

newMembForm.addEventListener("submit", async (event) => {
  let newName = newMembForm.elements.membName.value;
  let newPrice = Number(newMembForm.elements.membPrice.value);
  let newDescription = newMembForm.elements.membDescription.value;

  let membershipEntry = {
    name: newName,
    price: newPrice,
    description: newDescription,
  };

  const response = await fetch("http://localhost:3000/memberships", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(membershipEntry),
  });
});
