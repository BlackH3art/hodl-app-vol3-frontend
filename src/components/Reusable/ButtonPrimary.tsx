import { FC, FormEventHandler, ReactNode } from "react";


interface Props {
  title?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  handler?: FormEventHandler | ( () => void );
}

const ButtonPrimary: FC<Props> = ({ children, title, type, handler }) => {
  return(
    <button type={type} className="btn-primary w-full px-5 flex justify-center py-2 font-semibold rounded-md" onClick={handler}>
      {title || children}
    </button>
  )
}

export default ButtonPrimary;