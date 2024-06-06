import React from "react";
import { Box, Typography } from "@mui/material";

export const Title = ({ title, width, fontSize }) => {
  return (
    <Box
      sx={{
        display: "flex",
        background:
          "transparent linear-gradient(45deg, #6BC171 0%, #4CAF50 25%, #43A047 50%, #388E3C 75%, #2E7D32 100%) 0% 0% no-repeat padding-box",
        width: width || "98%",
        marginLeft: "0px",
        marginRight: "50px",
        height: "50px",
        color: "#fff",
        borderRadius: "10px",
        pl: "10px",
        pr: "10px",
        fontSize: fontSize || "17px",
        fontWeight: "900",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Typography sx={{ fontSize: fontSize || "17px" }}>{title}</Typography>
    </Box>
  );
};
