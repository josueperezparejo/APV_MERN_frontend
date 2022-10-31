// Github @josueperezparejo

import React, {Fragment, useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

  const[cuentaConfirma, setCuentaConfirmada] = useState(false)
  const[cargando, setCargando] = useState(true)
  const[alerta, setAlerta] = useState(false)

  const params = useParams()
  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [])
  
  return (
    <Fragment>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza Administrar tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {!cargando && <Alerta alerta={alerta}/>}
            {cuentaConfirma && (
              <Link className="block text-center my-1 text-gray-500 font-bold" to="/">Iniciar Sesion</Link>
            )}
        </div>
    </Fragment>
  )
}

export default ConfirmarCuenta

// Github @josueperezparejo