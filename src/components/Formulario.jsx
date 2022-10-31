// Github @josueperezparejo

import React, {Fragment, useState, useEffect} from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

    const [nombre,setNombre] = useState('')
    const [propietario,setPropietario] = useState('')
    const [email,setEmail] = useState('')
    const [fecha,setFecha] = useState('')
    const [sintomas,setSintomas] = useState('')
    const [id,setId] = useState(null)

    const [alerta,setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre,propietario,email,fecha,sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return;
        }

        guardarPaciente({nombre,propietario,email,fecha,sintomas, id})
        setAlerta({
            msg: 'Guardado Correctamente'
        })

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')

    }

    const {msg} = alerta

    if(msg) {
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

  return (
    <Fragment>
        <h2 className='font-bold text-3xl text-center'>Formulario</h2>
        <p className='text-lg text-center mb-10 font-bold'>Añade tus pacientes y <span className='text-indigo-600'>Administralos</span></p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} action="" className='bg-white py-10 px-5 mb-10 md:mb-0 shadow-md rounded-md'>
            <div className='mb-5'>
                <label htmlFor="nombre" className='text-gray-700 font-bold'>Nombre Mascota:</label>
                <input id='nombre' type="text" placeholder='Nombre de la Mascota' className='border-2 border-neutral-300 hover:border-teal-500 w-full p-2 mt-2 placeholder-gray-500 rounded-md' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="propietario" className='text-gray-700 font-bold'>Propietario Mascota:</label>
                <input id='propietario' type="text" placeholder='Nombre del Propietario' className='border-2 border-neutral-300 hover:border-teal-500 w-full p-2 mt-2 placeholder-gray-500 rounded-md' value={propietario} onChange={(e) => setPropietario(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="email" className='text-gray-700 font-bold'>Correo Electronico:</label>
                <input id='email' type="email" placeholder='Email del Propietario' className='border-2 border-neutral-300 hover:border-teal-500 w-full p-2 mt-2 placeholder-gray-500 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="fecha" className='text-gray-700 font-bold'>Fecha de Alta:</label>
                <input id='fecha' type="date" className='border-2 border-neutral-300 hover:border-teal-500 w-full p-2 mt-2 placeholder-gray-500 rounded-md' value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="sintomas" className='text-gray-700 font-bold'>Sintomas:</label>
                <input id='sintomas' placeholder='Describe los Sintomas' className='border-2 border-neutral-300 hover:border-teal-500 w-full p-2 mt-2 placeholder-gray-500 rounded-md' value={sintomas} onChange={(e) => setSintomas(e.target.value)} />
            </div>

            <input className='bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md' type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} />

            {msg && <Alerta alerta={alerta}/>}
        </form>
        {/* Fin Formulario */}
    </Fragment>
  )
}

export default Formulario

// Github @josueperezparejo