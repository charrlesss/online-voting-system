import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React from "react";
import "../../../style/Voting.css";
import {
  useFetchCandidates,
  useFetchVotersVote,
  useVoting,
} from "../../../CustomAPI/API";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import userContext, { UserContext } from "../../../CustomHooks/UserContext";
import useDetailsContext, {
  DetailsContext,
} from "../../../CustomHooks/useDetailsContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { candidatesName } from "./VotersOverview";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import LoaderApi from "../../LoaderApi";
const theme = createTheme({
  palette: {
    action: {
      disabled: "#ef6c00",
    },
  },
});

const MySwal = withReactContent(Swal);

const CheckOnce = (name: string): { checkLength: number; isCheck: any[] } => {
  const isCheck: any = Array.from(document.getElementsByName(`${name}`)).filter(
    (data: any) => {
      return data.checked;
    }
  );
  const allInput: string[] | null = [];
  if (isCheck.length > 1) {
    isCheck.forEach((element: HTMLInputElement) => {
      allInput.push(element.value);
    });
    return {
      checkLength: isCheck.length,
      isCheck: allInput,
    };
  }
  return {
    checkLength: isCheck.length,
    isCheck: [isCheck[0] && isCheck[0].value],
  };
};

const Voting: React.FC = (): JSX.Element => {
  const {
    mutate,
    error: votingError,
    loading: votingLoading,
    data: votingData,
  } = useVoting();

  const { verify, voted, fullname }: UserContext =
    React.useContext(userContext);
  const { data, loading, error } = useFetchCandidates();
  const { socket }: DetailsContext = React.useContext(useDetailsContext);

  React.useEffect(() => {
    if (votingData && votingData.voting.success) {
      toast.success(`${fullname} is voted.`);
      socket.emit("vote-notify", `${fullname} is voted.`);
      MySwal.fire({
        icon: "success",
        showConfirmButton: true,
        timer: 5000,
        title: <strong>Congratulations!</strong>,
        html: <h5>Check your votes</h5>,
      }).then((): void => {
        window.location.reload();
      });
    }
  }, [votingData ,fullname ,socket ]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const mayor = CheckOnce("mayor");
    const vicemayor = CheckOnce("vicemayor");
    const msp = CheckOnce("msp");

    if (
      mayor.checkLength > 1 ||
      mayor.checkLength < 1 ||
      vicemayor.checkLength > 1 ||
      vicemayor.checkLength < 1 ||
      msp.checkLength < 6 ||
      msp.checkLength > 6
    ) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 5000,
        title: <strong>Ooops!</strong>,
        html: <h5>For Mayor and Vicemayor vote for 1 & msp is vote for 6</h5>,
      });
    }
    mutate({
      variables: {
        mayor: mayor.isCheck,
        vicemayor: vicemayor.isCheck,
        msp: msp.isCheck,
      },
    });
  };

  if (votingLoading) {
    return (
      <Box className="loader-container">
        <Box className="loader-content">
          <p className="loader-title">Please wait...</p>
          <p className="loader-text">Your request is on the process</p>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Box>
      </Box>
    );
  }

  if (loading) return <LoaderApi />;
  if (error) return <div>Error</div>;
  if (votingError) return <div>Error</div>;
  if (voted) {
    return <Voted />;
  }

  const mayorCandidates = candidatesName(data && data.fetchCandidates, "mayor");
  const vicemayorCandidates = candidatesName(
    data && data.fetchCandidates,
    "vicemayor"
  );
  const mspCandidates = candidatesName(data && data.fetchCandidates, "msp");

  return (
    <Box className="voting-main-container">
      <form onSubmit={handleChange} className="voting-form">
        <Box className="mayor">
          <Box className="title">Mayor</Box>
          <Box className="checkbox-container">
            {mayorCandidates.map((data: any, idx: number) => {
              return <CustomCheckBox label={data} name={"mayor"} key={idx} />;
            })}
          </Box>
        </Box>
        <Box className="vicemayor">
          <Box className="title">Vice Mayor</Box>
          <Box className="checkbox-container">
            {vicemayorCandidates.map((data: any, idx: number) => {
              return (
                <CustomCheckBox label={data} name={"vicemayor"} key={idx} />
              );
            })}
          </Box>
        </Box>
        <Box className="msp">
          <Box className="title">MSP</Box>
          <Box className="checkbox-container">
            {mspCandidates.map((data: any, idx: number) => {
              return <CustomCheckBox label={data} name={"msp"} key={idx} />;
            })}
          </Box>
        </Box>
        <ThemeProvider theme={theme}>
          <Button
            className="button"
            type="submit"
            disabled={verify ? false : true}
            variant="contained"
            color={verify ? "primary" : "warning"}
          >
            {verify ? "Submit" : "Your account is not verified!"}
          </Button>
        </ThemeProvider>
      </form>
    </Box>
  );
};

export default Voting;

const CustomCheckBox: React.FC<{
  label?: string;
  name: string;
}> = ({ label, name }): JSX.Element => {
  const [checked, setChange] = React.useState<boolean>(false);

  return (
    <>
      <Box className="checkbox">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                name={name}
                value={label}
                inputProps={{ "aria-label": "primary checkbox" }}
                onChange={() => {
                  setChange(!checked);
                }}
              />
            }
            label={label}
          />
        </FormGroup>
      </Box>
    </>
  );
};

const Voted: React.FC = (): JSX.Element => {
  const { data, loading, error } = useFetchVotersVote();

  React.useEffect(() => {
    var canvas: any = document.getElementById("canvas");
    if (!canvas && !data) return;
    QRCode.toCanvas(
      canvas,
      `
  Mayor  \n ${data.fetchVote[0].mayor}  \n
  Vice mayor \n ${data.fetchVote[0].vicemayor}  \n
  MSP  \n
  ${data.fetchVote[0].msp[0]}
  ${data.fetchVote[0].msp[1]}
  ${data.fetchVote[0].msp[2]}
  ${data.fetchVote[0].msp[3]}
  ${data.fetchVote[0].msp[4]}
  ${data.fetchVote[0].msp[5]}
  `,
      function (error: any) {
        if (error) console.error(error);
        console.log("success!");
      }
    );
  }, [data]);

  if (loading) return<LoaderApi />;
  if (error) return <div>Error</div>;

  return (
    <>
      <Box className="vote-container">
        <Box className="title">
          <h2>Ballot Receipt</h2>
          <h3>Scan to see your vote</h3>
        </Box>
        <Box className="qrcode-container">
          <canvas id="canvas"></canvas>
        </Box>
        <Box className="id-container">
          <h2>Ballot Receipt ID</h2>
          <h5>
            Search for this id to see all the candidates you voted for, right
            there in the <strong>( Result )</strong> to make sure your vote was counted
          </h5>
          <p>
            Your Receipt ID:{" "}
            <strong>{data && data.fetchVote[0].receiptNumber}</strong>
          </p>
        </Box>
      </Box>
    </>
  );
};
