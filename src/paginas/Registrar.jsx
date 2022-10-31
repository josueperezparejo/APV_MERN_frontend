// Github @josueperezparejo

import React, {Fragment, useState} from 'react'
import {Link} from "react-router-dom"
import Alerta from '../components/Alerta.jsx'
import clienteAxios from '../config/axios.jsx'

const Registrar = () => {

    const [nombre,setNombre] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repetirPassword,setRepetirPassword] = useState('')
    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Hay campos vacios', error: true})
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({msg: 'Los Passwords no son iguales', error: true})
            return;
        }

        if(password.length < 6) {
            setAlerta({msg: 'El Password es muy corto, Agrega minimo 6 caracteres', error: true})
            return;
        }

        setAlerta({})

        // Crear usuario en la API
        try {
            await clienteAxios.post('/veterinarios', {nombre,email,password})
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        
    }

    const {msg} = alerta;

    if(msg) {
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

  return (
    <Fragment>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {/* Formulario */}
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input placeholder="Tu Nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="border-2 border-neutral-300 hover:border-teal-500 w-full p-3 mt-3 bg-gray-300 rounded-xl" />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input placeholder="Email de Registro" type="email" value={email} onChange={e => setEmail(e.target.value)} className="border-2 border-neutral-300 hover:border-teal-500 w-full p-3 mt-3 bg-gray-300 rounded-xl" />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input placeholder="Password de Registro" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border-2 border-neutral-300 hover:border-teal-500 w-full p-3 mt-3 bg-gray-300 rounded-xl" />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                        <input placeholder="Repetir Password" type="password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} className="border-2 border-neutral-300 hover:border-teal-500 w-full p-3 mt-3 bg-gray-300 rounded-xl" />
                    </div>

                    <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>
                {/* Fin Formulario */}

                {msg && <Alerta alerta={alerta} />}                

                {/* Navegacion */}
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="font-bold block text-center my-1 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
                    <Link className="font-bold block text-center my-1 text-gray-500" to="/olvide-password">Olvide mi Password</Link>
                </nav>
            </div>
    </Fragment>
  )
}

export default Registrar

// Github @josueperezparejo