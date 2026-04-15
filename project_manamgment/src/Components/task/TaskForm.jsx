import React from 'react'

function TaskForm() {
  return (
    <div>
      <h2>טופס משימה חדשה</h2>
      <form>
        <input type="text" placeholder="שם המשימה" />
        <textarea placeholder="תיאור המשימה"></textarea>
        <button type="submit">הוסף משימה</button>
      </form>
    </div>
  )
}

export default TaskForm
