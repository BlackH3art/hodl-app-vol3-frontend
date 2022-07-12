import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  classes: string;
  title?: string;
  children?: ReactNode;
}

const ButtonNavLink: FC<Props> = ({ children, classes, to, title }) => {

  return(
    <NavLink className={classes} to={to}>
      {({ isActive }) => (
        <button
          className={`${isActive ? "btn-navlink-active" : "btn-navlink"} w-full flex justify-center py-2 rounded-md`}
        >
          {title ? <p className={`px-5`}>{title}</p> : children}
        </button>
      )}

    </NavLink>
  )
}

export default ButtonNavLink;