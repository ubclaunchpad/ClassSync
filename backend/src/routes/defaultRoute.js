import { Router } from "express";
import StudentProfileController from "../controllers/studentProfileController.js";
import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
import adminController from "../controllers/adminController.js";
import authorize from "../auth/authentication.js";
import multer from 'multer';
import path from "path";
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import multerS3 from 'multer-s3';
import tutorRegistrationController from "../controllers/tutorRegistrationController.js";
const router = Router();
const student = new StudentProfileController();
const admin = new adminController();



router.get("/guardian/students", authorize("Guardian"), (req, res) => {

    student
        .getStudentsByGuardian(req.auth.userId)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});
  
  async function listBucketContents(bucketName) {
    const params = {
      Bucket: bucketName
    };
  
    try {
      const data = await s3.listObjects(params).promise();
      console.log('Bucket Contents:', data.Contents);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  listBucketContents("class-sync");

  async function uploadToS3(base64string) {

    const fileContent = Buffer.from(base64string, 'base64');
  
    const params = {
      Bucket: 'class-sync',
      Key: "test-file3.jpg",
      Body: fileContent,
      };
  
    try {
      const uploadResult = await s3.upload(params).promise();
      console.log('File uploaded to S3:', uploadResult.Location);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'class-sync',
      key: function (req, file, cb) {
        cb(null, file.originalname); // Set the key (filename) in the S3 bucket
      }
    })
  });
  
  router.post('/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        // No file was uploaded
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Handle the uploaded file
      console.log('File uploaded:', req.file.originalname);
      console.log('File location:', req.file.location);
      
      // Additional logic for handling the uploaded file...
  
      res.status(200).json({ success: 'File uploaded successfully', imageUrl: req.file.location});
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });
  
  
router.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const image = req.body.image;
  const role = req.body.role;

  const tutor = new tutorRegistrationController()
  return tutor.signup(email, password, fname, lname, image, role).then((id) => {
      res.status(200).json({ id: id });
  }).catch((err) => {
      res.status(500).send({ error: err.detail });
  });
});
router.get("/students", (_, res) => {
    student
        .getStudents()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.get("/student/:id/courses", (req, res) => {
    const id = req.params.id;
    student
        .getStudentCourses(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.get("/bookings", (req, res) => {
    const student_id = req.query.student_id;
    const course_id = req.query.course_id;
    student
        .getBookings(student_id, course_id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/appointments", (req, res) => {
    const tutor = new tutorAvailabilityController();
    return tutor.getAppointmentsByTutor(req.query.tutor_id, req.query.date)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});

router.get("/courses", (req, res) => {
    return admin.getCourses()
        .then((courses) => {
            res.status(200).json(courses);
        })
        .catch((err) => {
            console.log("Error getting courses ", err);
            res.status(500).json(err);
        });
})
router.get("/registrations", (req, res) => {
    return admin
        .getRegistrations()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}
);

router.post("/registrations", (req, res) => {
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    const registration_date = req.body.registration_date;
    return student
        .addEnrollment(student_id, course_id, registration_date)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log("Error adding enrollment ", err);
            res.status(500).json({ "error": "Registration already exists" });
        });
}
);

router.put("/registrations/:id/:status", (req, res) => {
    return admin
        .updatePaymentStatus(req.params.id, req.params.status)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}
);
export default router;