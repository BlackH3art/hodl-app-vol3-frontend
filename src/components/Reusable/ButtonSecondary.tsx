import { FC, FormEventHandler, ReactNode } from "react";


interface Props {
  title?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  handler?: FormEventHandler | ( () => void );
}

const ButtonSecondary: FC<Props> = ({ children, title, type, handler }) => {
  return(
    <button type={type} className="btn-secondary w-full flex justify-center py-2 rounded-md border-gray-600 border-[1px]" onClick={handler}>
      {title || children}
    </button>
  )
}

export default ButtonSecondary;