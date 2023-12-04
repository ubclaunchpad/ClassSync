import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ConfirmationForm from "../../components/ConfirmationForm";
import "./index.css";

const Confirmation = () => {
  return (
    <div className="screen-container">
      <Header />
      <Banner />
      <div className="content-container">
        <ConfirmationForm />
      </div>
    </div>
  );
};

export default Confirmation;
