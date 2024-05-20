// Initialize an array to store tracked habits
const trackedHabits = [];

// Function to add a new habit
function addHabit() {
    const habitNameInput = document.querySelector('.habit-name');
    const habitDateInput = document.querySelector('.habit-date');
    const habitTimeInput = document.querySelector('.habit-time');

    // Get the habit details
    const habitName = habitNameInput.value.trim();
    const habitDate = habitDateInput.value;
    const habitTime = habitTimeInput.value;

    // Validate input
    if (!habitName || !habitDate || !habitTime) {
        alert('Please fill in all habit details (name, date, and time).');
        return; // Stop execution if any field is missing
    }

    // Create a habit object
    const habit = {
        name: habitName,
        date: habitDate,
        time: habitTime,
        endDate: new Date(`${habitDate}T${habitTime}`) // Store the combined date and time as endDate
    };  

    // Add the habit to the trackedHabits array
    trackedHabits.push(habit);

    // Clear input fields
    habitNameInput.value = '';
    habitDateInput.value = '';
    habitTimeInput.value = '';

    // Display the updated list of habits
    displayHabits();
}

// Function to display tracked habits
function displayHabits() {
    const activitiesContainer = document.getElementById('activities');
    activitiesContainer.innerHTML = ''; // Clear existing content

    trackedHabits.forEach((habit, index) => {
        const habitCard = document.createElement('div');
        habitCard.classList.add('habit-card');

        // Calculate days since stopped
        const daysSinceStopped = calculateDaysPassed(habit.endDate);

        habitCard.innerHTML = `
            <h2>${habit.name}</h2>
            <p>Date: ${habit.date}, Time: ${habit.time}</p>
            <p>Days Since Stopped: ${daysSinceStopped}</p>
            <button class="delete-button" onclick="deleteHabit(${index})">Delete</button>
        `;

        activitiesContainer.appendChild(habitCard);
    });
}

// Function to calculate days passed
function calculateDaysPassed(endDate) {
    const today = new Date();
    const timeDifference = today - new Date(endDate);
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPassed;
}

// Function to delete a habit
function deleteHabit(index) {
    trackedHabits.splice(index, 1);
    displayHabits();
}

// Initial display of habits
displayHabits();
