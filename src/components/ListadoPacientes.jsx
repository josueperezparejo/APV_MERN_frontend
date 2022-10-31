// Github @josueperezparejo

import React, {Fragment} from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'

const ListadoPacientes = () => {

  const {pacientes} = usePacientes()

  return (
    <Fragment>
        {pacientes.length ? 
        (<Fragment>
              <h2 className='font-bold text-3xl text-center'>Listado de Pacientes</h2>    
              <p className='text-lg text-center mb-10 font-bold'>Administra tus <span className='text-indigo-600'>Pacientes y Citas</span></p>

              {pacientes.map(paciente => (<Paciente key={paciente._id} paciente={paciente} />))}              
        </Fragment>)
                          : 
        (<Fragment>
              <h2 className='font-bold text-3xl text-center'>No Hay Pacientes</h2>    
              <p className='text-xl mt-5 mb-10 text-center'>Comienza agregando <span className='font-bold text-indigo-600'>Pacientes</span></p>
        </Fragment>)}
    </Fragment>
  )
}

export default ListadoPacientes

// Github @josueperezparejo