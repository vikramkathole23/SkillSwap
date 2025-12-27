import meeting from "../models/meetindSchedule.model.js";
import request from "../models/request.model.js";
import ioConnection from "../sockets/index.socket.js";

export const sendSwapRequest = async (req, res) => {
  try {
    const { senderId, receiverId, skillId } = req.body;
    // ioConnection();
    const io = req.app.get("io");
    if (senderId == receiverId) {
      return res.status(500).json("you cannot send request to yourself!");
    }
    if (!io) {
     console.log("IO NOT FOUND");
      return res.status(500).json("Socket not initialized");
    }
    const Request = await request.create({
      sender: senderId,
      receiver: receiverId,
      skillId,
    });
    // console.log(Request);
    
    io.to(receiverId.toString()).emit("new_request", {
      message: "You received a new skill swap request!",
      senderId,
      skillId,
    });
    console.log(receiverId )
    res.status(201).json(Request);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error sending request",error);
  }
};

export const getUserRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const Requests = await request
      .find({ receiver: id })
      .populate("sender","-password -skills -createdAt -updatedAt")
      .populate("skillId");

    res.status(201).json(Requests);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error getUserRequest:",error);
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {status,stringDate}=req.body;
    const io = req.app.get("io");
    if (!io) {
     console.log("IO NOT FOUND");
      return res.status(500).json("Socket not initialized");
    }
    
    const Request = await request.findById(id);
    if (!Request) {
      return res.status(404).json("request not found!")
    } else if (Request.status === "accepted") {
      return res.status(404).json("you already accepted this request!")
    }

    Request.status = status;
    await Request.save();
    
    const meetingObj = {
    requestId: id,
    meetingTime: new Date(stringDate),
    user1: Request.sender,   
    user2: Request.receiver,
  };
    
    const createMeeting = await meeting.create(meetingObj)
    // io.to(Request.sender._id.toString()).emit("new_request", {
    //   message: `Your request accepted!`,
    //   createMeeting,
    //   id,
    // });
    return res.status(201).json(createMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error updateRequest:",error);
  }
};
