import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeTask, editTask, changeStatus } from '../../store/reducer/ProjectSlice'
import { useForm } from 'react-hook-form'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const priorityColor = { High: '#ff4d4d', Medium: '#ffa500', Low: '#28a745' }

function TaskCard({ taskId }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const task = useSelector(state =>
    state.projectState.projects.find(p => p.id === Number(id))?.tasks.find(t => t.id === taskId))

  const { register, handleSubmit } = useForm()

  if (!task) return null

  const onSubmit = (data) => {
    dispatch(editTask({ id: Number(id), task: { id: taskId, ...data } }))
    setIsEditing(false)
  }

  const footer = (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {showStatus ? (
        <select value={task.status} onChange={(e) => { dispatch(changeStatus({ id: Number(id), task: { id: taskId, status: e.target.value } })); setShowStatus(false) }} style={{ padding: '0.3rem' }}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Testing">Testing</option>
        </select>
      ) : (
      <Button label="Status" icon="pi pi-sync" className="p-button-sm" style={{ backgroundColor: '#00BCD4', border: 'none' }} onClick={() => setShowStatus(true)} />
      )}
      <Button label="Edit" icon="pi pi-pencil" className="p-button-sm" style={{ backgroundColor: '#1976D2', border: 'none' }} onClick={() => setIsEditing(true)} />
      <Button label="Delete" icon="pi pi-trash" className="p-button-sm" style={{ backgroundColor: '#D32F2F', border: 'none' }} onClick={() => dispatch(removeTask({ id: Number(id), task: { id: taskId } }))} />
    </div>
  )

  return (
    <>
      <Card footer={footer} style={{ marginBottom: '0.5rem', borderLeft: `4px solid ${priorityColor[task.priority] || '#ccc'}` }}>
        <h4 style={{ margin: 0 }}>{task.title}</h4>
        <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{task.description}</p>
        <p style={{ color: priorityColor[task.priority], fontWeight: 'bold', fontSize: '0.8rem' }}>{task.priority}</p>
        <p style={{ fontSize: '0.8rem' }}>📅 {task.dueDate}</p>
      </Card>

      <Dialog header="Edit Task" visible={isEditing} onHide={() => setIsEditing(false)} closeIcon={<i className="pi pi-times" style={{ color: 'black' }} />}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input defaultValue={task.title} placeholder="Title" {...register("title")} style={{ padding: '0.5rem' }} />
          <input defaultValue={task.description} placeholder="Description" {...register("description")} style={{ padding: '0.5rem' }} />
          <select defaultValue={task.status} {...register("status")} style={{ padding: '0.5rem' }}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Testing">Testing</option>
          </select>
          <select defaultValue={task.priority} {...register("priority")} style={{ padding: '0.5rem' }}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" defaultValue={task.dueDate} {...register("dueDate")} style={{ padding: '0.5rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button type="submit" label="Save" icon="pi pi-check" style={{ backgroundColor: '#00BCD4', border: 'none' }} />
            <Button type="button" label="Cancel" icon="pi pi-times" style={{ backgroundColor: '#D32F2F', border: 'none' }} onClick={() => setIsEditing(false)} />
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default TaskCard
