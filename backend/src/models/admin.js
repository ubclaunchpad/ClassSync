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
        con.query(`CALL getAvailabilitiesByDateRange(?)`, [Date.now()], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    getAvailabilityByName(result) {
        //get the availability of tutor by name
        id = "temp" //get id by tutor name
        con.query(`CALL getAvailabilitiesByTutor(?)`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }


    // by course


    // by tutor name

}