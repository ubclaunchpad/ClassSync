import Banner from "../../components/Banner";
import Header from "../../components/Header";
import { Avatar } from "primereact/avatar";
import { TabView, TabPanel } from "primereact/tabview";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import "./viewTutor.css";
import { useEffect, useState } from "react";
import { get } from 'react-hook-form';
const url = "http://localhost:8080";

const sampleData = {
    firstName: "Miki",
    lastName: "Okudera",
    description: "Ex Facebook, Ex Google, Ex Husband, Tech-lead ",
    courses: "Teaches Python, Java",
    languages: "Speaks English (Native), Russian (Native), Japanese (C2)",
    education: "Computer Science, University Of Tokyo",
    aboutMe: "",
    courseNames: [
        "Intro Into Python",
        "Foundations Of Javascript",
        "React and React Native",
    ],
    reviews: [
        {
            user: "Taki Kun",
            date: "Thu Nov 16 2023 23:15:18 GMT-0800 (Pacific Standard Time)",
            description:
                "Miki is a great teacher! I started with her a few months and I can see that I'm more comfortable with my Python and my Javascript is improving. She loves to help and can identify the difficulties you are having. She takes the time to explain to you how you can improve. Personally, I have 2-3 lessons a week and I'm already seeing results :)",
        },
        {
            user: "Alya Shendrikova,",
            date: "Fri Jun 11 2023 23:15:18 GMT-0800 (Pacific Standard Time)",
            description:
                "Miki focuses our classes on the areas that should be improved in my Javascript and that is very useful for me. She always brought up some interesting and actual themes for the discussions that makes them very practical and educative at the same time. Besides Gigi is very friendly and open-minded, I highly recommend her as a tutor.",
        },
        {
            user: "Valetina Kozlova",
            date: "Fri May 21 2023 23:15:18 GMT-0800 (Pacific Standard Time)",
            description:
                "Miki has the best hat and she teaches me great python! 4 stars because she is not my mom.",
        },
    ],
};

export const TutorView = () => {
    const [university, setUniversity] = useState("");
    const [description, setDescription] = useState("");
    const [about, setAbout] = useState("");
    const [courses, setCourses] = useState([]);
    const [offerings, setOfferings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [profile, setProfile] = useState({});
    console.log(courses);

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
                setProfile(profileData);
                console.log("Profile Data", profileData);

                // Fetch Offerings data

                const offeringsResponse = await fetch(`${url}/tutor/offering?id=${id}`);
                const offeringsData = await offeringsResponse.json();
                setOfferings(offeringsData);

                // Filter selectedOptions based on offeringsData
                const filteredOptions = options.filter((option) =>
                    offeringsData.includes(option.value)
                );
                setOfferings(filteredOptions);

                const reviewsResponse = await fetch(`${url}/reviews?id=${id}`);
                const reviewsData = await reviewsResponse.json();
                console.log(`Reviews Data: ${reviewsData}`)
                setReviews(reviewsData);

                setUniversity(profileData.university);
                setAbout(profileData.bio);
                setDescription(profileData.description);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once after the initial render
    //   console.log(courses);
    console.log(offerings);

    return (
        <div>
            <Banner smallText="Parent Dashboard" mainText="Hello, Richard!" />
            <div className="tutor-profile__view">
                <div className="tutor-profile__overview">
                    <div className="tutor-profile__avatar-container">
                        <Avatar
                            className="tutor-profile__avatar"
                            image="/TestProfileImage.png"
                            size="large"
                        // shape="square"
                        />
                    </div>
                    <div className="tutor-overview__details">
                        <div className="tutor-overview__name">
                            {sampleData.firstName} {sampleData.lastName}
                        </div>
                        <div className="tutor-overview__description">
                            {description ? description : sampleData.description}
                        </div>
                        <div className="tutor__courses__container">
                            <img className="tutor-overview__icon" src="/book.svg" alt="g" />
                            <span className="tutor-overview__text">{sampleData.courses}</span>
                        </div>
                        <div className="tutor__languages__container">
                            <img
                                className="tutor-overview__icon"
                                src="/language.svg"
                                alt="g"
                            />
                            <span className="tutor-overview__text">
                                {sampleData.languages}
                            </span>
                        </div>
                        <div className="tutor__languages__container">
                            <img
                                className="tutor-overview__icon"
                                src="/graduation1.svg"
                                alt="g"
                            />
                            <span className="tutor-overview__text">
                                Studies at {university ? university : sampleData.education}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="tutor-profile__tab-view">
                    <TabView>
                        <TabPanel className="tab-panel" header="About Me ">
                            <p className="m-0 tutor-profile__about-me">
                                {" "}
                                {about ? about : sampleData.aboutMe}{" "}
                            </p>
                        </TabPanel>
                        <TabPanel className="tab-panel" header="My Courses">
                            {offerings.map((course) => {
                                return (
                                    <div className="tutor-profile__courses">{course.label}</div>
                                );
                            })}
                        </TabPanel>
                        <TabPanel className="tab-panel" header="Reviews">
                            <div className="tutor-profile__review">
                                {reviews.map((review) => {
                                    const newDate = new Date(review.date);
                                    return (
                                        <div className="tutor-profile__review__container">
                                            <div className="tutor-profile__review__header">
                                                <Avatar label={review.guardian_name[0]} size="xlarge" />
                                                <div className="tutor-profile__review__user">
                                                    <div className="tutor-profile__user-name">
                                                        {review.guardian_name}
                                                    </div>
                                                    <div className="tutor-profile__review__date">
                                                        {newDate.toLocaleDateString("en-US")}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tutor-profile__review__details">
                                                <div className="tutor-profile__review__comment">
                                                    {review.description}
                                                </div>
                                            </div>
                                            <Divider type="solid" />
                                        </div>
                                    );
                                })}
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
                <div className="tutor-profile__footer"></div>
            </div>
        </div>
    );
};
