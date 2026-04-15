import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../store/reducer/ProjectSlice'
import { useForm } from 'react-hook-form'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import TaskCard from '../task/TaskCard'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

function ProjectCard() {
  const { id } = useParams()
  const project = useSelector(state =>
    state.projectState.projects.find(p => p.id === Number(id)))

  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    dispatch(addTask({ id: Number(id), task: { id: Date.now(), ...data } }))
    reset()
    setShowForm(false)
  }

  if (!project) return <div>Project not found</div>

  const todo = project.tasks.filter(t => t.status === "To Do")
  const inProgress = project.tasks.filter(t => t.status === "In Progress")
  const done = project.tasks.filter(t => t.status === "Done")
  const testing = project.tasks.filter(t => t.status === "Testing")

  const columnStyle = {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem',
    minHeight: '400px'
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{project.name}</h2>
        <Button label="+ Add Task" onClick={() => setShowForm(true)} style={{ backgroundColor: '#4CAF50', border: 'none' }} />
      </div>

      <Dialog header="Add Task" visible={showForm} onHide={() => setShowForm(false)} closeIcon={<i className="pi pi-times" style={{ color: 'black' }} />}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input placeholder="Title" {...register("title")} style={{ padding: '0.5rem' }} />
          <input placeholder="Description" {...register("description")} style={{ padding: '0.5rem' }} />
          <select {...register("status")} style={{ padding: '0.5rem' }}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Testing">Testing</option>
          </select>
          <select {...register("priority")} style={{ padding: '0.5rem' }}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" {...register("dueDate")} style={{ padding: '0.5rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button type="submit" label="Save" icon="pi pi-check" style={{ backgroundColor: '#00BCD4', border: 'none' }} />
            <Button type="button" label="Cancel" icon="pi pi-times" style={{ backgroundColor: '#D32F2F', border: 'none' }} onClick={() => setShowForm(false)} />
          </div>
        </form>
      </Dialog>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={columnStyle}>
          <h3 style={{ textAlign: 'center', color: '#6c757d' }}>📋 To Do</h3>
          {todo.map(task => <TaskCard key={task.id} taskId={task.id} />)}
        </div>
        <div style={columnStyle}>
          <h3 style={{ textAlign: 'center', color: '#007bff' }}>⚙️ In Progress</h3>
          {inProgress.map(task => <TaskCard key={task.id} taskId={task.id} />)}
        </div>
        <div style={columnStyle}>
          <h3 style={{ textAlign: 'center', color: '#ffc107' }}>🔍 Testing</h3>
          {testing.map(task => <TaskCard key={task.id} taskId={task.id} />)}
        </div>
        <div style={columnStyle}>
          <h3 style={{ textAlign: 'center', color: '#28a745' }}>✅ Done</h3>
          {done.map(task => <TaskCard key={task.id} taskId={task.id} />)}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
