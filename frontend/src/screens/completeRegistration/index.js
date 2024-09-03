
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CompleteRegistration() {
    const [searchParams] = useSearchParams();
    const paramValue = searchParams.get('data');
    console.log(JSON.parse(decodeURIComponent(paramValue)))
    const navigate = useNavigate()


    const registrationPromises = [];

    const handleRegister = async (student_id, course_id) => {
        const URL = process.env.REACT_APP_API_URL
        let url = URL + "/registrations";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: student_id,
                    course_id: course_id,
                    registration_date: new Date().toISOString().slice(0, 10),
                    paid: 'card '
                }),
            });

            console.log("Response: ", response);

            console.log(response.error)


        } catch (err) {
            console.error("Error registering student", err);
        }
    };
    const registrations = JSON.parse(decodeURIComponent(paramValue))
    Object.entries(registrations).forEach(([key, value]) => {

        Object.values(value).forEach((val) => {
            handleRegister(key, val)
        })
    });

    Promise.all(registrationPromises)
        .then(() => {
            console.log("All registrations completed");
            document.cookie = ''
            navigate('/parentdash'); // Replace '/desired-route' with your target route
        })
        .catch((err) => {
            console.error("Error in one or more registrations", err);
        });


}

