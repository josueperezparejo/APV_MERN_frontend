// Github @josueperezparejo

import React, {Fragment, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const NuevoPassword = () => {

  const [password,setPassword] = useState('')
  const [alerta,setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Ingresa tu nueva Password'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el Enlace',
          error: true})
      }
    }

    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6) {
      setAlerta({
        msg: 'El Password debe ser minimo de 6 Caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url,{password})
      setAlerta({
        msg: data.msg
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  if(msg) {
    setTimeout(() => {
        setAlerta({})
    }, 3000);
}

  return (
    <Fragment>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Password y no pierdas Acceso a tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta alerta={alerta}/>}
            {tokenValido && (
              <Fragment>

                  {/* Formulario */}
                  <form action="" onSubmit={handleSubmit}>
                  <div className="my-5">
                      <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                      <input placeholder="Password de Registro" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border w-full p-3 mt-3 bg-gray-300 rounded-xl" />
                  </div>

                  <input type="submit" value="Guardar Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800" />
                  </form>
                  {/* Fin Formulario */}

                  {passwordModificado && (
                    <Link className="block text-center my-1 pt-3 text-gray-500 font-bold" to="/">Iniciar Sesion</Link>
                  )}              
              </Fragment>
            )}    
        </div>
    </Fragment>
  )
}

export default NuevoPassword

// Github @josueperezparejo