export class admin {
    getAvailabilityById(id, result) {
        //get the availability of tutor by id
        con.query(`CALL getAvailabilitiesByTutor(?)`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    getAllFutureAvailability(result) {
        //get the availability in the future
        con.query(`CALL getAvailabilitiesByDateRange(?,?)`, [Date.now(), new Date(8.64e15)], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    getAvailabilityByCourse(course, result) {
        //get tutors by course
        con.query(`CALL getTutorsByCourse(?)`, [course], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                var ids = res[0].map(function (item) {
                    return item.id;
                });
                
                availabilities = [];
                
                ids.forEach(id => {
                    availabilities.push(con.query(`CALL getAvailabilitiesByTutor(?)`, [id], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        } else {
                            return res[0];
                        }
                    }));
                });
                
                result(null, availabilities);
            }
        });

        //get the availability of tutor by id

    }
}