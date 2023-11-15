import "./index.css";
import Scratch from "../../assets/scratch.png";

function CourseTile({ item }) {
    if (item === "Fill") {
      return <div className="coursePageFill" />;
    }
  
    return (
      <div className="coursePageItem">
        <div className="coursePageImageTile">
          <img
            src={Scratch}
            alt={item.title}      
          />
        </div>
        <div className="coursePageItemTitle">
          {item.title}
        </div>
        <div class="alignedText">
            <p class="leftAligned">Target age range: {item.age}</p>
            <p class="rightAligned">Prerequisites: {item.prereq}</p>
        </div>
      </div>
    );
  }
  
  export default CourseTile;