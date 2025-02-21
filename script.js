const form=document.querySelector("form");
const userTable=document.getElementById("userTable").getElementsByTagName("tbody")[0];

form.addEventListener("submit",(e)=>
{
    e.preventDefault()

    const name=document.getElementById("name").value
    const email=document.getElementById("email").value
    const phone=document.getElementById("phone").value
    const dob=document.getElementById("dob").value
    const address=document.getElementById("address").value
    const gender=document.getElementById("gender").value
    const hobbies=Array.from(document.querySelectorAll("input[name='hobbies']:checked")).map(hobby=>hobby.value)
    const education=document.querySelector("input[name='education']:checked").value

    const userData=
    {
        name,
        email,
        phone,
        dob,
        address,
        gender,
        hobbies,
        education
    }

   /* alter for above

   const formData = new FormData(form);

    const userData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        dob: formData.get("dob"),
        address: formData.get("address"),
        gender: formData.get("gender"),
        hobbies: formData.getAll("hobbies").join(", "),
        education: formData.get("education")
    }
        */
 

    console.log(userData)
    const row=userTable.insertRow()

   row.innerHTML=`
   <td>${row.rowIndex}</td>
   <td>${userData.name}</td>
   <td>${userData.email}</td>
   <td>${userData.phone}</td>
   <td>${userData.dob}</td>
   <td>${userData.address}</td>
   <td>${userData.gender}</td>
   <td>${userData.hobbies.join(", ")}</td>
   <td>${userData.education}</td>
   <td>
        <button onclick="deleteRow(this)">Delete</button>
        <button onclick="editRow(this)">Edit</button>
   </td>   
   `
  


   form.reset();
})
function deleteRow(btn) {
    btn.parentNode.parentNode.remove();
}

function editRow(btn) {
    let row = btn.closest("tr");
    let cells = row.getElementsByTagName("td");

    document.getElementById("name").value = cells[1].innerText;
    document.getElementById("email").value = cells[2].innerText;
    document.getElementById("phone").value = cells[3].innerText;
    document.getElementById("dob").value = cells[4].innerText;
    document.getElementById("address").value = cells[5].innerText;
    document.getElementById("gender").value = cells[6].innerText;

    let hobbies = cells[7].innerText.split(", ");
    document.querySelectorAll("input[name='hobbies']").forEach(hobby => {
        hobby.checked = hobbies.includes(hobby.value);
    });

    let educationValue = cells[8].innerText.trim();
    let educationInput = document.querySelector(`input[name='education'][value='${educationValue}']`);
    if (educationInput) {
        educationInput.checked = true;
    }

    row.remove();
}