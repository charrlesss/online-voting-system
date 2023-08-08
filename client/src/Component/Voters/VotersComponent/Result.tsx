import React from "react";
import { Box, TextField, Button } from "@mui/material";
import "../../../style/Result.css";
import "../../../style/Bubble.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useDetailsContext, {
  DetailsContext,
} from "../../../CustomHooks/useDetailsContext";

interface CandidatesAndPosition {
  _id: string;
  FullName: string;
  position: string;
  votes: number;
  profile: string;
  voterReceiptId: string[];
}

const Result: React.FC = ():JSX.Element => {
  const [searchId, setSearchID] = React.useState<string>("");
  const { socket }: DetailsContext = React.useContext(useDetailsContext);
  const [candidatesAndPosition, setCandidatesAndPosition] = React.useState<
    CandidatesAndPosition[]
  >([]);

  React.useEffect(() => {
    socket.on("candidatesAndPosition", (data: any) => {
      setCandidatesAndPosition(data);
    });
  });

  const mayorCandidates = candidatesName(candidatesAndPosition,"mayor");
  const vicemayorCandidates = candidatesName(candidatesAndPosition,"vicemayor");
  const mspCandidates = candidatesName(candidatesAndPosition,"msp");

  const hanldeChange = (e: any) => {
    setSearchID(() => e.target.value);
  };

  return (
    <Box className="result-container">
      <Buble />
      <Box className="main-search-container">
        <Box className="search-container">
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            size="small"
            color="secondary"
            placeholder="search for your reciept id"
            onChange={hanldeChange}
            value={searchId}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            style={{
              background: "white",
              borderRadius: "5px",
            }}
          />
        </Box>
      </Box>

      <Box className="candidates-profile-container">
        <Box className="candidates-position-mayor">
          <Box className="candidates-header">Mayor</Box>
          <Box className="candidates-profile-separator">
            {mayorCandidates.map((data: CandidatesAndPosition, idx: number) => {
              return (
                <Box className="candidates-profile" key={idx}>
                  <Box className="profile-count">
                    {data.votes.toLocaleString()}
                  </Box>
                  <img
                    src={`../../${data.profile}`}
                    className="profile-img"
                    alt="candidates-profile"
                  />
                  <Selection
                    search={searchId}
                    name={data.FullName}
                    recieptId={data.voterReceiptId}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box className="candidates-position-vicemayor">
          <Box className="candidates-header">Vice Mayor</Box>
          <Box className="candidates-profile-separator">
            {vicemayorCandidates.map(
              (data: CandidatesAndPosition, idx: number) => {
                return (
                  <Box className="candidates-profile" key={idx}>
                    <Box className="profile-count">
                      {data.votes.toLocaleString()}
                    </Box>
                    <img
                      src={`../../${data.profile}`}
                      className="profile-img"
                      alt="candidates-profile"
                    />
                    <Selection
                      search={searchId}
                      name={data.FullName}
                      recieptId={data.voterReceiptId}
                    />
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
        <Box className="candidates-position-msp">
          <Box className="candidates-header">
            Member Sangguniang Panglungsod
          </Box>
          <Box className="candidates-profile-separator">
            {mspCandidates.map((data: CandidatesAndPosition, idx: number) => {
              return (
                <Box className="candidates-profile" key={idx}>
                  <Box className="profile-count">
                    {data.votes.toLocaleString()}
                  </Box>
                  <img
                    src={`../../${data.profile}`}
                    className="profile-img"
                    alt="candidates-profile"
                  />
                  <Selection
                    search={searchId}
                    name={data.FullName}
                    recieptId={data.voterReceiptId}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Result;

const Selection: React.FC<{
  name: string;
  recieptId: string[];
  search?: string;
}> = ({ name, recieptId, search }):JSX.Element => {
  const [dropDown, setDropDown] = React.useState<boolean>(false);
  const [allDropDown, setAllDropdown] = React.useState<
    NodeListOf<Element> | Array<any>
  >([]);
  const [showBySearch, setShowBySearch] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!search) return;
    recieptId.forEach((data: string) => {
      if (search === data) {
        setDropDown(true);
        setShowBySearch(true);
      } else {
        allDropDown.forEach((element: any) => {
          element.classList.remove("show");
        });
      }
    });
  }, [search, recieptId, allDropDown]);

  React.useEffect(() => {
    setAllDropdown(document.querySelectorAll("#dropDown"));
  }, []);

  React.useEffect(() => {
    allDropDown.forEach((element: any) => {
      if (element.classList.contains("show") && dropDown) {
        element.style.setProperty("--setHeight", "100px");
        element.style.setProperty("--setOpacity", "12");
      } else if (
        element.classList.contains("notShow") &&
        (!dropDown || !showBySearch)
      ) {
        element.style.setProperty("--setHeight", "0px");
        element.style.setProperty("--setOpacity", "-1");
      }
    });
  }, [dropDown, allDropDown, showBySearch]);

  return (
    <>
      <Button
        endIcon={dropDown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        className="list-of-voted"
        onClick={() => setDropDown((c) => !c)}
      >
        {name}
      </Button>
      <Box
        id="dropDown"
        className={`drop-down-data  ${dropDown ? "show" : "notShow"}  ${
          showBySearch ? "search" : "notSearch"
        }`}
      >
        {recieptId.map((data: string, idx: number) => {
          if (showBySearch) {
            allDropDown.forEach((element: any) => {
              element.classList.add("show");
              element.classList.add("search");
              if (data !== search) {
                element.classList.remove("search");
                element.classList.remove("show");
              }
            });
          }

          return dropDown || showBySearch ? (
            <p
              key={idx}
              style={{
                backgroundColor: data === search ? "blue" : "transparent",
              }}
              className={`${data === search && "find"} `}
            >
              {data}
            </p>
          ) : (
            <p
              key={idx}
              className={`${data === search && "find"} `}
              style={{
                backgroundColor: data === search ? "blue" : "transparent",
              }}
            >
              {data}
            </p>
          );
        })}
      </Box>
    </>
  );
};

export const Buble: React.FC = ():JSX.Element => {
  return (
    <Box className="wrapper">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </Box>
  );
};

export function candidatesName(
  candidates: CandidatesAndPosition[],
  position: string
): CandidatesAndPosition[] {
  return candidates.filter((data: any) => data.position.trim() === position);
}
