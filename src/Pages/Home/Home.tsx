import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { startLogout } from '../../features/auth/auth.slice';

export const Home = () => {

  const {name, uid} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()


  return (
    <>
      <h1>Inicio</h1>
      <hr />
    </>
  )
}
