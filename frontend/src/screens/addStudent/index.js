import Header from "../../components/Header";
import Banner from "../../components/Banner";

import "./index.css";

const AddStudent = () => {
  return (
    <div className="add-student-page"> 
            <Header />
            <Banner />
        <div class="main-row">
            <div class="column left">
                <h2>Column 1</h2>
            </div>
            <div class="column middle">
                
                <div className="student-info-container">
                <h2>Column 2</h2>
                </div>
                <div className="student-info-container">
                <h2>Column 2</h2>
                </div>
            </div>
            <div class="column right">
                <h2>Column 3</h2>
            </div>
        </div>
    </div>
  );
};

export default AddStudent;
