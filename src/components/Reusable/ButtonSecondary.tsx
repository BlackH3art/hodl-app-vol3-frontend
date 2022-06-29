import { FC, ReactNode } from "react";


interface Props {
  title?: string;
  children?: ReactNode;
}

const ButtonSecondary: FC<Props> = ({ children, title }) => {
  return(
    <button className="min-w-20 px-5 py-2 font-bold rounded-md mx-4 border-gray-600 border-[1px]">
      {title || children}
    </button>
  )
}

export default ButtonSecondary;