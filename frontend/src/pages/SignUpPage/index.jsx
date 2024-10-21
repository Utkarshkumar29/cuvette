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
import Loader from "../../components/template/loader";

const SignUp = () => {

    const [name,setName]=useState("")
    const [phoneNo,setPhoneNo]=useState("")
    const [companyName,setCompanyName]=useState("")
    const [companyEmail,setCompanyEmail]=useState("")
    const [employeeSize,setEmployeeSize]=useState("")
    const [verify,setVerifying]=useState(false)
    const [emailOTP,setEmailOtp]=useState("")
    const [isEmailVerified,setIsEmailVerified]=useState(false)
    const [phoneOTP,setPhoneOTP]=useState("")
    const [isPhoneVerified,setIsPhoneVerified]=useState(false)
    const [loading,setloading]=useState(false)
    const [isCompanyRegistered,setIsCompanyRegistered]=useState(false)
    const {userId,
      setUserId,
      companyId,
      setCompanyId}=useContext(idsContext)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setloading(true)
        try {
            const data={
                name,
                phoneNo,
                companyName,
                companyEmail,
                employeeSize
            }            
            const response=await axios.post('http://localhost:5000/api/signUp',data)
            console.log(response)
            if(response.status==201){
                setVerifying(true)
                localStorage.setItem("token", response.data.token)
                
            }
            setCompanyId(response.data.companyId)
        } catch (error) {
            console.log(error)
        } finally{
          setloading(false)
        }
    }

    const handleEmailOTP=async(e)=>{
        e.preventDefault()
        try {
            const data={
                companyId,
                emailOTP
            }            
            const response=await axios.post('http://localhost:5000/api/signUp/verify-email',data)
            if(response.status==200){
                setIsEmailVerified(true)
                toast(response.message) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePhoneOTP=async(e)=>{
        e.preventDefault()
        try {
            const data={
                companyId,
                phoneOTP
            }            
            const response=await axios.post('http://localhost:5000/api/signUp/verify-phone',data)
            if(response.status==200){
                setIsPhoneVerified(true)
                toast(response.message) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(isEmailVerified && isPhoneVerified){
      return <Navigate to="/companyDashboard" />
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
        {verify ? (
            <div className=" p-[24px] rounded-[15px] max-w-[619px] w-[619px] max-h-[483px] h-full border border-solid border-gradient flex flex-col justify-center items-center gap-[24px] ">
            <p className=" text-[#000000] font-semibold text-[32px] leading-[46.66px] ">Sign Up</p>
            <p className=" font-medium text-[16px] leading-[20.83px] text-[#292929B2]  ">Lorem Ipsum is simply dummy text</p>
            <div className=" flex flex-col gap-[24px] ">
              <form onSubmit={handleEmailOTP} className=" flex flex-col gap-2 ">
              <label
                htmlFor=""
                className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
              >
                <img
                  src={mail}
                  alt="Error"
                  className=" w-[19.89px] h-[19.93px] "
                />
                <input
                  placeholder="Email OTP"
                  className=" h-full w-full text-[#535353] bg-[#F4F4F4] outline-none "
                  onChange={(e)=>{setEmailOtp(e.target.value)}}
                />
                {isEmailVerified && <img src={tick} alt="Error" /> }
              </label>
              <button type="submit" className=" bg-[#0B66EF] max-w-[542px] w-full h-[43px] text-white font-bold text-[24px] leading-[31.25px] rounded-[7px] ">Verify</button>
              </form>
              <form onSubmit={handlePhoneOTP} className=" flex flex-col gap-2 ">
              <label
                htmlFor=""
                className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
              >
                <img src={Vector} alt="Error" className=" w-[20px] h-[16px] " />
                <input
                  placeholder="Mobile OTP"
                  className=" h-full w-full text-[#535353] bg-[#F4F4F4] outline-none "
                  onChange={(e)=>{setPhoneOTP(e.target.value)}}
                />
                {isPhoneVerified && <img src={tick} alt="Error" /> }
              </label>
              <button type="submit" className=" bg-[#0B66EF] max-w-[542px] w-full h-[43px] text-white font-bold text-[24px] leading-[31.25px] rounded-[7px] ">Verify</button>
              </form>
            </div>
          </div>
        ):(
            <form onSubmit={handleSubmit} className=" p-[24px] rounded-[15px] max-w-[619px] w-[619px] max-h-[722px] h-full border border-solid border-gradient flex flex-col justify-center items-center gap-[24px] ">
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
              <img
                src={Vector}
                alt="Error"
                className=" w-[19.89px] h-[19.93px] "
              />
              <input
                placeholder="Phone no."
                className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
                onChange={(e)=>{setPhoneNo(e.target.value)}}
              />
            </label>
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
                placeholder="Company Name"
                className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
                onChange={(e)=>{setCompanyName(e.target.value)}}
              />
            </label>
            <label
              htmlFor=""
              className=" flex items-center gap-4 py-2 px-4 max-w-[542px] w-[542px] max-h-[59px] h-[59px] border border-[#CCCCCC] bg-[#F4F4F4] rounded-[7px] "
            >
              <img src={mail} alt="Error" className=" w-[20px] h-[16px] " />
              <input
                placeholder="Company Email"
                className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
                onChange={(e)=>{setCompanyEmail(e.target.value)}}
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
                placeholder="Employee Size"
                className=" h-full text-[#535353] bg-[#F4F4F4] outline-none "
                onChange={(e)=>{setEmployeeSize(e.target.value)}}
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
          <button type="submit" className=" bg-[#0B66EF] max-w-[542px] w-full h-[43px] text-white font-bold text-[24px] leading-[31.25px] rounded-[7px] flex items-center justify-center p-2 ">{ loading ? <Loader/> :'Proceed' }</button>
          <p>Already Registered? <span className=" text-[#0B66EF] underline cursor-pointer ">Login</span></p>
        </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
