// Github @josueperezparejo

import React, { Fragment, useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth()
    const [perfil,setPerfil] = useState({})
    const [alerta,setAlerta] = useState('')
    const [activo,setActivo] = useState({
        perfil: true,
        password: false
    })

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {nombre, email} = perfil
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Nombre y Email son Obligatorios',
                error: true
            })
            return
        }
        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
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
            <h2 className='font-black text-3xl text-center mt-10'>Actualiza tu Perfil</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu <span className='font-bold text-indigo-600'>Informacion Aqui</span></p>

            <div className='flex justify-center'>
                <div className='w-full md:w1/2 bg-white shadow rounded-lg p-5'>

                    {/* Formulario */}
                    <form action="" onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="" className='font-bold text-gray-600'>Nombre:</label>
                            <input type="text" className='border-2 border-neutral-300 hover:border-teal-500 bg-gray-200 w-full p-2 mt-5 rounded-lg' name='nombre' value={perfil.nombre || ''} onChange={(e) => {setPerfil({...perfil, [e.target.name] : e.target.value})}}/>
                        </div>

                        <div className='my-3'>
                            <label htmlFor="" className='font-bold text-gray-600'>Sitio Web:</label>
                            <input type="text" className='border-2 border-neutral-300 hover:border-teal-500 bg-gray-200 w-full p-2 mt-5 rounded-lg' name='web' value={perfil.web || ''} onChange={(e) => {setPerfil({...perfil, [e.target.name] : e.target.value})}}/>
                        </div>

                        <div className='my-3'>
                            <label htmlFor="" className='font-bold text-gray-600'>Telefono:</label>
                            <input type="text" className='border-2 border-neutral-300 hover:border-teal-500 bg-gray-200 w-full p-2 mt-5 rounded-lg' name='telefono' value={perfil.telefono || ''} onChange={(e) => {setPerfil({...perfil, [e.target.name] : e.target.value})}}/>
                        </div>

                        <div className='my-3'>
                            <label htmlFor="" className='font-bold text-gray-600'>Email:</label>
                            <input type="text" className='border-2 border-neutral-300 hover:border-teal-500 bg-gray-200 w-full p-2 mt-5 rounded-lg' name='email' value={perfil.email || ''} onChange={(e) => {setPerfil({...perfil, [e.target.name] : e.target.value})}}/>
                        </div>

                        <input type="submit" value="Guardar Cambios" className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'/>
                    </form>
                    {/* Fin Formulario */}

                    {msg && <Alerta alerta={alerta}/>}
                </div>
            </div>
    </Fragment>
  )
}

export default EditarPerfil

// Github @josueperezparejo