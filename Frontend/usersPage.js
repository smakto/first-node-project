let mainUserDiv = document.querySelector(".users");
let sortArea = document.querySelector("section p");
let awesomeI = document.querySelector("section i");

async function getData(seq) {
  const response = await fetch(`http://localhost:3000/users/${Number(seq)}`);
  const userList = await response.json();

  userList.forEach((item) => {
    let cardDiv = document.createElement("div");
    let name = document.createElement("h3");
    let email = document.createElement("p");
    let membership = document.createElement("p");
    let userIp = document.createElement("p");

    mainUserDiv.appendChild(cardDiv);
    cardDiv.appendChild(name);
    cardDiv.appendChild(email);
    cardDiv.appendChild(membership);
    cardDiv.appendChild(userIp);

    name.innerText = `${item.name} ${item.surname}`;
    email.innerText = `Email address: ${item.email}`;
    membership.innerText = `Membership: ${item.services[0].name}`;
    userIp.innerText = `IP: ${item.ip}`;
  });
}

awesomeI.addEventListener("click", (event) => {
  if (awesomeI.classList.contains("fa-arrow-down-a-z")) {
    clearData();
    getData(-1);
    awesomeI.classList.replace("fa-arrow-down-a-z", "fa-arrow-down-z-a");
  } else if (awesomeI.classList.contains("fa-arrow-down-z-a")) {
    clearData();
    getData(1);
    awesomeI.classList.replace("fa-arrow-down-z-a", "fa-arrow-down-a-z");
  }
});

function clearData() {
  mainUserDiv.innerHTML = "";
}

getData(1);
