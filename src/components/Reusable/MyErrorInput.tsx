import { ChangeEventHandler, FC } from "react";


interface Props {
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  error: string;
  handler: ChangeEventHandler;
}

const MyErrorInput: FC<Props> = ({ name, type, placeholder, value, error, handler }) => {

  return(
    <div className="w-3/5">
      <label className={`${error ? 'error-input' : ''} my-label flex items-center px-5 py-4 mt-4`}>
        <input 
          name={name} 
          type={type} 
          className="my-input text-left w-full" 
          placeholder={placeholder} 
          onChange={handler} 
          value={value}
          min={0}
        />
      </label>

      <p className="text-red-500 font-regular text-sm text-left">
        {error}
      </p>
    </div>
  )
}

export default MyErrorInput;