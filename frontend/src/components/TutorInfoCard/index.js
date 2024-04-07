import { Avatar } from "primereact/avatar";
import "./index.css";
import { useEffect, useState } from "react";
import { sampleData } from "./fakeData";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Redirect } from "react-router-dom";
import { clsx } from "clsx";

export const TutorInfoCard = ({ tutorId, tutor, courses }) => {
const tutorName = tutor.firstname + " " + tutor.lastname;
const university = tutor.university;
const description = tutor.description;
const about = tutor.bio;
  const [offerings, setOfferings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  //   console.log(courses);
  const url = "http://localhost:8080";
  const frontEndUrl = "http://localhost:3000";

  //   console.log(tutorId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 46;
        // Fetch courses data
        // const courses = await fetch(`${url}/tutorProfile/courses?userId=${id}`);
        // const coursesData = await courses.json();

        // setCourses(coursesData);
        // const id = localStorage.getItem("userID");

        // Fetch courses data
        const coursesResponse = await fetch(`${url}/tutor/offerings`);
        const coursesData = await coursesResponse.json();

        // Transform coursesData into options format
        const options = coursesData.map((course) => ({
          value: course.course_id,
          label: `${course.course_difficulty} ${course.course_name}`,
          color: course.color,
        }));

        // Fetch profile data
        const profileResponse = await fetch(`${url}/tutor/profile?id=${id}`);
        const profileData = await profileResponse.json();
        // console.log("Profile Data", profileData);

        // Fetch Offerings data

        const offeringsResponse = await fetch(`${url}/tutor/offering?id=${id}`);
        const offeringsData = await offeringsResponse.json();
        setOfferings(offeringsData);

        // Filter selectedOptions based on offeringsData
        const filteredOptions = options.filter((option) =>
          offeringsData.includes(option.value)
        );
        setOfferings(filteredOptions);

        
        // console.log("Tutor Name", tutorName.trim().length);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once after the initial render
  //   console.log(courses);
  //   console.log(offerings);
  return (
    <div className="tutor-info-card__container">
      <div className="tutor-info-card__overview">
        <div className="tutor-info-card__avatar-container">
          <Avatar
            className="tutor-info-card__avatar"
            image={tutor.image}
            size="large"
            // shape="square"
          />
        </div>
        <div className="tutor-info-card__details">
          {
            <div className="tutor-info-card__name">
              {tutorName}
            </div>
          }
          <div className="tutor-info-card__description">
            {description}
          </div>
          <div className="tutor__courses__container">
            <img className="tutor-info-card__icon" src="/book.svg" alt="g" />
            <span className="tutor-info-card__text">Teaches {courses}</span>
          </div>
          <div className="tutor__languages__container">
            <img
              className="tutor-info-card__icon"
              src="/language.svg"
              alt="g"
            />
            <span className="tutor-info-card__text">
              {tutor.languages}
            </span>
          </div>
          <div className="tutor__languages__container">
            <img
              className="tutor-info-card__icon"
              src="/graduation1.svg"
              alt="g"
            />
            <span className="tutor-info-card__text">
              Studies at {university ? university : sampleData.education}
            </span>
          </div>
          <div className="tutor-info-card__about-me">
            <div
              className={clsx(
                showMore && "show-more__container--visible",
                !showMore && "show-more__container--hidden"
              )}
            >
              <p className="m-0 ">{about ? about : sampleData.aboutMe} </p>
            </div>
            <button
              className="show-more__button"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
        <div className="tutor-info-card__more-info__container">
          <div>
            <div className="tutor-info-card__rating">
              {/* <span className="tutor-info__rating-number"></span>{" "} */}
            </div>
            <div className="tutor-info-card__learn-more">
              <a href={`${frontEndUrl}/viewTutor/${tutorId}`}>
                {" "}
                <Button
                  className="tutor-info__learn-more"
                  label="Learn More"
                  onClick={() => {}}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
