import cuvetteLogo from "../../assets/cuvetteLogo.svg";
import groups from "../../assets/groups.svg";
import personLogo from "../../assets/Person icon.svg";
import mail from "../../assets/mail.svg";
import Vector from "../../assets/Vector.svg";
import tick from "../../assets/check_circle.svg";
import { useContext, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "../../components/navbar";
import { Navigate } from "react-router-dom";
import { idsContext } from "../../context/idsContext";

const UserSignUp = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [already,setAlready]=useState(false)
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const {userId,
      setUserId,
      companyId,
      setCompanyId}=useContext(idsContext)

    const handleRegistration=async(e)=>{
        e.preventDefault()
        try {
            const data={
                name,
                email,
                password
            }            
            const response=await axios.post('http://localhost:5000/api/user/register',data)
            console.log(response)
            if(response.status==201){
              setIsLoggedIn(true)
              localStorage.setItem("token", response.data.token);
              setUserId()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin=async(e)=>{
      e.preventDefault()
      try {
          const data={
              email,
              password
          }            
          const response=await axios.post('http://localhost:5000/api/user/login',data)
          console.log(response)
          if(response.status==200){
            setIsLoggedIn(true)
            localStorage.setItem("token", response.data.token)
          }
      } catch (error) {
          console.log(error)
      }
  }


  if(isLoggedIn){
    return <Navigate to="/feed" />
  }

  return (
    <div className=" h-screen bg-white flex justify-center items-center flex-col ">
      <Navbar/>
      <div className=" flex h-full justify-center items-center gap-[200px]   ">
        <div className=" max-w-[622px] text-[22.24px] leading-[28.95px] text-[#292929B2] ">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
      { already ? (
        <form onSubmit={handleLogin} className=" p-[24px] rounded-[15px] max-w-[619px] w-[619px] h-min border border-solid border-gradient flex flex-col justify-center items-center gap-[24px] ">
        <p className=" text-[#000000] font-semibold text-[32px] leading-[46.66px] ">Sign Up</p>
        <p className=" font-medium text-[16px] leading-[20.83px] text-[#292929B2]  ">Lorem Ipsum is simply dummy text</p>
        <div className=" flex flex-col gap-[24px] ">
          <label
            htmlFor=""
            className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
          >
            <img src={mail} alt="Error" className=" w-[20px] h-[16px] " />
            <input
              placeholder="Email"
              className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </label>
          <label
            htmlFor=""
            className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
          >
            <img
              src={groups}
              alt="Error"
              className=" w-[27.33px] h-[11.95px] "
            />
            <input
              placeholder="Password"
              className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </label>
        </div>
        <div className="flex flex-col text-center">
          <p className="  ">
            By clicking on proceed you wil accept our{" "}<br/>
            <span className=" text-[#0B66EFB2] ">Terms</span> &{" "}
            <span className=" text-[#0B66EFB2] ">Conditions</span>
          </p>
        </div>
        <button type="submit" className=" bg-[#0B66EF] max-w-[542px] w-full h-[43px] text-white font-bold text-[24px] leading-[31.25px] rounded-[7px] ">Create Account</button>
        <div className=" flex gap-1 ">
        <p>Don't have account?</p><span className=" text-[#0B66EF] underline cursor-pointer " onClick={()=>setAlready(false)} >Sign Up</span>
      </div>
      </form>
      ):(
        <form onSubmit={handleRegistration} className=" p-[24px] rounded-[15px] max-w-[619px] w-[619px] max-h-[722px] h-full border border-solid border-gradient flex flex-col justify-center items-center gap-[24px] ">
        <p className=" text-[#000000] font-semibold text-[32px] leading-[46.66px] ">Sign Up</p>
        <p className=" font-medium text-[16px] leading-[20.83px] text-[#292929B2]  ">Lorem Ipsum is simply dummy text</p>
        <div className=" flex flex-col gap-[24px] ">
          <label
            htmlFor=""
            className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
          >
            <img
              src={personLogo}
              alt="Error"
              className=" w-[16px] h-[18px] "
            />
            <input
              placeholder="Name"
              className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
              onChange={(e)=>{setName(e.target.value)}}
            />
          </label>
          <label
            htmlFor=""
            className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
          >
            <img src={mail} alt="Error" className=" w-[20px] h-[16px] " />
            <input
              placeholder="Email"
              className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </label>
          <label
            htmlFor=""
            className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
          >
            <img
              src={groups}
              alt="Error"
              className=" w-[27.33px] h-[11.95px] "
            />
            <input
              placeholder="Password"
              className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </label>
        </div>
        <div className="flex flex-col text-center">
          <p className="  ">
            By clicking on proceed you wil accept our{" "}<br/>
            <span className=" text-[#0B66EFB2] ">Terms</span> &{" "}
            <span className=" text-[#0B66EFB2] ">Conditions</span>
          </p>
        </div>
        <button type="submit" className=" bg-[#0B66EF] max-w-[542px] w-full h-[43px] text-white font-bold text-[24px] leading-[31.25px] rounded-[7px] ">Create Account</button>
        <div className=" flex gap-1 ">
        <p>Already have a account?</p><span className=" text-[#0B66EF] underline cursor-pointer " onClick={()=>setAlready(true)} >Login In</span>
      </div>
      </form>
      )}
      </div>
    </div>
  );
};

export default UserSignUp;
