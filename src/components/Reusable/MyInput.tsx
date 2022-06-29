import { ChangeEventHandler, FC } from "react";

interface Props {
  name: string; 
  type: string;
  placeholder: string;
  value: string;
  error: boolean;
  handler: ChangeEventHandler;
}

const MyInput: FC<Props> = ({name, type, placeholder, error, value, handler}) => {

  return(
    <label className={`${error ? 'error-input' : ''} my-label flex items-center px-5 py-4 mt-4`}>
      <input 
        className="my-input text-left w-full" 
        name={name} 
        type={type}
        placeholder={placeholder} 
        value={value}
        onChange={handler}
        autoComplete="off"
      />
    </label>
  )
}

export default MyInput;