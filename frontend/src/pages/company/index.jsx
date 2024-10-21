import Navbar from "../../components/navbar"
import cuvetteLogo from "../../assets/cuvetteLogo.svg";
import home from "../../assets/home.svg";
import tri from "../../assets/Polygon.svg";
import x from "../../assets/x.svg"
import { useEffect, useState } from "react";
import axios from 'axios'

const CompanyDashboard=()=>{

    const [createInterview,setCreateInterview]=useState(false)
    const [jobTitle,setJobTitle]=useState("")
    const [jobDescription,setJobDescription]=useState("")
    const [experienceLvl,setExperienceLvl]=useState("")
    const [candidates,setcandidates]=useState("")
    const [addCandidates,setAddcandidates]=useState([])
    const [endDate,setEndDate]=useState("")
    const [isOpen, setIsOpen]=useState(false)
    const [jobPosting,setJobPosting]=useState([])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && candidates.trim()) {
            setAddcandidates((prev) => [...prev, candidates.trim()])
            setcandidates("")
        }
      }

    const handleRemoveCandidate = (indexToRemove) => {
        setAddcandidates((prev) => prev.filter((_, index) => index !== indexToRemove))
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        const jobData = {
            jobTitle,
            jobDescription,
            experienceLevel: experienceLvl,
            candidates: addCandidates,
            endDate,
        }

        try {
            const response = await axios.post('https://cuvette-hoib.onrender.com/api/jobs', jobData)
            console.log(response.data)
            if(response.data==200){
                setJobTitle("")
                setJobDescription("")
                setExperienceLvl("")
                setAddcandidates([])
                setEndDate("")
                setCreateInterview(true)
            }
        } catch (error) {
            console.error("Error posting job:", error)
        }
    }

    const token = localStorage.getItem('token')
    const getAllJobPosting=async()=>{
        try {
            const response = await axios.get('https://cuvette-hoib.onrender.com/api/jobs', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setJobPosting(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllJobPosting()
    },[createInterview])

    return(
        <div className=" min-h-screen bg-white flex  flex-col ">
            <div className=" flex justify-between w-full items-center p-[24px] font-medium text-[28px] leading-[36px] text-[#576474] border-b border-[#C5C5C5] ">
                <img src={cuvetteLogo}/>
                <div className=" flex gap-10 items-center ">
                    <p>Contact</p>
                    <div className=" flex items-center text-[19.9px] leading-[25.91px] gap-4 border border-[#83909F] py-[16px] px-[24px] max-h-[51px] rounded-[6.22px] ">
                        <p className=" bg-[#A8A8A8] w-[31px] h-[31px] rounded-full "></p>
                        <p>Your Name</p>
                        <img src={tri} alt="Error"/>
                    </div>
                </div>
            </div>
            <div className=" w-full min-h-full flex ">
                <div className=" h-screen p-[24px] border-r border-[#C5C5C5] ">
                    <img src={home} alt="Error" className=" w-[34px] h-[35px] "/>
                </div>
                <div className=" w-full   ">
                    {createInterview ? (
                        <div className=" w-full h-full ">
                            <form onSubmit={handleSubmit}  className=" w-[60%] items-end h-full flex flex-col justify-center pl-[50px] gap-[40px] ">
                            <label htmlFor="" className=" flex gap-6  ">
                                <p className=" text-[32px] leading-[41.66px] whitespace-nowrap ">Job Title</p>
                                <input onChange={(e) => setJobTitle(e.target.value)} placeholder="Enter Job Title" className=" outline-none border border-[#D0D0D0] px-[24px] py-[16px] min-w-[653px] w-full rounded-[8px] "/>
                            </label>
                            <label htmlFor="" className=" flex gap-6">
                                <p className=" text-[32px] leading-[41.66px] whitespace-nowrap">Job Description</p>
                                <textarea onChange={(e) => setJobDescription(e.target.value)} row={200} placeholder="Enter Job Description" className=" outline-none border border-[#D0D0D0] px-[24px] py-[16px] min-w-[653px] w-full rounded-[8px] "/>
                            </label>
                            <label htmlFor="" className=" flex gap-6">
                                <p className=" text-[32px] leading-[41.66px] whitespace-nowrap">Experience Level</p>
                                <div className="flex justify-between appearance-none border border-[#D0D0D0] px-[24px] py-[16px] min-w-[653px] w-full rounded-[8px] relative">
                                    <select
                                        onChange={(e) => setExperienceLvl(e.target.value)}
                                        className={`appearance-none w-full  outline-none p-2 `}
                                        onClick={() => setIsOpen(false)} // Close dropdown on selection
                                    >
                                        <option selected hidden>Select Experience Level</option>
                                        <option value="Fresher" className="" >Fresher</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Mid">Mid-level</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                    <img 
                                        src={tri} 
                                        alt="Toggle Dropdown" 
                                        onClick={toggleDropdown} 
                                        className="cursor-pointer absolute right-4 top-8 " 
                                    />
                                </div>

                            </label>
                            <label htmlFor="" className=" flex gap-6">
                                <p className=" text-[32px] leading-[41.66px] whitespace-nowrap">Add Candidate</p>
                                <div className=" border flex flex-col gap-2 border-[#D0D0D0] px-[24px] py-[16px] min-w-[653px] w-full rounded-[8px] outline-none ">
                                    <div className=" flex flex-wrap gap-2 ">
                                    {addCandidates && addCandidates.map((candidate,index)=>{
                                        return(
                                            <div className=" p-[8px] rounded-[24px] flex items-center gap-2 border border-[#D0D0D0] ">
                                                <p className=" bg-[#A8A8A8] min-w-[31px] min-h-[31px] rounded-full "></p>
                                                <p>{candidate}</p>
                                                <img src={x} alt="Error" className=" cursor-pointer " onClick={()=>handleRemoveCandidate(index)} />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <input
                                        value={candidates}
                                        onKeyDown={handleKeyDown}
                                        onChange={(e) => setcandidates(e.target.value)}
                                        placeholder="Enter candidate's email"
                                        className="w-full outline-none "
                                        />
                                    </div>
                            </label>
                            <label htmlFor="" className=" flex gap-6">
                                <p className=" text-[32px] leading-[41.66px] whitespace-nowrap">End Date</p>
                                <input onChange={(e) => setEndDate(e.target.value)} placeholder="Select a date" type="date" className=" border border-[#D0D0D0] px-[24px] py-[16px] min-w-[653px] w-full rounded-[8px] outline-none "/>
                            </label>
                            <button type="submit" className=" bg-[#0B66EF] text-white px-[24px] py-[16px] h-[49px] rounded-[8px] flex items-center justify-center font-bold text-[24px] leading-[31px] ">Send</button>
                        </form>
                        </div>
                    ):(
                        <div className=" h-full ">
                            <p className="mb-4 cursor-pointer ml-[80px] mt-[30px] w-[310px] h-[57px] bg-[#0B66EF] text-white font-semibold text-[33px] leading-[43px] rounded-[8.32px] flex items-center justify-center  " onClick={()=>setCreateInterview(true)} >Create Interview</p>
                            <div className=" grid grid-cols-3  ">
                                {jobPosting.length>0 && jobPosting.map((job,index)=>{
                                    return(
                                        <div class="flex items-center justify-center">
                                    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                                        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Job Details</h2>
                                        <div class="mb-4">
                                            <h3 class="text-lg font-semibold text-gray-700">{job.jobTitle}</h3>
                                            <p class="text-gray-600">{job.jobDescription}</p>
                                        </div>
                                        <div class="mb-4">
                                            <h3 class="text-lg font-semibold text-gray-700">Job Description</h3>
                                            <p class="text-gray-600">{job.jobDescription}</p>
                                        </div>
                                        <div class="mb-4">
                                            <h3 class="text-lg font-semibold text-gray-700">Experience Level</h3>
                                            <p class="text-gray-600">{job.experienceLevel}</p>
                                        </div>
                                        <div class="mb-4">
                                            <h3 class="text-lg font-semibold text-gray-700">End Date</h3>
                                            <p class="text-gray-600">{job.endDate}</p>
                                        </div>
                                        <div class="mb-4">
                                            <h3 class="text-lg font-semibold text-gray-700">Candidates</h3>
                                            <ul class="list-disc pl-5 text-gray-600">
                                                {job.candidates.map((candidate,index)=>{
                                                    return(
                                                        <li>{candidate}</li>
                                                    )
                                                })}
                                                
                                            </ul>
                                        </div>
                                        <button class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200">Apply Now</button>
                                    </div>
                                </div>
                                    )
                                
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default CompanyDashboard