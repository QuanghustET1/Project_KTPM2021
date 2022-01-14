import db from "../models/index";
require('dotenv').config();
import emailService from '../services/emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                await emailService.sendSimpleEmail({
                    receivedUser: data.email,
                    patientName: "Quang dep trai",
                    time: "8:00-9:00",
                    doctorName: "Quang handsome"
                });

                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor success'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    postBookAppointment: postBookAppointment
}