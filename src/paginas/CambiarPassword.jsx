// Github @josueperezparejo

import React, { Fragment, useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword = () => {

    const {guardarPassword} = useAuth()
    
    const [alerta,setAlerta] = useState({})
    const [password,setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })
    const [activo,setActivo] = useState({
        perfil: false,
        password: true
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son Obligatorios',
                error: true
            })

            return
        }

        if(password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'El Password debe tener minio 6 caracteres',
                error: true
            })
            return
        }

        const respuesta = await guardarPassword(password)
        setAlerta(respuesta)
    }

    const {msg} = alerta

    if(msg) {
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

  return (
    <Fragment>
        <AdminNav activo={activo}/>
            <h2 className='font-black text-3xl text-center mt-10'>Cambiar Password</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu <span className='font-bold text-indigo-600'>Password Aqui</span></p>

            <div className='flex justify-center'>
                <div className='w-full md:w1/2 bg-white shadow rounded-lg p-5'>
                    {msg && <Alerta alerta={alerta}/>}

                    {/* Formulario */}
                    <form action="" onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="" className='font-bold text-gray-600'>Password Actual:</label>
                            <input type="password" className='border-2 border-neutral-300 hover:border-teal-500 bg-gray-200 w-full p-2 mt-5 rounded-lg' name='pwd_actual' onChange={(e) => setPassword({...password, [e.target.name] : e.target.value})}/>
                        </div>

                        <div className='my-3'>
                            <label htmlFor="" className='font-bold text-gray-600'>Password Nueva:</label>
                            <input type="password" className='border-2 border-neutral-300 hover:border-teal-500 bg-gray-200 w-full p-2 mt-5 rounded-lg' name='pwd_nuevo' onChange={(e) => setPassword({...password, [e.target.name] : e.target.value})}/>
                        </div>

                        <input type="submit" value="Actualizar Password" className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'/>
                    </form>
                    {/* Fin Formulario */}

                </div>
            </div>
    </Fragment>
  )
}

export default CambiarPassword

// Github @josueperezparejo