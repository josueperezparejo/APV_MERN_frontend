// Github @josueperezparejo

import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

    const [email,setEmail] = useState('')
    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === '') {
            setAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            })
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})
            setAlerta({msg: data.msg})            
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
            <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {/* Formulario */}
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input placeholder="Email de Registro" type="email" className="border-2 border-neutral-300 hover:border-teal-500 w-full p-3 mt-3 bg-gray-300 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>
                {/* Fin Formulario */}

                {msg && <Alerta alerta={alerta} />}

                {/* Navegacion */}
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="font-bold block text-center my-1 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
                    <Link className="font-bold block text-center my-1 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
                </nav>
            </div>
    </Fragment>
  )
}

export default OlvidePassword

// Github @josueperezparejo