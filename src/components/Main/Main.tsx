import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../Reusable/ButtonPrimary";
import laptop from '../../images/laptop.png';
import { UserContext } from "../../context/UserContext";

const Main: FC = () => {

  const { user } = useContext(UserContext);

  return(
    <section className="w-full flex items-center justify-center text-white">
      <main className="w-full lg:w-4/5 xl:w-3/5 flex flex-col md:flex-row ">

        <div className="flex flex-col py-10 md:py-48 pl-10 lg:pl-0">
          <h1 className="pl-14 md:pl-0 text-4xl md:text-5xl lg:text-6xl font-bold">
            Keep track 
            <br />
            of your 
            <br/> 
            <span className="text-myBlue">Crypto</span>
            <br />
            portfolio
          </h1>

          {user ? (
            <Link to="/app/positions" className="hidden md:inline w-4/5 lg:w-1/2 pt-10">
              <ButtonPrimary>
                <p className="uppercase font-bold">
                  app
                </p>
              </ButtonPrimary>
            </Link>
          ) : (
            <Link to="/login" className="hidden md:inline w-4/5 lg:w-1/2 pt-10">
              <ButtonPrimary title="Login" />
            </Link>
          )}
        </div>


        <div className="flex items-center justify-center">
          <img className="w-full xl:w-[80%]" src={laptop} alt="Laptop" />
        </div>

        {user ? (
          <Link to="/app" className="md:hidden w-4/5 mx-auto pb-20 pt-10">
            <ButtonPrimary>
              <p className="uppercase font-bold">
                app
              </p>
            </ButtonPrimary>
          </Link>
        ) : (
          <Link to="/login" className="md:hidden w-4/5 mx-auto pb-20 pt-10">
            <ButtonPrimary title="Login" />
          </Link>
        )}

      </main>
    </section>
  )
}

export default Main;