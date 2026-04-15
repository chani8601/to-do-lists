import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { add, edit, remove } from '../../store/reducer/ProjectSlice'
import { useNavigate } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

function ProjectList() {
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projectState.projects)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    const newProject = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      date: new Date().toISOString(),
      tasks: []
    }
    dispatch(add(newProject))
    reset()
    setShowForm(false)
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333', margin: 0 }}>
          <i className="pi pi-folder-open" style={{ marginRight: '0.5rem', color: '#00BCD4' }}></i>
          My Projects
        </h1>
        <Button label="+ Add Project" icon="pi pi-plus" onClick={() => setShowForm(true)} style={{ backgroundColor: '#00BCD4', border: 'none' }} />
      </div>

      <Dialog header="Add New Project" visible={showForm} onHide={() => setShowForm(false)} style={{ width: '400px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
          <FloatLabel>
            <InputText id="name" style={{ width: '100%' }} {...register("name")} />
            <label htmlFor="name">Project Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputText id="description" style={{ width: '100%' }} {...register("description")} />
            <label htmlFor="description">Description</label>
          </FloatLabel>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button type="submit" label="Save" icon="pi pi-check" style={{ backgroundColor: '#00BCD4', border: 'none' }} />
            <Button type="button" label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={() => setShowForm(false)} />
          </div>
        </form>
      </Dialog>

      <div className="flex flex-wrap gap-4">
        {projects.map(project => {
          const header = (
            <img alt="project" src="/src/Images/abstract-soft-pastel-colorful-background.jpg" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          )
          const footer = (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button icon="pi pi-pencil" className="p-button-sm" style={{ backgroundColor: '#1976D2', border: 'none' }} onClick={(e) => { e.stopPropagation(); setEditingId(project.id) }} />
              <Button icon="pi pi-trash" className="p-button-sm" style={{ backgroundColor: '#D32F2F', border: 'none' }} onClick={(e) => { e.stopPropagation(); dispatch(remove(project.id)) }} />
            </div>
          )

          return (
            <Card
              key={project.id}
              header={header}
              footer={footer}
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{ cursor: 'pointer', width: '280px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' }}
              title={<span style={{ color: '#00BCD4', fontWeight: 'bold' }}>{project.name}</span>}
              subTitle={project.description}
            >
              {editingId === project.id ? (
                <form onSubmit={handleSubmit((data) => {
                  dispatch(edit({ ...project, name: data.name }))
                  setEditingId(null)
                })} onClick={(e) => e.stopPropagation()}>
                  <InputText defaultValue={project.name} {...register("name")} style={{ width: '100%', marginBottom: '0.5rem' }} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button type="submit" label="Save" className="p-button-sm" style={{ backgroundColor: '#00BCD4', border: 'none' }} />
                    <Button type="button" label="Cancel" className="p-button-sm p-button-secondary" onClick={(e) => { e.stopPropagation(); setEditingId(null) }} />
                  </div>
                </form>
              ) : (
                <p style={{ color: '#888', fontSize: '0.85rem' }}>📅 {new Date(project.date).toLocaleDateString()}</p>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectList
