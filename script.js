//Function to calculate GPA
function calculateGPA() {
    var allCourses = document.querySelectorAll('.container_input_box');
    var totalCreditHours = 0;
    var totalGradePoints = 0;

    allCourses.forEach(function (course) {
        var creditInput = course.querySelector('.input_box_credit');
        var marksInput = course.querySelector('.input_box_marks');
        var credit = parseFloat(creditInput.value);
        var marks = parseFloat(marksInput.value);

        if (!isNaN(credit) && !isNaN(marks)) {
            var grade = calculateGrade(marks); // Calculate grade based on marks
            totalCreditHours += credit;
            totalGradePoints += (credit * grade);
        }
    });

    if (totalCreditHours > 0) {
        var gpa = totalGradePoints / totalCreditHours;
        document.getElementById('gpaResult').textContent = gpa.toFixed(2); // Display GPA with two decimal places

        // Update the doughnut chart
        updateDoughnutChart(gpa);
    } else {
        document.getElementById('gpaResult').textContent = "0.00"; // Display "0.00" if no valid courses
        updateDoughnutChart(0); // Update the chart with a default value of 0
    }
}


// Function to update the doughnut chart
function updateDoughnutChart(gpa) {
    if (gpaChart) {
        gpaChart.data.datasets[0].data = [gpa, 4.00 - gpa]; // Update the chart data
        gpaChart.update(); // Update the chart
    }
}

var ctx = document.getElementById('gpaChart').getContext('2d');
var gpaChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 4.00], // Initial data (0 GPA, 4.00 maximum)
            backgroundColor: ['#36A2EB', '#E7E7E7'],
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Allows you to control the aspect ratio
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'GPA Distribution',
        },
    },
});

//Function to calculate grade based on marks

function calculateGrade(marks) {
    if (marks >= 85) {
        return 4.00;
    } else if (marks == 84) {
        return 3.94;
    } else if (marks == 83) {
        return 3.87;
    } else if (marks == 82) {
        return 3.80;
    } else if (marks == 81) {
        return 3.74;
    } else if (marks == 80) {
        return 3.67;
    } else if (marks == 79) {
        return 3.60;
    } else if (marks == 78) {
        return 3.54;
    } else if (marks == 77) {
        return 3.47;
    } else if (marks == 76) {
        return 3.40;
    } else if (marks == 75) {
        return 3.34;
    } else if (marks == 74) {
        return 3.27;
    } else if (marks == 73) {
        return 3.20;
    } else if (marks == 72) {
        return 3.14;
    } else if (marks == 71) {
        return 3.07;
    } else if (marks == 70) {
        return 3.00;
    } else if (marks == 69) {
        return 2.95;
    } else if (marks == 68) {
        return 2.90;
    } else if (marks == 67) {
        return 2.85;
    } else if (marks == 66) {
        return 2.80;
    } else if (marks == 65) {
        return 2.75;
    } else if (marks == 64) {
        return 2.70;
    } else if (marks == 63) {
        return 2.65;
    } else if (marks == 62) {
        return 2.60;
    } else if (marks == 61) {
        return 2.55;
    } else if (marks == 60) {
        return 2.50;
    } else if (marks == 59) {
        return 2.40;
    } else if (marks == 58) {
        return 2.30;
    } else if (marks == 57) {
        return 2.20;
    } else if (marks == 56) {
        return 2.10;
    } else if (marks == 55) {
        return 2.00;
    } else if (marks == 54) {
        return 1.90;
    } else if (marks == 53) {
        return 1.80;
    } else if (marks == 52) {
        return 1.70;
    } else if (marks == 51) {
        return 1.60;
    } else if (marks == 50) {
        return 1.50;
    } else {
        return 0.00;
    }
}

// Function to add hover effect to course containers
function addHoverEffect(courseDiv) {
    courseDiv.addEventListener('mouseenter', function () {
        courseDiv.classList.add('hovered'); // Add the hover effect class
    });
    courseDiv.addEventListener('mouseleave', function () {
        courseDiv.classList.remove('hovered'); // Remove the hover effect class
    });
}

