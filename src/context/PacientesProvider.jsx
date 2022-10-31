// Github @josueperezparejo

import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'


const PacientesContext = createContext()

const PacientesProvider = ({children}) => {

    const [pacientes,setPacientes] = useState([])
    const [paciente,setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }

        if(paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)   
            }
        } else {
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const {createdAt, updateAt, __v, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }      
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = Swal.fire({
            title: 'Estas seguro?',
            text: "No podras recuperar el Paciente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El Paciente ha sido Eliminado.',
                'success'
              )

              try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                        }
                    }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)

                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
            }
          })         
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                paciente,
                setEdicion,
                eliminarPaciente
        }}>
            {children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider}

export default PacientesContext

// Github @josueperezparejo