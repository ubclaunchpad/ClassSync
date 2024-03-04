import Header from "../../components/Header";
import Banner from "../../components/Banner";
import SignUpForm from "../../components/SignUpForm";
import "./index.css";
import RegisterUserForm from "../../components/RegisterUserForm";
import { ParentDashboardLayout } from "../../components/ParentDashboardLayout";

const Signup = async () => {


  return (

<div className="screen-container">
<Header />
  <Banner />
<div className='register-tutor-container'>
<RegisterUserForm role='guardian' redirect='/' />
</div >

</div >
  );
};

export default Signup;
