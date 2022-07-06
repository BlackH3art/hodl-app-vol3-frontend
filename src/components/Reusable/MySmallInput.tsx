import { ChangeEventHandler, FC } from "react";

interface Props {
  name: string; 
  type: string;
  placeholder: string;
  value: string;
  error: boolean;
  handler: ChangeEventHandler;
}

const MySmallInput: FC<Props> = ({ name, type, placeholder, value, error, handler }) => {

  return(
    <label className={`${error ? 'error-input' : ''} my-label flex items-center m-1`}>
      <input 
        className="my-input small-input text-center w-full" 
        name={name} 
        type={type}
        placeholder={placeholder} 
        value={value}
        onChange={handler}
        autoComplete="off"
        min={0}
      />
    </label>
  )
}

export default MySmallInput;