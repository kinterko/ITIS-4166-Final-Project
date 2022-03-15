// Kory Kinter

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    title: { type: String, required: [true, 'Connection Title is Required.'] },
    topic: { type: String, required: [true, 'Connection Topic is Required.'] },
    details: { type: String, required: [true, 'Connection Details are Required.'], minLength: [10, 'Details should have at least 10 characters'] },
    meetingDays: { type: String, required: [true, 'Connection Meeting Days is Required.'] },
    when: { type: String, required: [true, 'Connection Start Date is Required.'] },
    startTime: { type: String, required: [true, 'Connection Start Time is Required.'] },
    endTime: { type: String, required: [true, 'Connection End Time is Required.'] },
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    where: { type: String, required: [true, 'Connection Location is Required.'] },
    imgUrl: { type: String, required: [true, 'Connection Image link is Required.'] }
},
{timestamps: true }
);

module.exports = mongoose.model('Connection', connectionSchema);