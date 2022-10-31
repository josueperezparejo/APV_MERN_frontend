// Github @josueperezparejo

import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

    const {cerrarSesion} = useAuth()

  return (
    <Fragment>
        <header className='py-5 bg-indigo-600'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <h1 className='font-bold text-2xl text-indigo-100 text-center'>Administrador de Paciente de <span className='text-white'>Veterinaria</span></h1>

                <nav className='flex gap-4 flex-col md:flex-row items-center mt-5 md:mt-0'>
                    <Link to="/admin" className='text-white text-xl font-bold'>Pacientes</Link>
                    <Link to="/admin/perfil" className='text-white text-xl font-bold'>Perfil</Link>

                    <button onClick={cerrarSesion} className='bg-indigo-400 hover:bg-orange-400 p-2 rounded-full text-white text-xl font-bold' type='button'>Cerrar Sesion</button>
                </nav>
            </div>
        </header>
    </Fragment>
  )
}

export default Header

// Github @josueperezparejo