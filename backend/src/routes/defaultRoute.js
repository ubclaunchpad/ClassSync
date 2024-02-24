import { Router } from "express";
import StudentProfileController from "../controllers/studentProfileController.js";
import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
import adminController from "../controllers/adminController.js";
import authorize from "../auth/authentication.js";
import {S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import multer from 'multer';
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

  async function deleteObjectFromBucket(url) {
    // Extract the bucket name and key from the URL
    const urlParts = url.replace('https://', '').split('/');
    const bucketName = urlParts[1];
    const key = urlParts.slice(2).join('/');

    const params = {
      Bucket: bucketName,
      Key: key
    };

    try {
      const data = await s3.deleteObject(params).promise();
      console.log('Object deleted:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  router.delete('/file', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        await deleteObjectFromBucket(url);
        res.status(200).json({ success: 'Object deleted successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error deleting object' });
    }
});


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
  
  router.post('/upload/all', upload.array('images', 12), (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        // No files were uploaded
        return res.status(400).json({ error: 'No files uploaded' });
      }

      // Handle the uploaded files
      req.files.forEach(file => {
        console.log('File uploaded:', file.originalname);
        console.log('File location:', file.location);
      });

      // Additional logic for handling the uploaded files...

      res.status(200).json({ 
        success: 'Files uploaded successfully', 
        imageUrls: req.files.reduce((acc, file) => {
          acc[file.originalname] = file.location;
          return acc;
        }, {}) 
      });    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ error: 'Error uploading files' });
    }
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

router.post("/booking/files", (req, res) => {
  const tutor = new tutorRegistrationController()
  const booking_id = req.body.id;
  const files = req.body.files;
  console.log("Sharing files for ", booking_id, " - ", files)
  tutor.shareFiles(booking_id, files).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(500).json(err);
  });
})

router.get("/booking/notes", (req, res) => {
  const booking_id = req.query.id
  const tutor = new tutorRegistrationController()
  tutor.getNotesForBooking(booking_id).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(500).json(err);
  })
})

router.post("/notes", (req, res) => {
  const booking_id = req.body.id
  const notes = req.body.notes
  console.log("Notes are ", notes)
  const tutor = new tutorRegistrationController()
  return tutor.updateNotes(booking_id, notes).then(() => {
    res.status(200);
  }).catch((err) => {
    res.status(500).json(err);
  })

})
router.get("/class", (req, res) => {
  const booking_id = req.query.id
  const tutor = new tutorRegistrationController()
  tutor.getClassInfo(booking_id).then((response) => {
    res.status(200).json(response);
}).catch((err) => {
    res.status(500).json(err);
})
})

router.get("/course/files", (req, res) => {
  const tutor = new tutorRegistrationController()
    const enrollment_id = req.query.id;
    tutor.getCourseFiles(enrollment_id).then((response) => {
        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json(err);
    });



})

router.get("/sharedfiles", (req, res) => {
  const tutor = new tutorRegistrationController()
    const booking_id = req.query.id;
    tutor.getSharedFiles(booking_id).then((response) => {
        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json(err);
    });



})

router.post("/classInfo", (req, res) => {
  const enrollmentId = req.body.enrollment_id;
  const completed = req.body.completed;
  const booking_id = req.body.booking_id;
  const notes = req.body.notes;

  const tutor = new tutorRegistrationController();

  const addLearningGoalProgressPromise = tutor.addLearningGoalProgress(enrollmentId, completed);
  const updateNotesPromise = tutor.updateNotes(booking_id, notes);

  Promise.all([addLearningGoalProgressPromise, updateNotesPromise])
    .then(() => {
      console.log("Successfully saved both")
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post("/learninggoals", (req, res) => {
    const enrollmentId = req.body.id;
    const completed = req.body.completed;
    const tutor = new tutorRegistrationController()
    tutor.addLearningGoalProgress(enrollmentId, completed)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
})
router.get("/learninggoals", (req, res) => {
    const enrollmentId = req.query.id;
    const tutor = new tutorRegistrationController()
    tutor.getLearningGoalsProgress(enrollmentId)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
})
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

router.post("/course/tutors", (req, res) => {
  const course_id = req.body.course_id;
  const tutor_ids = req.body.tutor_ids;
  admin.addTutorsToCourse(course_id, tutor_ids).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(500).json(err);
  })
})
router.get("/course/tutor", (req, res) => {
  admin.getCourseTutorMap().then((response) => {
    res.status(200).json(response)
  })
    .catch((err) => {
      res.status(500).json(err);
  });
  
})
router.post("/course", (req, res) => {
  console.log(req.body)

  admin.addCourse(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(500).json(err);
  })
})

router.get("/tutors", (req, res) => {
  admin.getTutors().then((response) => {
    res.status(200).json(response)
  })
    .catch((err) => {
      res.status(500).json(err);
  });
  
})


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