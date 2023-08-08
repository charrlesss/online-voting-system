import React from "react";
import { Toolbar, AppBar } from "@mui/material";
import { Box } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import userContext, { UserContext } from "../../CustomHooks/UserContext";
import useDetailsContext, {
  DetailsContext,
} from "../../CustomHooks/useDetailsContext";
import "../../style/Header.css";

const VotersHeader: React.FC = (): JSX.Element => {
  const { fullname }: UserContext = React.useContext(userContext);
  const { profile }: DetailsContext = React.useContext(useDetailsContext);
  const [dateTimeFormat, setDateTimeFormat] = React.useState<string>("");

  React.useEffect(() => {
    const myTimeout = (): any => {
      const customizeDate = new Date();
      const dayNight = customizeDate.toLocaleString().split(" ")[
        customizeDate.toLocaleString().split(" ").length - 1
      ];
      const dateDayFormat = customizeDate.toLocaleDateString("en-us", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      const minute = ("0" + customizeDate.getMinutes()).slice(-2);
      const hours = ("0" + customizeDate.getHours()).slice(-2);

      setDateTimeFormat(`${hours}:${minute}-${dateDayFormat} ${dayNight}`);
      const timeout: any = setTimeout(myTimeout, 1000);
      return timeout;
    };

    myTimeout();

    return () => {
      clearTimeout(myTimeout());
    };
  }, []);
  return (
    <AppBar
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#E3F2FD",
        position: "relative",
      }}
    >
      <Toolbar
        style={{
          width: "100%",
          height: "auto",
          position: "relative",
        }}
      >
        <Box
          style={{
            width: "95%",
            height: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              width: "fit-content",
              height: "auto",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              color: "black",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                fontFamily: "sans-serif",
                color: "#1a237e",
              }}
            >
              {dateTimeFormat.split("-")[0]}
            </p>
            <Box
              style={{
                position: "relative",
                display: "flex",
                fontSize: "11px",
                fontWeight: 300,
                fontFamily: "Verdana",
              }}
            >
              <p>
                {dateTimeFormat &&
                  dateTimeFormat.split("-")[1].split(",")[0].slice(0, 3) + ", "}
              </p>
              &#160;
              <p>
                {dateTimeFormat && dateTimeFormat.split("-")[1].split(",")[1]}
              </p>
            </Box>
          </Box>
          <Box className="container-message">
            <Box className="text-container">
              election day will take place on june 5 2022 starting at 7 a.m.
              until 7 p.m.
            </Box>
          </Box>
          <Chip
            style={{
              height: "34px",
            }}
            avatar={
              <Avatar
                style={{ height: 30, width: 30 }}
                src={`../../../container/${profile}`}
                alt="Voters Profile"
              />
            }
            label={fullname?.toUpperCase()}
            variant="outlined"
            color="primary"
          />
        </Box>
        <img
          src="../../OVS_L.png"
          style={{
            width: "150px",
            height: "150px",
            position: "relative",
          }}
          alt="for better"
        />
      </Toolbar>
    </AppBar>
  );
};

export default VotersHeader;
