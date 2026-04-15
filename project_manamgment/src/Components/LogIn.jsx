import React from 'react'     
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/reducer/UserSlice'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

function LogIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    if(data.username === "chavichani" && data.password === "1234") {
      dispatch(login(data))
      navigate('/projects')
    } else {
      setError("username", { type: "manual", message: "Invalid username or password" })
      setError("password", { type: "manual", message: "Invalid username or password" })
    }
  }

  return (
    <div className="flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f0f4f8' }}>
      <Card style={{ width: '400px', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '2px solid #00BCD4' }}>
        <h2 className="text-center mb-4" style={{ color: '#333' }}>
          <i className="pi pi-lock mr-2"></i>
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">
          <div className="flex flex-column gap-1">
            <FloatLabel>
              <InputText
                id="username"
                style={{ width: '100%', borderColor: '#00BCD4' }}
                className={errors.username ? 'p-invalid' : ''}
                {...register("username")}
              />
              <label htmlFor="username">Username</label>
            </FloatLabel>
            {errors.username && <small style={{ color: 'red' }}>{errors.username.message}</small>}
          </div>

          <div className="flex flex-column gap-1">
            <FloatLabel>
              <InputText
                id="password"
                type="password"
                style={{ width: '100%', borderColor: '#00BCD4' }}
                className={errors.password ? 'p-invalid' : ''}
                {...register("password")}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>
            {errors.password && <small style={{ color: 'red' }}>{errors.password.message}</small>}
          </div>

          <Button
            type="submit"
            label="Login"
            icon="pi pi-sign-in"
            style={{ width: '100%', backgroundColor: '#00BCD4', border: 'none' }}
          />
        </form>
      </Card>
    </div>
  )
}

export default LogIn
