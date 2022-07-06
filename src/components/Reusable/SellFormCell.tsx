import { FC, FormEvent, FormEventHandler } from "react";
import ButtonSecondary from "./ButtonSecondary";
import MySmallInput from "./MySmallInput";


const SellFormCell: FC = () => {

  const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();




  }

  const handleChange = () => {}

  return(
    <div className="flex justify-center">

      <form className="flex justify-around w-[150px]" onSubmit={handleSubmit}>

        <div>
          <MySmallInput 
            placeholder="amount"
            type="number"
            name="quantity"
            value="s"
            handler={handleChange}
            error={false}
          />
          <MySmallInput 
            placeholder="price"
            type="number"
            name="price"
            value="s"
            handler={handleChange}
            error={false}
          />
        </div>

        <div className="min-w-[50px] ml-5 flex items-center">
          <ButtonSecondary type="submit">
            Sell
          </ButtonSecondary>
        </div>
      </form>
    </div>
  )
}

export default SellFormCell;