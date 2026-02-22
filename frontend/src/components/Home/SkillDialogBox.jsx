import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "react-loading-skeleton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function SkillDialogBox({ handleClose, isOpen, isLoading, data }) {
  return (
    <>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isOpen}
          PaperProps={{
            sx: {
              background: "linear-gradient(135deg, #1f1c2c, #928DAB)",
              color: "#fff",
              borderRadius: "20px",
              boxShadow: "0px 8px 30px rgba(0,0,0,0.5)",
              padding: "10px",
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {isLoading ? (
              <Skeleton animation="wave" height={36} width="60%" />
            ) : (
              <h1 className="text-2xl">{data.skillName}</h1>
            )}
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
                      {isLoading ? (
                        <Skeleton animation="wave" width={120} height={22} />
                      ) : (
                        <span className="ml-2 cursor-pointer hover:text-red-400">
                          {data.username}
                        </span>
                      )}
                    </div>

                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        width="70%"
                        height={32}
                        className="my-2"
                      />
                    ) : (
                      <h1 className="text-2xl my-2">{data.skillName}</h1>
                    )}

                    {isLoading ? (
                      <>
                        <Skeleton animation="wave" width="95%" />
                        <Skeleton animation="wave" width="90%" />
                        <Skeleton animation="wave" width="80%" />
                      </>
                    ) : (
                      <p>{data.description}</p>
                    )}

                    {isLoading ? (
                      <Skeleton animation="wave" width="60%" className="mt-2" />
                    ) : (
                      <p>Profession: {data.profession}</p>
                    )}

                    {isLoading ? (
                      <Skeleton animation="wave" width={160} />
                    ) : (
                      <p>Proficiency: {data.proficiency}</p>
                    )}
                    <div className="mt-[20px]">
                      {isLoading ? (
                        <Skeleton variant="rounded" width={140} height={36} />
                      ) : (
                        <button className="box-btn px-4 py-1">
                          Request Swap
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="Box-image h-[200px] ">
                    {isLoading ? (
                      <Skeleton variant="rounded" width="200px" height="150px" />
                    ) : (
                      <img
                        className="h-full w-full object-cover rounded-lg"
                        src={data.image?.url}
                        alt="img"
                      />
                    )}
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
