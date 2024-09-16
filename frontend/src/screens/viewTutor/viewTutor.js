import Banner from "../../components/Banner";
import Header from "../../components/Header";
import { Avatar } from "primereact/avatar";
import { TabView, TabPanel } from "primereact/tabview";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "primereact/resources/themes/lara-light-indigo/theme.css";

import "./viewTutor.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContentLayout } from "../../components/MainContentLayout";
const url = process.env.REACT_APP_API_URL;

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
    const [profileData, setProfileData] = useState({});
    const { id } = useParams();

    const [reviews, setReviews] = useState([]);
    const [profile, setProfile] = useState({});


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    console.log(courses);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await fetch(`${url}/tutor/offerings`);
                const coursesData = await coursesResponse.json();
                console.log("THESE ARE COURSE DATA ", coursesData);

                // Transform coursesData into options format
                const options = coursesData.map((course) => ({
                    value: course.course_id,
                    label: `${course.course_difficulty} ${course.course_name}`,
                    color: course.color,
                }));

                // Fetch profile data
                const profileResponse = await fetch(
                    `${url}/tutor/fullprofile?id=${id}`
                );
                const profileData = await profileResponse.json();
                console.log("Profile Data", profileData);
                setProfileData(profileData);

                // Fetch Offerings data

                const offeringsResponse = await fetch(`${url}/tutor/offering?id=${id}`);
                const offeringsData = await offeringsResponse.json();

                // Filter selectedOptions based on offeringsData
                const filteredOptions = options.filter((option) =>
                    offeringsData.includes(option.value)
                );
                setOfferings(filteredOptions);

                const reviewsResponse = await fetch(`${url}/reviews?id=${id}`);
                const reviewsData = await reviewsResponse.json();
                console.log(`Reviews Data: ${reviewsData}`)
                setReviews(reviewsData);



            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once after the initial render
    //   console.log(courses);
    console.log(offerings);
    return (
        <MainContentLayout>

            {!isMobile ? (
                <div className="pc tutor-profile__view" key={profileData}>
                    <div className="tutor-profile__overview">
                        <div className="tutor-profile__avatar-container">
                            <Avatar
                                className="tutor-profile__avatar"
                                image={profileData.image}
                                size="large"
                                shape="circle"

                            // shape="square"
                            />
                        </div>
                        <div className="tutor-overview__details">
                            <div className="tutor-overview__name">
                                {profileData.firstname} {profileData.lastname}
                            </div>
                            <div className="tutor-overview__description">
                                {profileData.description}
                            </div>
                            <div className="tutor__courses__container">
                                <img className="tutor-overview__icon" src="/book.svg" alt="g" />
                                <span className="tutor-overview__text">
                                    Teaches {profileData.course_list}
                                </span>
                            </div>
                            <div className="tutor__languages__container">
                                <img
                                    className="tutor-overview__icon"
                                    src="/language.svg"
                                    alt="g"
                                />
                                <span className="tutor-overview__text">
                                    Speaks {profileData.languages}
                                </span>
                            </div>
                            <div className="tutor__languages__container">
                                <img
                                    className="tutor-overview__icon"
                                    src="/graduation1.svg"
                                    alt="g"
                                />
                                <span className="tutor-overview__text">
                                    Studies at {profileData.university}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="tutor-profile__tab-view">
                        <TabView>
                            <TabPanel className="tab-panel" header="About Me ">
                                <p className="m-0 tutor-profile__about-me">
                                    {" "}
                                    {profileData.bio}{" "}
                                </p>
                            </TabPanel>
                            <TabPanel className="tab-panel" header="My Courses">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                    {offerings.map((course) => {
                                        return (
                                            <div className="course-card" style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                padding: '20px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                transition: '0.3s'
                                            }}>
                                                <div style={{
                                                    width: '100%',
                                                    height: '50px',
                                                    backgroundColor: course.color,
                                                    borderRadius: '10px 10px 0 0',
                                                    marginBottom: '15px'
                                                }} />
                                                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{course.label}</h2>
                                            </div>
                                        );
                                    })}
                                </div>

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
                </div>) : (

                <div className="mb courses-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }} key={profileData}>

                    <div className="tutors-scroll__title">
                    </div>

                    <div className="tutor-profile__avatar-container">
                        <Avatar
                            className="tutor-profile__avatar"
                            image={profileData.image}
                            size="large"
                            shape="circle"

                        />
                    </div>
                    <div className="tutor-overview__details">
                        <div className="tutor-overview__name">
                            {profileData.firstname} {profileData.lastname}
                        </div>
                        <div className="tutor-overview__description">
                            {profileData.description}
                        </div>
                        <div className="tutor__courses__container">
                            <img className="tutor-overview__icon" src="/book.svg" alt="g" />
                            <span className="tutor-overview__text" style={{ textAlign: 'left', marginRight: '15px' }}>
                                Teaches {profileData.course_list}
                            </span>
                        </div>
                        <div className="tutor__languages__container">
                            <img
                                className="tutor-overview__icon"
                                src="/language.svg"
                                alt="g"
                            />
                            <span className="tutor-overview__text">
                                Speaks {profileData.languages}
                            </span>
                        </div>
                        <div className="tutor__languages__container">
                            <img
                                className="tutor-overview__icon"
                                src="/graduation1.svg"
                                alt="g"
                            />
                            <span className="tutor-overview__text">
                                Studies at {profileData.university}
                            </span>
                        </div>
                    </div>
                    <div style={{ maxWidth: '90%', marginTop: '2rem' }}>

                        <Accordion style={{ marginBottom: '1rem', border: '1px solid #103da2', borderRadius: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: '#103da2' }} />}
                                aria-controls="about-me-content"
                                id="about-me-header"
                                style={{ backgroundColor: '#103da2', color: 'white', borderRadius: '8px 8px 0 0' }}
                            >
                                <Typography>About Me</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: 'rgb(224 240 255 / 44%)', padding: '1rem' }}>
                                <Typography style={{ textAlign: 'left' }}>
                                    {profileData.bio}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginBottom: '1rem', border: '1px solid #103da2', borderRadius: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: '#103da2' }} />}
                                aria-controls="my-courses-content"
                                id="my-courses-header"
                                style={{ backgroundColor: '#103da2', color: 'white', borderRadius: '8px 8px 0 0' }}
                            >
                                <Typography>My Courses</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: 'rgb(224 240 255 / 44%)', padding: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                    {offerings.map((course) => {
                                        return (
                                            <div className="course-card" style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                padding: '5px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                transition: '0.3s'
                                            }}>
                                                <div style={{
                                                    width: '100%',
                                                    height: '30px',
                                                    backgroundColor: course.color,
                                                    borderRadius: '10px 10px 0 0',
                                                    marginBottom: '15px'
                                                }} />
                                                <Typography variant="h6" style={{ fontSize: '18px', fontWeight: 'bold' }}>{course.label}</Typography>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginBottom: '1rem', border: '1px solid #103da2', borderRadius: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: '#103da2' }} />}
                                aria-controls="reviews-content"
                                id="reviews-header"
                                style={{ backgroundColor: '#103da2', color: 'white', borderRadius: '8px 8px 0 0' }}
                            >
                                <Typography>Reviews</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: 'rgb(224 240 255 / 44%)', padding: '1rem' }}>
                                <div className="tutor-profile__review">
                                    {reviews.map((review) => {
                                        const newDate = new Date(review.date);
                                        return (
                                            <div className="tutor-profile__review__container" style={{ marginBottom: '1rem' }}>
                                                <div className="tutor-profile__review__header" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                    <Avatar style={{ marginRight: '1rem' }}>{review.guardian_name[0]}</Avatar>
                                                    <div className="tutor-profile__review__user">
                                                        <div className="tutor-profile__user-name" style={{ fontWeight: 'bold' }}>
                                                            {review.guardian_name}
                                                        </div>
                                                        <div className="tutor-profile__review__date" style={{ color: '#888' }}>
                                                            {newDate.toLocaleDateString("en-US")}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tutor-profile__review__details">
                                                    <div className="tutor-profile__review__comment" style={{ color: '#555' }}>
                                                        {review.description}
                                                    </div>
                                                </div>
                                                <Divider style={{ margin: '1rem 0' }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="tutor-profile__footer"></div>
                </div>)}
        </MainContentLayout >

    );
};