// Function to create a new course container
function createCourseContainer() {
    var container = document.getElementById("courseContainer");

    var courseDiv = document.createElement("div");
    courseDiv.className = "container_input_box"; // Add the same class as the existing ones

    var courseNameInput = document.createElement("input");
    courseNameInput.type = "text";
    courseNameInput.name = "courseName";
    courseNameInput.placeholder = "Course Name";
    courseNameInput.className = "inputBox input_box_name courseNameClass";
    courseDiv.appendChild(courseNameInput);

    var creditInput = document.createElement("input");
    creditInput.type = "number";
    creditInput.name = "credit";
    creditInput.placeholder = "Credit Hours";
    creditInput.className = "inputBox input_box_credit creditClass"; // Use the same class name as existing courses
    courseDiv.appendChild(creditInput);

    var marksInput = document.createElement("input");
    marksInput.type = "number";
    marksInput.name = "marks";
    marksInput.min = "0";
    marksInput.max = "100";
    marksInput.placeholder = "Marks";
    marksInput.className = "inputBox input_box_marks marksClass"; // Use the same class name as existing courses
    courseDiv.appendChild(marksInput);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10005";
    deleteButton.className = "delete_button";

    deleteButton.onclick = function () {
        container.removeChild(courseDiv);
        calculateGPA(); // Recalculate GPA after deletion
    };
    courseDiv.appendChild(deleteButton);
    container.appendChild(courseDiv);

    return courseDiv;
}
//Function to add new course
function addCourse() {
    var container = document.getElementById("courseContainer");
    var courseDiv = createCourseContainer();
    container.appendChild(courseDiv);

    // Apply hover effect to the dynamically added course container
    addHoverEffect(courseDiv);
}

// Apply hover effect to existing course containers
var existingCourseContainers = document.querySelectorAll('.container_input_box');
existingCourseContainers.forEach(function (courseDiv) {
    addHoverEffect(courseDiv);
});


//Delete existing courses
document.addEventListener('DOMContentLoaded', function() {
    var deleteButtons = document.querySelectorAll('.deleteCourse');

    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var courseDiv = button.parentElement;
            courseDiv.remove();
            calculateGPA(); // Recalculate GPA after deletion
        });
    });
});


// Theme switch button functionality
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.fa-sun');
const moonIcon = document.querySelector('.fa-moon');
const body = document.body;

if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
} else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    // Switch to light mode
    body.classList.remove('dark-mode');
    moonIcon.style.display = 'inline'; // Show moon icon
    sunIcon.style.display = 'none';  // Hide sun icon
  } else {
    // Switch to dark mode
    body.classList.add('dark-mode');
    moonIcon.style.display = 'none';   // Hide moon icon
    sunIcon.style.display = 'inline'; // Show sun icon
  }
});

// Function to set the initial max-height value
function initializeDropdown() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
}
// Call the function when page loads
window.addEventListener("load", initializeDropdown);

let isDropdownTransitioning = false; // Flag to track if dropdown is in transition

// Function to toggle the dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    const dropdownToggle = document.getElementById("dropdown-toggle");

    if (!isDropdownTransitioning) { // Check if dropdown is not in transition
        isDropdownTransitioning = true; // Set flag to true
        dropdownToggle.disabled = true; // Disable the button during the transition

        if (dropdownMenu.classList.contains("open")) {
            // Close the dropdown menu
            dropdownMenu.style.maxHeight = "0";
            setTimeout(() => {
                dropdownMenu.style.display = "none";
                isDropdownTransitioning = false; // Reset flag after transition
                dropdownToggle.disabled = false; // Enable the button
            }, 1000); // Adjust the delay as needed
            dropdownToggle.innerHTML = '<i class="fas fa-bars"></i>';
            dropdownMenu.classList.remove("open");
        } else {
            // Open the dropdown menu
            dropdownMenu.style.display = "block";
            setTimeout(() => {
                dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
                isDropdownTransitioning = false; // Reset flag after transition
                dropdownToggle.disabled = false; // Enable the button
            }, 0); // Start the transition immediately
            dropdownToggle.innerHTML = '<i class="fas fa-times"></i>';
            dropdownMenu.classList.add("open");
        }
    }
}
//Event listner to toggle the dropdown menu when the button is clicked
const dropdownToggle = document.getElementById("dropdown-toggle");
dropdownToggle.addEventListener("click", toggleDropdown)
