function validateHours(hours) {
    if (isNaN(hours) || hours < 0 || hours > 24) {
        return 'Please enter a valid number between 0 and 24.';
    }
    return ''; // No error
}

function validateDate(date) {
    if (!date) {
        return 'Please enter a date.';
    }
    return '';
}

function validateProject(project) {
    if (!project) {
        return 'Please enter a project name.';
    }
    if (project.length < 3) {
        return 'Project name must be at least 3 characters.';
    }
    return '';
}

document.getElementById('timesheet-form').addEventListener('submit', function(event) {
    let hours = document.getElementById('hours').value;
    let date = document.getElementById('date').value;
    let project = document.getElementById('project').value;

    let hoursError = validateHours(hours);
    let dateError = validateDate(date);
    let projectError = validateProject(project);

    if (hoursError || dateError || projectError) {
        event.preventDefault(); // Prevent form submission
        if (hoursError) {
            alert(hoursError);
        }
        if (dateError) {
            alert(dateError);
        }
        if (projectError) {
            alert(projectError);
        }
    }
});
