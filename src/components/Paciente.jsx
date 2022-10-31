// Github @josueperezparejo

import React, { Fragment } from 'react'
import usePacientes from '../hooks/usePacientes'

const Paciente = ({paciente}) => {

  const {setEdicion, eliminarPaciente} = usePacientes()

  const {email, fecha, nombre, propietario, sintomas, _id} = paciente

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es', {dateStyle: 'long'}).format(nuevaFecha)
  }

  return (
    <Fragment>
        <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold text-indigo-800 my-1'>Nombre: <span className='text-black font-normal normal-case'>{nombre}</span></p>

            <p className='font-bold text-indigo-800 my-1'>Propietario: <span className='text-black font-normal normal-case'>{propietario}</span></p>

            <p className='font-bold text-indigo-800 my-1'>Email: <span className='text-black font-normal normal-case'>{email}</span></p>

            <p className='font-bold text-indigo-800 my-1'>Fecha: <span className='text-black font-normal normal-case'>{formatearFecha(fecha)}</span></p>

            <p className='font-bold text-indigo-800 my-1'>Sintomas: <span className='text-black font-normal normal-case'>{sintomas}</span></p>

            <div className='flex justify-between items-center my-2'>
                <button onClick={() => setEdicion(paciente)} className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg'>Editar</button>
                <button onClick={() => eliminarPaciente(_id)} className='py-2 px-10 bg-orange-400 hover:bg-orange-700 text-white uppercase font-bold rounded-lg'>Eliminar</button>
            </div>
        </div>
    </Fragment>
  )
}

export default Paciente

// Github @josueperezparejo