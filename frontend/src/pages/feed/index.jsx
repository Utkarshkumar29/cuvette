import Navbar from "../../components/navbar"
import cuvetteLogo from "../../assets/cuvetteLogo.svg";
import home from "../../assets/home.svg";
import tri from "../../assets/Polygon.svg";
import x from "../../assets/x.svg"
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { idsContext } from "../../context/idsContext";

const Feed=()=>{

    const [createInterview,setCreateInterview]=useState(false)
    const [jobPosting,setJobPosting]=useState([])
    
    const token = localStorage.getItem('token')

    const getAllJobPosting = async () => {
        try {
            const response = await axios.get('https://cuvette-hoib.onrender.com/api/jobs', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            })
            setJobPosting(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error fetching job postings:", error)
        }
    };
    

    useEffect(()=>{
        getAllJobPosting()
    },[createInterview])

    return(
        <div className=" min-h-screen bg-white flex justify-center items-center flex-col ">
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
            <div className=" w-full h-full flex ">
                <div className=" p-[24px] border-r border-[#C5C5C5] ">
                    <img src={home} alt="Error" className=" w-[34px] h-[35px] "/>
                </div>
                <div className=" w-full  h-full  ">
                
                            
                            <div className=" grid grid-cols-3 gap-[40px] w-full h-full p-[24px]  ">
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
                
            </div>
        </div>
    )
}


export default Feed