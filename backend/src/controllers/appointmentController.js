import { pgPool } from '../../index.js';

export const bookAppointment = async (req, res) => {
    const client = await pgPool.connect();
    const newAppointment = req.body.appointment;
    const guardian_id = req?.user?.id
    try {
        if (!guardian_id) {
            return res.status(400).json({ error: 'You must be logged.' });
        }
        if (!newAppointment) {
            return res.status(400).json({ error: 'Appointment details are missing.', success: false });
        }

        const { student_id, course_id, appointment_start, duration } = newAppointment;

        if (!student_id || !course_id || !appointment_start || !duration) {
            return res.status(400).json({ error: 'Required fields are missing in the appointment details.', success: false });
        }

        const result = await client.query(
            'CALL check_student_guardian($1,$2)',
            [student_id, guardian_id])
            .then(result => {
                const isMatchingGuardian = result[0].is_matching_guardian;
                console.log('Is matching guardian:', result);
                return isMatchingGuardian
            })
        if (!result) {
            return res.status(400).json({ error: 'Mismatch betwen guardian and student', success: false });
        }
        const res = await client.query(
            'CALL add_appointment($1,$2,$3,$4,$5)',
            [student_id, tutor_id, course_id, appointment_start, duration])
            .then(result => {
                const isMatchingGuardian = result[0].is_matching_guardian;
                console.log('Is matching guardian:', result);
                return isMatchingGuardian
            })
        return res.status(200).json({ result: res, success: true });
    } catch (error) {
        return res.status(400).json({ error: error.message, success: false });
    }
    finally {
        client.release();
    }


}

export const updateAppointment = async (req, res) => {
    const client = await pgPool.connect();
    const updatedAppointment = req.body.appointment;
    const guardian_id = req?.user?.id
    try {
        if (!updatedAppointment) {
            return res.status(400).json({ error: 'Appointment details are missing.', success: false });
        }

        const { student_id, course_id, appointment_start, duration } = updatedAppointment;
        if (!student_id || !course_id || !appointment_start || !duration) {
            return res.status(400).json({ error: 'Required fields are missing in the appointment details.', success: false });
        }
        const result = await client.query(
            'CALL check_student_guardian($1,$2)',
            [student_id, guardian_id])
            .then(result => {
                const isMatchingGuardian = result[0].is_matching_guardian;
                console.log('Is matching guardian:', result);
                return isMatchingGuardian
            })
        if (!result) {
            return res.status(400).json({ error: 'Mismatch betwen guardian and student', success: false });
        }
        const res = await client.query(
            'CALL update_appointment($1,$2,$3,$4,$5)',
            [student_id, tutor_id, course_id, appointment_start, duration])
            .then(result => {
                const isMatchingGuardian = result[0].is_matching_guardian;
                console.log('Is matching guardian:', result);
                return isMatchingGuardian
            })
        return res.status(200).json({ result: res, success: true });

    } catch (error) {
        return res.status(400).json({ error: error.message, success: false });
    }
}

