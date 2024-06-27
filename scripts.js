document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentList = document.getElementById('appointment-list');

    // Example data for appointments
    let appointments = [
        { id: 1, patientName: 'John Doe', patientAge: 45, appointmentDate: '2024-06-27', doctorName: 'Dr. Emily White', status: 'Scheduled' },
        { id: 2, patientName: 'Jane Smith', patientAge: 34, appointmentDate: '2024-06-28', doctorName: 'Dr. Emily White', status: 'Scheduled' }
    ];

    // Function to render appointments
    function renderAppointments() {
        appointmentList.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.patientName}</td>
                <td>${appointment.patientAge}</td>
                <td>${appointment.appointmentDate}</td>
                <td>${appointment.doctorName}</td>
                <td>${appointment.status}</td>
                <td><button class="edit-btn" data-id="${appointment.id}">Edit</button> <button class="delete-btn" data-id="${appointment.id}">Delete</button></td>
            `;
            appointmentList.appendChild(row);
        });
    }

    // Initial render of appointments
    renderAppointments();

    // Form submission handler
    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newAppointment = {
            id: appointments.length + 1,
            patientName: event.target['patient-name'].value,
            patientAge: event.target['patient-age'].value,
            appointmentDate: event.target['appointment-date'].value,
            doctorName: event.target['doctor-name'].value,
            status: 'Scheduled'
        };

        appointments.push(newAppointment);
        renderAppointments();
        appointmentForm.reset();
    });

    // Event delegation for edit and delete buttons
    appointmentList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            appointments = appointments.filter(appointment => appointment.id != id);
            renderAppointments();
        } else if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            const appointment = appointments.find(appointment => appointment.id == id);
            if (appointment) {
                document.getElementById('patient-name').value = appointment.patientName;
                document.getElementById('patient-age').value = appointment.patientAge;
                document.getElementById('appointment-date').value = appointment.appointmentDate;
                document.getElementById('doctor-name').value = appointment.doctorName;

                appointments = appointments.filter(appointment => appointment.id != id);
                renderAppointments();
            }
        }
    });
});
