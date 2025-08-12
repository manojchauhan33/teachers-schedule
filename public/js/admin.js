  function goToAssignPage() {
    const teacherId = document.getElementById('teacherSelect').value;

    if (teacherId) {
      window.location.href = `/assign-timetable?teacherId=${teacherId}`;
    } else {
      alert('Please select a teacher.');
    }
    
  }

  
  