document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-job-form");
    const id = document.getElementById("id");
    const title = document.getElementById("tit");
    const salary = document.getElementById("num");
    const companyName = document.getElementById("name");
    const status = document.getElementById("stat");
 
    function displayAlert(message) {
        alert(message);
    }
 
    function validateForm() {
        if (!id.value || isNaN(id.value) || id.value <= 0) {
            alert("Please enter a valid Job ID (positive number).");
            return false;
        }
        if (!title.value.trim()) {
            displayAlert("Please enter a valid Job Title.");
            return false;
        }
        if (!salary.value || isNaN(salary.value) || salary.value <= 0) {
            displayAlert("Please enter a valid Salary (positive number).");
            return false;
        }
        if (!companyName.value.trim()) {
            displayAlert("Please enter a valid Company Name.");
            return false;
        }
        if (!status.value) {
            displayAlert("Please select a Status.");
            return false;
        }
        return true;
       
    }
 
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert("Job added successfully!");
            form.reset();
        }
    });
});