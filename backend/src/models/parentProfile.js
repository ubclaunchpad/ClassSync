// import con from "../config/Database.js";
import {
    pgPool
} from '../../index.js'


export class parentProfile {
    async loadAllAvailabilities() {
        const client = await pgPool.connect()
        try {
            return new Promise((resolve, reject) => {
                    con.query('CALL getAllAvailabilities', (err, res) => {
                        if(err) {
                            console.log('Error:', err)
                            reject(err)
                        } else {
                            resolve(err)
                        }
                    })
                }
            )
        } finally {
            client.release()
        }
    }
    
    async loadAllAvailabilitiesByTutor() {
        const client = await pgPool.connect()
        try {
            return new Promise((resolve, reject) => {
                    con.query('CALL getAllAvailabilities', (err, res) => {
                        if(err) {
                            console.log('Error:', err)
                            reject(err)
                        } else {
                            resolve(err)
                        }
                    })
                }
            )
        } finally {
            client.release()
        }
    }
}