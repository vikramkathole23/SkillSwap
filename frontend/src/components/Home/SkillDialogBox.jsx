import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function SkillDialogBox({ handleClose, isOpen, data }) {
  return (
    <>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <h1 className="text-2xl mb-2 cursor-pointer">{data.skillName}</h1>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
              <div className="box-container my-4">
                <div className="inner-container flex justify-between ">
                  <div className="description ">
                    <div className="flex text-center username mb-2">
                      <span className="cursor-pointer">
                        <p>
                          <Avatar
                            sx={{ width: 30, height: 30 }}
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                        </p>
                      </span>
                      <span className="text-center ml-2 cursor-pointer hover:text-red-700">
                        {" "}
                        {data.username}
                      </span>
                    </div>
                    <h1 className="text-2xl mb-2 cursor-pointer">
                      {data.skillName}
                    </h1>
                    <p>{data.description}</p>
                    <div className="mt-[20px]">
                      <button className="box-btn px-4 py-1">
                        Request Swap
                      </button>
                    </div>
                  </div>
                  <div className="Box-image h-[200px] ">
                    <img
                      className="h-full "
                      src="https://framerusercontent.com/images/0YHMW01oxIdRY4oW3VsdPXOL8xQ.jpg "
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
}

export default SkillDialogBox;
