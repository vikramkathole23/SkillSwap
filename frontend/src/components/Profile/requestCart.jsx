import React, { useState } from "react";
import { Calendar } from "lucide-react";
import Picker from "rc-picker";
import "rc-picker/assets/index.css";
import render from "react-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

// dayjs + config for rc-picker
import dayjs from "dayjs";
import generateConfig from "rc-picker/lib/generate/dayjs";
import enUS from "rc-picker/lib/locale/en_US";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

function RequestCard({ data, onAccept, onReject }) {
  const [value, setValue] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isoDate = data.meetingDate;
  const date = new Date(isoDate);
  const readableDate = date.toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 mr-4">
      {/* Profile Image */}
      <img
        src={
          data.sender?.profilePic ||
          "https://randomuser.me/api/portraits/men/1.jpg"
        }
        alt={data.sender?.fullName || "User"}
        className="w-14 h-14 rounded-full object-cover border border-gray-600 shadow"
      />

      {/* /* Main Content */}
      <div className="flex-1">
        <p className="text-yellow-400 font-semibold text-sm mb-1">
          {data.status}
        </p>

        <p className="text-white font-bold text-lg leading-tight">
          Session with {data.sender?.fullName || "Unknown"}
        </p>

        <p className="text-blue-300 text-sm font-medium mt-1">
          {data.skillId?.skillName || "Topic not available"}
        </p>
       { data.status==="accepted"?
         <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
          {readableDate}
        </p>:
        <p className="text-gray-400 text-xs mt-1">
          {selectedDate
            ? selectedDate.format("DD MMM YYYY • hh:mm A")
            : "No date selected"}
        </p>}

        {/* Buttons */}
        {user._id !== data.sender?._id && (
          <div className="flex gap-3 mt-4">
            {onAccept && (
              <button
                onClick={() => onAccept(data?._id, selectedDate, data.status)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition-all shadow-md"
              >
                Accept
              </button>
            )}

            {onReject && (
              <button
                onClick={() => onReject(data._id)}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-xl hover:bg-red-700 transition-all shadow-md"
              >
                Reject
              </button>
            )}


          </div>
        )}
      </div>

      {/* Calendar Icon */}
      <div className="relative">
        <Calendar
          className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white transition"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <>
            <React.Fragment>
              <BootstrapDialog
                onClose={() => setOpen(!open)}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                  sx: {
                    background: "linear-gradient(135deg, #1f1c2c, #928DAB)", // gradient bg
                    color: "#fff",
                    borderRadius: "20px",
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.5)",
                    padding: "10px",
                  },
                }}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  <h1 className="text-2xl mb-2 cursor-pointer">
                    {data.skillName}
                  </h1>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={() => setOpen(!open)}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    <Picker
                      locale={enUS}
                      generateConfig={generateConfig}
                      showTime
                      value={value || dayjs().format("DD MMM YYYY, hh:mm A")}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setOpen(false); // auto close after select
                      }}
                      style={{
                        background: "#2b2b3d",
                        color: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    ></Picker>
                  </Typography>
                </DialogContent>
              </BootstrapDialog>
            </React.Fragment>
          </>
        )}
      </div>
    </div>
  );
}

export default RequestCard;
