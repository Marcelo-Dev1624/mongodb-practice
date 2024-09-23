document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");
  const nameInput = document.getElementById("nameInput");
  const ageInput = document.getElementById("ageInput");

  const responseDisplay = document.getElementById("response");

  //Handling the form data submission

  window.insert = async function(){

    const name = nameInput.value;
    const age = ageInput.value;

    try {
      const response = await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      const result = await response.json();

      if (response.ok) {
        responseDisplay.innerText = `Inserted: ${JSON.stringify(result.JSON)}`;
      } else {
        responseDisplay.innerText = `Error: ${result.console.error()}`;
      }
    } catch (err) {
      responseDisplay.innerText = `Request failed: ${err.message}`;
    }
    
  }



window.fetchAllRecords = async function() {
  try {
    const response = await fetch("/api/findAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      });

      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      else{
        responseDisplay.innerText = "Showing all records on console";
      }
  
      const data = await response.json();
      console.log(data);
      } catch (err) {
        console.error('Error fetching data: ',err);
      }
    
}



fetchAllRecords();

})
