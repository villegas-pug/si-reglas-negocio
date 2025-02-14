type AxiosStatusMessage = { [key: string]: string }

export const requestCode: AxiosStatusMessage = {
   ERR_NETWORK: '¡Error en la conexión!',
   ERR_BAD_REQUEST: '¡Solicitud incorrecta!',
   ECONNABORTED: '¡La solicitud excedió el tiempo de espera!'
}
