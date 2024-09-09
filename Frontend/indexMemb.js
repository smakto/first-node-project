let mainMembershipsDiv = document.querySelector(".renderedMembs");
let takenPlans = [];

async function getData() {
  const response = await fetch(`http://localhost:3000/memberships`);
  const membList = await response.json();
  renderMemberships(membList);
}

async function getTakenPlans() {
  const response = await fetch(`http://localhost:3000/users/1`);
  const userList = await response.json();
  userList.forEach((user) => takenPlans.push(user.service_id));
  takenPlans = [...new Set(takenPlans)];
}

function renderMemberships(data) {
  data.forEach((plan) => {
    let divCreate = document.createElement("div");
    let priceCreate = document.createElement("p");
    let planDescription = document.createElement("h4");
    let divCreateDel = document.createElement("div");
    let divCreateDelId = document.createElement("div");

    divCreate.classList.add("membershipBlock");

    mainMembershipsDiv.appendChild(divCreate);
    divCreate.appendChild(priceCreate);
    divCreate.appendChild(planDescription);
    divCreate.appendChild(divCreateDel);
    divCreateDel.appendChild(divCreateDelId);

    priceCreate.innerText = `$${plan.price} ${plan.name}`;
    planDescription.innerText = plan.description;
    divCreateDelId.innerHTML = `<i class="fa-solid fa-trash fa-l" style="color: #da2537;"></i>`;

    console.log(takenPlans.includes(plan._id));

    divCreateDelId.addEventListener("click", async (event) => {
      if (!takenPlans.includes(plan._id)) {
        try {
          const response = await fetch(
            `http://localhost:3000/memberships/delete/${plan._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          location.reload();
        } catch (e) {
          alert("error");
        }
      } else alert("No can do - plan taken");
    });
  });
}

getTakenPlans();
getData();
