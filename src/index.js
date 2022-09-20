import "./styles.css";
//Sain apua objectin value key vaihtoon blogista
const url3 =
  "https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript";
// Varmaan selitetty videoillakin, mutta mennyt ohi.

const body = document.getElementById("tableBody");

function detEmp(employment) {
  let returner = "ok";
  if (employment > 0.45) {
    returner = "good";
  } else if (employment < 0.25) {
    returner = "bad";
  } else {
    returner = "ok";
  }
  return returner;
}
async function getInfo() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065 ";
  const promise = await fetch(url);
  const promise2 = await fetch(url2);
  const userJSON = await promise.json();
  console.log(userJSON);
  const userJSON2 = await promise2.json();
  const userValue = userJSON.dataset.value;
  const userValue2 = userJSON2.dataset.value;
  const userArea = Object.entries(
    userJSON.dataset.dimension.Alue.category.index
  ).map(([key, value]) => [value, key]);
  const ryhma = [];
  const ryhma2 = [];
  for (let i = 0; i < userJSON.dataset.value.length; i++) {
    let newVar = userArea[i][1];
    let newVar2 = userJSON.dataset.dimension.Alue.category.label[newVar];
    ryhma2.push(newVar2);
  }
  console.log(ryhma2);
  for (let i = 0; i < userArea.length; i++) {
    let employmentp2 = (userValue2[i] / userValue[i]).toFixed(2);
    ryhma.push({
      municipality: ryhma2[i],
      population: userValue[i],
      employment: userValue2[i],
      employmentp: employmentp2
    });
  }
  let margin = 1;
  ryhma.forEach((user) => {
    let tr1 = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    if (margin % 2 === 0) {
      tr1.setAttribute("class", "even");
    } else {
      tr1.setAttribute("class", "odd");
    }
    let test = detEmp(user.employmentp);
    if (test !== "ok") {
      tr1.setAttribute("class", test);
    }
    td1.innerText = user.municipality;
    td2.innerText = user.population;
    td3.innerText = user.employment;
    td4.innerText = user.employmentp;
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    body.appendChild(tr1);
    margin++;
  });
}
getInfo();
