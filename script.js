// Function to update the clock display
function updateTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    document.querySelector('.clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to set an alarm
function setAlarm() {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const second = document.getElementById('second').value;
    const ampm = document.getElementById('ampm').value;
    const alarmTime = `${hour}:${minute}:${second} ${ampm}`;
    
    const listItem = document.createElement('div');
    listItem.className = 'alarm-item';
    listItem.innerHTML = `
        <span>${alarmTime}</span>
        <button class="delete-btn">Delete</button>
    `;
    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        clearTimeout(timeout);
        listItem.remove();
    });
    document.getElementById('alarms').appendChild(listItem);
    const alarmDateTime = new Date();
    alarmDateTime.setHours(ampm === 'PM' ? parseInt(hour) + 12 : parseInt(hour));
    alarmDateTime.setMinutes(parseInt(minute));
    alarmDateTime.setSeconds(parseInt(second));
    
    // Calculate timeout to the next occurrence if the alarm time is in the past
    let timeout = alarmDateTime - Date.now();
    if (timeout < 0) {
        timeout += 24 * 60 * 60 * 1000; // Add 24 hours
    }

    timeout = setTimeout(() => {
        alert(`Alarm! It's ${alarmTime}`);
        listItem.remove();
    }, timeout);

    // Store the timeout value in a data attribute for future reference
    listItem.dataset.timeoutId = timeout;
}

// Event listener for setting alarm
document.getElementById('setAlarm').addEventListener('click', setAlarm);

// Function to update clock display every second
setInterval(updateTime, 1000);
updateTime(); // Call updateTime once to display initial time
