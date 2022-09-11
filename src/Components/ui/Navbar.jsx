import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { startLogout } from "../../features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import "./Styles.css";

export const Navbar = () => {
  // const dispatch = useDispatch();
  const {name} = useAppSelector( (state) => state.auth);
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () =>{
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    dispatch(startLogout());
  };


  return (
      <aside className={isOpen ? 'sidebar is-active' : 'sidebar'} onClick={handleOpen}>
        
        <div className={isOpen ? 'menu-toggle is-active' :"menu-toggle"}>
          <div className="hamburger">
            <span></span>
          </div>
        </div>

        <h3>Admin</h3>

        <nav className='menu'>
          <NavLink className= 'menu-item' to='/'><i className="bi bi-house-door-fill"></i> Inicio</NavLink>
          <NavLink className= 'menu-item' to='/productos'><i className="bi bi-box2-fill"></i> Productos</NavLink>
          <NavLink className= 'menu-item' to='/ordenes'><i className="bi bi-card-checklist"></i> Ordenes</NavLink>
          <NavLink className= 'menu-item' to='/clientes'><i className="bi bi-person-fill"></i> Clientes</NavLink>
          <NavLink className= 'menu-item' to='/socios'><i className="bi bi-person-fill"></i> Socios</NavLink>
          {/* <NavLink className= 'menu-item' to='/resumen'><i  className="bi bi-file-text-fill"></i> Resumen</NavLink> */}
          <hr />


          <div className="position-absolute bottom-0 p-2 d-flex profile ">
            <button className="btn btn-danger" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i> Salir</button>
            <span>{name}</span>
          </div>
        </nav>
      </aside>

  );
};
