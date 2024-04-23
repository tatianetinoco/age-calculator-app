document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("ageCalculatorForm");
  const errorDay = document.getElementById("errorDay");
  const errorMonth = document.getElementById("errorMonth");
  const errorYear = document.getElementById("errorYear");
  const labelDay = document.getElementById("errorLabelDay");
  const labelMonth = document.getElementById("errorLabelMonth");
  const labelYear = document.getElementById("errorLabelYear");
  const inputDay = document.getElementById("day");
  const inputMonth = document.getElementById("month");
  const inputYear = document.getElementById("year");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const inputValueDay = inputDay.value.trim();
    const inputValueMonth = inputMonth.value.trim();
    const inputValueYear = inputYear.value.trim();

    let isValid = true;

    if (!inputValueDay) {
      errorDay.textContent = "This field is required";
      inputDay.classList.add("errorInput");
      labelDay.id = "errorLabel";
      isValid = false;
      
    } else if (isNaN(inputValueDay) || parseInt(inputValueDay) < 1 || parseInt(inputValueDay) > 31 || (parseInt(inputValueMonth) == 4 && parseInt(inputValueDay) > 30)) {
      errorDay.textContent = "Must be a valid day";
      inputDay.classList.add("errorInput");
      labelDay.id = "errorLabel";
      isValid = false;
    } else {
      errorDay.textContent = "";
      inputDay.classList.remove("errorInput");
      labelDay.removeAttribute("id");
    }

    if (!inputValueMonth) {
      errorMonth.textContent = "This field is required";
      inputMonth.classList.add("errorInput");
      labelMonth.id = "errorLabel";
      isValid = false;
    } else if (isNaN(inputValueMonth) || parseInt(inputValueMonth) < 1 || parseInt(inputValueMonth) > 12) {
      errorMonth.textContent = "Must be a valid month";
      inputMonth.classList.add("errorInput");
      labelMonth.id = "errorLabel";
      isValid = false;
    } else {
      errorMonth.textContent = "";
      inputMonth.classList.remove("errorInput");
      labelMonth.removeAttribute("id");
    }

    if (!inputValueYear) {
      errorYear.textContent = "This field is required";
      inputYear.classList.add("errorInput");
      labelYear.id = "errorLabel";
      isValid = false;
    } else if (isNaN(inputValueYear) || parseInt(inputValueYear) > new Date().getFullYear()) {
      errorYear.textContent = "Must be in the past";
      inputYear.classList.add("errorInput");
      labelYear.id = "errorLabel";
      isValid = false;
    } else if (parseInt(inputValueYear) < 1900){
      errorYear.textContent = "Year must be between 1900 and current Year";
      inputYear.classList.add("errorInput");
      labelYear.id = "errorLabel";
      isValid = false;
    } else {
      errorYear.textContent = "";
      inputYear.classList.remove("errorInput");
      labelYear.removeAttribute("id");
    }

    if (isValid) {
      calculateAge(parseInt(inputValueDay), parseInt(inputValueMonth), parseInt(inputValueYear));
    }
  });

  function calculateAge(day, month, year) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let years = currentYear - year;
    let months = currentMonth - month;
    let days = currentDay - day;

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastDayOfPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
      days += lastDayOfPreviousMonth;
      months--;
    }

    displayAge(years, months, days);
  }

  function displayAge(years, months, days) {
    const resultYears = document.querySelector(".card__result__years");
    const resultMonths = document.querySelector(".card__result__months");
    const resultDays = document.querySelector(".card__result__days");

    resultYears.textContent = years;
    resultMonths.textContent = months;
    resultDays.textContent = days;
  }
});
