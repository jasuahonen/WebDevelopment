const address = 'http://localhost:3010/students';

const listAllBtn = document.getElementById('list-all-btn');

const studentTable = document.getElementById('student-table');

const nameInput = document.getElementById('name-input');

const infoInput = document.getElementById('info-input');

const pointsInput = document.getElementById('points-input');

const addBtn = document.getElementById('add-btn');

function listAllStudents() {
    fetch(address)
        .then(response => response.json())
        .then(students => {
            while (studentTable.firstChild) {
                studentTable.removeChild(studentTable.firstChild);
            }


            const headerRow = document.createElement('tr');
            const nameHeader = document.createElement('th');
            nameHeader.textContent = 'Name';
            headerRow.appendChild(nameHeader);
            const infoHeader = document.createElement('th');
            infoHeader.textContent = 'Info';
            headerRow.appendChild(infoHeader);
            const pointsHeader = document.createElement('th');
            pointsHeader.textContent = 'Points';
            headerRow.appendChild(pointsHeader);
            studentTable.appendChild(headerRow);


            students.forEach(student => {

                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = student.name || '–';
                row.appendChild(nameCell);
                const infoCell = document.createElement('td');
                infoCell.textContent = student.info || '–';
                row.appendChild(infoCell);
                const pointsCell = document.createElement('td');
                pointsCell.textContent = student.exercise_points != null ? student.exercise_points : '–';
                row.appendChild(pointsCell);
                if (student.exercise_points == null || student.exercise_points < 50) {
                    row.style.backgroundColor = '#fdd';
                }

                studentTable.appendChild(row);
            });

        })

        .catch(error => console.error(error));
}


function addStudent() {
    const name = nameInput.value.trim() || 'Unknown';
    const info = infoInput.value.trim() || 'No information available';
    const points = parseInt(pointsInput.value.trim()) || 0;
    const newStudent = { name, info, exercise_points: points };

    fetch(address, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
    })

        .then(response => response.json())
        .then(() => {
            nameInput.value = '';
            infoInput.value = '';
            pointsInput.value = '';
            listAllStudents();
        })

        .catch(error => console.error(error));
}


listAllBtn.addEventListener('click', listAllStudents);
addBtn.addEventListener('click', addStudent);

listAllStudents();