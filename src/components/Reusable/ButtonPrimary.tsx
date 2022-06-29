import { FC, ReactNode } from "react";


interface Props {
  title?: string;
  children?: ReactNode;
}

const ButtonPrimary: FC<Props> = ({ children, title }) => {
  return(
    <button className="btn-primary min-w-20 px-5 py-2 font-bold rounded-md mx-4">
      {title || children}
    </button>
  )
}

export default ButtonPrimary;