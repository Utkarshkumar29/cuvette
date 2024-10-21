import { Link, useLocation } from "react-router-dom";
import cuvetteLogo from "../../assets/cuvetteLogo.svg";

const Navbar=()=>{
  const location = useLocation();
    return(
        <div className=" max-w-[1580px] w-full max-h-[43px] h-full flex items-center justify-between mt-[24px] ">
        <img src={cuvetteLogo} alt="error" />
        <div className=" flex gap-[40px] ">
        <p className=" cursor-pointer font-medium text-[#576474] text-[28px] leading-[36.46px] ">
          Contact
        </p>
        <Link to='/user/signUp' ><p className=" cursor-pointer font-medium text-[#576474] text-[28px] leading-[36.46px] ">
        {location.pathname.includes("/user") ? <Link to="/signUp">Join as Org</Link> : "Join as candidate"}
        </p></Link>
        </div>
      </div>
    )
}

export default Navbar