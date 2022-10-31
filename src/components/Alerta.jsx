// Github @josueperezparejo

import React, {Fragment} from 'react'

const Alerta = ({alerta}) => {

  return (
    <Fragment>
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mt-5`}>
            {alerta.msg}
        </div>
    </Fragment>
  )
}

export default Alerta

// Github @josueperezparejo