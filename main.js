const tablebutton = document.getElementById("table-btn");

tablebutton.addEventListener("click", createnewdiv);

function createnewdiv() {
  loadTableCreationForm();
}

function loadTableCreationForm() {
  const newDiv = document.createElement("div");
  newDiv.className = "div";
  newDiv.innerHTML = `
      <h1>Create Table</h1>
      <label for="Tname">Table Name</label>
      <input type="text" id="Tname" style="width: 90%" />
      <label for="Fname">Field Name</label>
      <input type="text" id="Fname" style="width: 90%" />
      <label for="type">Type</label>
      <input type="text" id="type" style="width: 90%" />
      <br>
      <button id="submit">Create table</button>`;

  document.body.appendChild(newDiv);

  // After loading the form, you can add an event listener to the "submit" button
  const submit = document.getElementById("submit");
  submit.addEventListener("click", () => createtable());
}

function createtable() {
  const tablename = document.getElementById("Tname").value;
  const fieldname = document.getElementById("Fname").value;
  const type = document.getElementById("type").value;

  const obj = {
    tablename: tablename,
    fieldname: fieldname,
    type: type,
  };
  axios
    .post("http://localhost:5000/createTable", obj)
    .then((response) => {
      tabshow(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function tabshow(param) {
  const tabbutton = document.createElement("button");
  tabbutton.textContent = param;
  document.body.appendChild(tabbutton);
  tabbutton.addEventListener("click", () => action(param));
}

function action(param) {
  axios
    .get("http://localhost:5000/show", { params: { name: param } })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
