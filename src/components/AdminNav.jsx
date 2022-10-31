// Github @josueperezparejo

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const AdminNav = ({activo}) => {
  
  return (
    <Fragment>
        <nav className='flex gap-4 items-center'>
            <Link to="/admin/perfil" className={`${activo.perfil ? 'text-indigo-600 text-lg' : 'text-gray-600'} uppercase font-bold`}>Perfil</Link>
            <Link to="/admin/cambiar-password" className={`${activo.password ? 'text-indigo-600 text-lg' : 'text-gray-600'} uppercase font-bold`}>Cambiar Password</Link>
        </nav>
    </Fragment>
  )
}

export default AdminNav

// Github @josueperezparejo