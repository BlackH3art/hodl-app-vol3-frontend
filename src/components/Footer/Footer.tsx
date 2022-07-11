import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from 'react-icons/fa';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import logo from '../../images/logo.png';

const Footer: FC = () => {

  const copy = (e: any) => {
    e.target.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  return(
    <footer className="h-48 footer-bg w-full bg-main flex flex-col items-center justify-between">

      <div className="w-full md:w-4/5 xl:w-[85%] flex justify-between">

        <img src={logo} className="h-[2rem] pl-2 lg:pl-0" alt="hoDl logo" />


        <a className="pr-2 lg:pr-0" href="https://github.com/BlackH3art/hodl-app-vol3-frontend" target="_blank" rel="noopener noreferrer">
          <FaGithub color="white" size="2rem" />
        </a>
      </div>

      <div className="flex flex-col justify-center h-full">
        <h2 className="text-center text-white">
          Support this project:
        </h2>
        <label className='flex items-center py-2'>
          <BsCurrencyBitcoin color="white" size="2rem" />
          <input className='support-input text-[.7rem] md:text-sm text-gray-300 px-2 py-2 rounded-xl w-[240px] md:w-[300px]' type="text" onChange={()=>{}} value="1GBHQd4MA24dbxXMJB94YMYtKdEYjaobRY" onClick={copy}/>
        </label>
      </div>

      
      <div className="w-full h-12 lg:w-4/5 xl:w-[90%] flex items-center justify-between border-t-[1px] border-gray-700">
        <p className="text-gray-300 text-sm pl-2 lg:pl-0">
          All rights reserved
        </p>

        <Link to="/policy" className="link text-sm pr-2 lg:pr-0 ">
          Privacy policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer;