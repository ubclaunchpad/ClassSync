import Header from "../../components/Header";
import Banner from "../../components/Banner";
import AdminLoginForm from "../../components/AdminLoginForm";
import "./index.css";

const AdminLogin = () => {
  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
