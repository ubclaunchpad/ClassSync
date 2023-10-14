export class admin {
    getAvailability(id, result) {
        //get the availability of specific admin user
        con.query(`CALL getAvailabilitiesByTutor(?)`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }
}