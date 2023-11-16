import transectionModel from "../models/transationModel.js"

// const moment = require("moment");
import moment from 'moment'
export const getAllTransection = async (req, res) => {
  try {
    const { frequency,selectedDate,type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).send({
      "success" : true,
      transections
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteTransection = async (req, res) => {
  try {
    const { tid } = req.params

    await transectionModel.findByIdAndDelete(tid);
    res.status(202).send({
      success: true,
      message: 'transection deleted successfully'
  })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const editTransection = async (req, res) => {
  try {
    const { tid } = req.params;
    const updates = req.body; // Assuming the updates are sent in the request body

    // Use the `findByIdAndUpdate` method to update the document
    const updatedTransection = await transectionModel.findByIdAndUpdate(tid, updates, { new: true });

    if (!updatedTransection) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json({ message: 'Edit successfully', updatedTransection });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


export const addTransection = async (req, res) => {
  try {
    // const newTransection = new transectionModel(req.body);
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//single transection
export const getSingleTransection = async (req, res) => {
  try {
      const trans = await transectionModel.findById(req.params.id);
      if (!trans) {
        return res.status(404).json({ error: 'transection not found' });
      }
      res.status(200).json(trans);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

