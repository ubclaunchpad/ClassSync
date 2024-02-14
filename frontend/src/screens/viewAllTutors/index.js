import { useEffect, useState } from "react";
import { FakeTutors } from "./fakeData";
import { TutorInfoCard } from "../../components/TutorInfoCard";
import "./index.css";
import Banner from "../../components/Banner";

export const ViewAllTutors = () => {
  const [allTutors, setAllTutors] = useState([]);
  const url = "http://localhost:8080";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorsResponse = await fetch(`${url}/tutor/all`);
        const tutorsData = await tutorsResponse.json();
        console.log(tutorsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    // fetchData();
    setAllTutors(FakeTutors);
  }, []);
  console.log(allTutors);
  return (
    <div>
      <Banner smallText="Parent Dashboard" mainText="Hello, Richard!">
        {" "}
      </Banner>
      <div className="view-tutors__page">
        <div className="view-tutors__container">
          <div className="all-tutors__header">
            <div className="all-tutors__title">View All Tutors</div>
          </div>
          <div className="tutors-scroll__container">
            <div className="tutors-scroll__title">
              {`Showing ${allTutors.length} tutors`}
            </div>
            <div className="tutors-scroll__items">
              {allTutors.map((tutor) => {
                return (
                  <div>
                    <TutorInfoCard tutorId={tutor.tutorId} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
