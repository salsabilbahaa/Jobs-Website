document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("update_job");
    const id = document.querySelector("input[name='job_id']");
    const title = document.querySelector("input[name='title']");
    const salary = document.querySelector("input[name='salary']");
    const companyName = document.querySelector("input[name='company_name']");
    const status = document.querySelector("select[name='status']");
 
   
    id.readOnly = true;
 
    function displayAlert(message) {
        alert(message);
    }
 
    function validateForm() {
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
            form.submit();
        }
    });
});
 