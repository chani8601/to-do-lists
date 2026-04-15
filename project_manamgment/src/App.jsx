import React, { useState, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'

import LogIn from './Components/LogIn'
import ProjectList from './Components/project/ProjectList'
import ProjectCard from './Components/project/ProjectCard'
import TaskList from './Components/task/TaskList'
import TaskCard from './Components/task/TaskCard'
import TaskForm from './Components/task/TaskForm'

const LazyLogIn = React.lazy(() => import('./Components/LogIn'))
const LazyProjectList = React.lazy(() => import('./Components/project/ProjectList'))
const LazyProjectCard = React.lazy(() => import('./Components/project/ProjectCard'))
const LazyTaskList = React.lazy(() => import('./Components/task/TaskList'))
const LazyTaskCard = React.lazy(() => import('./Components/task/TaskCard'))
const LazyTaskForm = React.lazy(() => import('./Components/task/TaskForm'))


function App() {

  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '2rem', padding: '1rem 2rem' }}>
        <Link to="/" style={{ color: '#00BCD4', textDecoration: 'none', fontFamily: 'Segoe UI, sans-serif', fontSize: '1.1rem', fontWeight: 'bold' }}>Login</Link>
        <Link to="/projects" style={{ color: '#00BCD4', textDecoration: 'none', fontFamily: 'Segoe UI, sans-serif', fontSize: '1.1rem', fontWeight: 'bold' }}>Projects</Link>
      </nav>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyLogIn />} />
          <Route path="/projects" element={<LazyProjectList />} />
          <Route path="/projects/:id" element={<LazyProjectCard />} />
          <Route path="/projects/:id/tasks" element={<LazyTaskList />} />
          <Route path="/projects/:id/tasks/:taskId" element={<LazyTaskCard />} />
          <Route path="/projects/:id/tasks/new" element={<LazyTaskForm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
