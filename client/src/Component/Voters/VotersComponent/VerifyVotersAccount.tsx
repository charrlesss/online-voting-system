import React from "react";
import { Box } from "@material-ui/core";
import "../../../style/VerifyVotersAccount.css";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import userContext, { UserContext } from "../../../CustomHooks/UserContext";
import {
  useCapturedImage,
  useUploadFile,
  useVerifyVotersToValidVoters,
} from "../../../CustomAPI/API";
import "../../../style/DotsLoader.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { codeInput1, codeInput2 } from "../../../CustomAPI/InputCode";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ChnageContentForward = (next: string) => {
  window.localStorage.setItem("step", `${next}`);
};

interface VerifyVoters {
  verifyVotersIDNumber: string | null;
  verifyVotersPrecinct: string | null;
  verifyVotersFullname: string | null;
  verifyVotersPicture: string;
  verifyVotersIdPicture: string;
}

function CheckObject(obj: any) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== "") return false;
  }
  return true;
}

const VerifyVotersAccount: React.FC = (): JSX.Element => {
  const { waitingVerified, urlID, verify }: UserContext =
    React.useContext<UserContext>(userContext);
  const { mutate, error, loading, data } = useVerifyVotersToValidVoters();

  const [step, setStep] = React.useState<string | null>(
    window.localStorage.getItem("step") || null
  );

  const [fullname, setFullName] = React.useState<{
    firstName: string;
    lastName: string;
    middleName: string;
  }>({ firstName: "", lastName: "", middleName: "" });

  const updateFullName = React.useCallback(
    (e: any, type: string) => {
      const myInput: string = e.target.value;
      if (type === "firstName") {
        setFullName({
          firstName: myInput,
          lastName: fullname.lastName,
          middleName: fullname.middleName,
        });
        return;
      }
      if (type === "lastName") {
        setFullName({
          firstName: fullname.firstName,
          lastName: myInput,
          middleName: fullname.middleName,
        });
        return;
      }
      if (type === "middleName") {
        setFullName({
          firstName: fullname.firstName,
          lastName: fullname.lastName,
          middleName: myInput,
        });
        return;
      }
    },
    [fullname.firstName, fullname.lastName, fullname.middleName]
  );

  const ChangeStep = React.useCallback(() => {
    setStep(window.localStorage.getItem("step") || null);
  }, []);

  React.useEffect(() => {
    if (data && data.verifyVotersToValidVoters.success) {
      MySwal.fire({
        icon: "success",
        showConfirmButton: true,
        timer: 5000,
        title: <strong>Congratulations!</strong>,
        html: <h5>{data.verifyVotersToValidVoters.message}</h5>,
      }).then(() => {
        window.localStorage.clear();
        window.location.href = `/s/${urlID}/verify`;
      });
    }
    if (data && !data.verifyVotersToValidVoters.success) {
      MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 5000,
        title: <strong>Oooppss!</strong>,
        html: <h5>{data.verifyVotersToValidVoters.message}</h5>,
      });
    }
  }, [data, urlID]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const voterIdCodeContainer1: string[] = [];
    const voterIdCodeContainer2: string[] = [];
    const fistInput: any =
      window.localStorage.getItem("step1finalImage") ||
      window.localStorage.getItem("step1chooseFile");
    const secondInput: any =
      window.localStorage.getItem("step2finalImage") ||
      window.localStorage.getItem("step2chooseFile");

    document.getElementsByName("code").forEach((data: any) => {
      voterIdCodeContainer1.push(data.value);
    });
    document.getElementsByName("code1").forEach((data: any) => {
      voterIdCodeContainer2.push(data.value);
    });

    if (!fistInput) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 2500,
        text: "ID picture is required!",
        title: "Oops",
      });
    }
    if (!secondInput) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 2500,
        title: "Oops",
        text: "Your picture is required!",
      });
    }
    const checking: string | null =
      voterIdCodeContainer1.join("") || voterIdCodeContainer2.join("");

    if (!checking && CheckObject(fullname)) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 2500,
        title: "Oops",
        text: "Fullname is required!",
      });
    }
    if (
      voterIdCodeContainer1.join("") &&
      voterIdCodeContainer1.join("").length !== 22
    ) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 2500,
        title: "Oops",
        text: "Voters ID number must be fulfill!",
      });
    }
    if (
      voterIdCodeContainer2.join("") &&
      voterIdCodeContainer2.join("").length !== 5
    ) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 2500,
        title: "Oops",
        text: "Precinct locator must be fulfill!",
      });
    }
    if (
      !CheckObject(fullname) &&
      (!fullname.firstName || !fullname.lastName || !fullname.middleName)
    ) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 5000,
        title: "Oops",
        text: "Fullname includes lastname, firstname and middlename!!",
      });
    }
    if (
      !CheckObject(fullname) &&
      (/\d/.test(fullname.firstName) ||
        /\d/.test(fullname.lastName) ||
        /\d/.test(fullname.middleName))
    ) {
      return MySwal.fire({
        icon: "error",
        showConfirmButton: true,
        timer: 2500,
        title: "Oops",
        text: "Enter a valid fullname number is not allowed!",
      });
    }

    const verifyVoters: VerifyVoters = {
      verifyVotersIDNumber: voterIdCodeContainer1.join(""),
      verifyVotersPrecinct: voterIdCodeContainer2.join(""),
      verifyVotersFullname: [
        fullname.lastName,
        fullname.firstName,
        fullname.middleName,
      ].join(","),
      verifyVotersPicture: secondInput,
      verifyVotersIdPicture: fistInput,
    };

    mutate({ variables: verifyVoters });
  };

  if (loading) {
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
  if (error) {
    return <div>error</div>;
  }

  if (waitingVerified) {
    return (
      <Box className="waiting-container">
        <img src="../../OVS_L.png" alt="online voting system logo" />
        <Box className="waiting-content-text">
          <p className="first-p">Your Account is Under Review</p>
          <p className="second-p">
            You will recieve an email once verification is complete
          </p>
          <p className="third-p">Estimate Completion 1 or 2 Days</p>
        </Box>
      </Box>
    );
  }
  if (verify) {
    return (
      <Box className="success-container">
        <img src="../../verifiedVoters.jpg" alt="online voting system logo" />
        <Box className="success-content-text">
          <p className="first-p">Account activated</p>
          <p className="second-p">
            Congratulations! your Barangay Online Voting account has been
            verified.
          </p>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="container-verify-account">
      <Box className="instructions">
        {(!step && <FirstInstructions />) ||
          (step === "second" && <SecondInstructions />) ||
          (step === "third" && <ThirdInstructions />)}
      </Box>
      <Box className="verify-step">
        <Box className={`first-circle`}></Box>
        <Box className={`first-line  ${step ? "colored" : "plain"} `}></Box>
        <Box className={`second-circle`}></Box>
        <Box
          className={`second-line ${step === "third" ? "colored" : "plain"}`}
        ></Box>
        <Box className="third-circle"></Box>
      </Box>
      <form onSubmit={handleSubmit}>
        {(!step && <FirstVerify ChangeStep={ChangeStep} />) ||
          (step === "second" && <SecondVerify ChangeStep={ChangeStep} />) ||
          (step === "third" && (
            <ThirdVerify
              ChangeStep={ChangeStep}
              updateFullName={updateFullName}
              fullname={fullname}
            />
          ))}
      </form>
    </Box>
  );
};

export default VerifyVotersAccount;

const FirstVerify: React.FC<{ ChangeStep: React.EffectCallback }> = ({
  ChangeStep,
}): JSX.Element => {
  const { urlID }: UserContext = React.useContext(userContext);
  const [context, setContext] = React.useState<any>(null);
  const [isCapture, setIsCapture] = React.useState<string | null>(
    window.localStorage.getItem("step1capture")
  );
  const { mutate, loading, error, data } = useCapturedImage();
  const {
    mutate: mutateUploadFile,
    loading: loadingUpload,
    error: errorUpload,
    data: uploadData,
  } = useUploadFile();
  const [resultImage, setResultImage] = React.useState<any>(
    window.localStorage.getItem("step1finalImage")
  );
  const [chooseFile, setChooseFile] = React.useState<any>(
    window.localStorage.getItem("step1chooseFile")
  );
  const HandleClickNext = () => {
    ChnageContentForward("second");
    ChangeStep();
  };

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 350,
          height: 350,
        },
      })
      .then((stream) => {
        const videoTag: any = document.getElementById("webcam");
        videoTag.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const canvas: any = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const video = document.getElementById("webcam");
    setContext({ ctx, canvas, video });
  }, []);

  React.useEffect(() => {
    if (data) {
      window.localStorage.setItem(
        "step1finalImage",
        `${data.CaptureImage.message}`
      );
      setResultImage(window.localStorage.getItem("step1finalImage"));
    }
  }, [data]);

  React.useEffect(() => {
    if (uploadData) {
      window.localStorage.setItem(
        "step1chooseFile",
        `${uploadData.UploadFile.filename}`
      );
      setChooseFile(window.localStorage.getItem("step1chooseFile"));
    }
  }, [uploadData, setChooseFile]);

  function capture() {
    context.ctx.drawImage(
      context.video,
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    context.canvas.classList.add("blink");
    window.localStorage.setItem("step1capture", `${uuidv4()}`);
    setIsCapture(window.localStorage.getItem("step1capture"));
  }

  function cancel() {
    window.localStorage.removeItem("step1capture");
    setIsCapture("");
    window.location.href = `/s/${urlID}/verify`;
  }

  function saveImage() {
    window.localStorage.removeItem("step1capture");
    const image_data_url = context.canvas.toDataURL("image/jpeg");
    downloadImage(image_data_url);
    setIsCapture("");
  }

  function downloadImage(data: any, filename = `${uuidv4()}.jpeg`) {
    window.localStorage.setItem("step1image", `${filename}`);
    const container: any = document.getElementById("container");
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    container.appendChild(a);
    a.click();
    mutate({
      variables: {
        filename: window.localStorage.getItem("step1image"),
      },
    });
  }

  function handleChange(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("step1finalImage");
    window.localStorage.removeItem("step1image");
    setResultImage("");

    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    mutateUploadFile({ variables: { file } });
  }

  if ((data && error) || errorUpload) return <div>error</div>;

  return (
    <Box className="first-verify next" id="container">
      <Box className="first-verify-content">
        {loading || loadingUpload ? (
          <Box className="loader-bg">
            <div className="snippet" data-title=".dot-pulse">
              <div className="stage">
                <div className="dot-pulse"></div>
              </div>
            </div>
          </Box>
        ) : resultImage || chooseFile ? (
          <img
            className="image-bg"
            src={`../../../container/${resultImage ? resultImage : chooseFile}`}
            alt="voters"
          />
        ) : (
          <video
            id="webcam"
            autoPlay={true}
            style={{ display: isCapture ? "none" : "block" }}
            className="video"
          ></video>
        )}
        <canvas
          id="canvas"
          className="capture"
          style={{ display: !isCapture ? "none" : "block" }}
        ></canvas>
      </Box>

      {isCapture ? (
        <Box className="button-bottom">
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={saveImage}
          >
            Save
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={cancel}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box className="button-bottom">
          <Button type="button" onClick={HandleClickNext}>
            Next
          </Button>
          <input
            hidden
            name="file1"
            id="raised-button-file"
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <Button variant="outlined">
            <label htmlFor="raised-button-file">Upload</label>
          </Button>
          {resultImage ? (
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                window.localStorage.removeItem("step1finalImage");
                window.localStorage.removeItem("step1image");
                setResultImage("");
                window.location.href = `/s/${urlID}/verify`;
              }}
            >
              Remove Photo
            </Button>
          ) : chooseFile ? (
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                window.localStorage.removeItem("step1chooseFile");
                setChooseFile("");
                window.location.href = `/s/${urlID}/verify`;
              }}
            >
              Back and take photo
            </Button>
          ) : (
            <Button type="button" variant="contained" onClick={capture}>
              Take Photo
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

const SecondVerify: React.FC<{ ChangeStep: React.EffectCallback }> = ({
  ChangeStep,
}): JSX.Element => {
  const [backAnimation, setBackAnimation] = React.useState<boolean>(false);
  const { urlID }: UserContext = React.useContext(userContext);
  const [context, setContext] = React.useState<any>(null);
  const [isCapture, setIsCapture] = React.useState<string | null>(
    window.localStorage.getItem("step2capture")
  );
  const { mutate, loading, error, data } = useCapturedImage();
  const {
    mutate: mutateUploadFile,
    loading: loadingUpload,
    error: errorUpload,
    data: uploadData,
  } = useUploadFile();
  const [resultImage, setResultImage] = React.useState<any>(
    window.localStorage.getItem("step2finalImage")
  );
  const [chooseFile, setChooseFile] = React.useState<any>(
    window.localStorage.getItem("step2chooseFile")
  );

  const HandleClickNext = () => {
    ChnageContentForward("third");
    ChangeStep();
  };
  const HandleClickBack = () => {
    ChnageContentForward("");
    ChangeStep();
    setBackAnimation(true);
  };

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 350,
          height: 350,
        },
      })
      .then((stream) => {
        const videoTag: any = document.getElementById("webcam");
        videoTag.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const canvas: any = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const video = document.getElementById("webcam");
    setContext({ ctx, canvas, video });
  }, []);

  React.useEffect(() => {
    if (data) {
      window.localStorage.setItem(
        "step2finalImage",
        `${data.CaptureImage.message}`
      );
      setResultImage(window.localStorage.getItem("step2finalImage"));
    }
  }, [data]);

  React.useEffect(() => {
    if (uploadData) {
      window.localStorage.setItem(
        "step2chooseFile",
        `${uploadData.UploadFile.filename}`
      );
      setChooseFile(window.localStorage.getItem("step2chooseFile"));
    }
  }, [uploadData, setChooseFile]);

  function capture() {
    context.ctx.drawImage(
      context.video,
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    context.canvas.classList.add("blink");
    window.localStorage.setItem("step2capture", `${uuidv4()}`);
    setIsCapture(window.localStorage.getItem("step2capture"));
  }

  function cancel() {
    window.localStorage.removeItem("step2capture");
    setIsCapture("");
    window.location.href = `/s/${urlID}/verify`;
  }

  function saveImage() {
    window.localStorage.removeItem("step2capture");
    const image_data_url = context.canvas.toDataURL("image/jpeg");
    downloadImage(image_data_url);
    setIsCapture("");
  }

  function downloadImage(data: any, filename = `${uuidv4()}.jpeg`) {
    window.localStorage.setItem("step2image", `${filename}`);
    const container: any = document.getElementById("container");
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    container.appendChild(a);
    a.click();
    mutate({
      variables: {
        filename: window.localStorage.getItem("step2image"),
      },
    });
  }

  function handleChange(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("step2finalImage");
    window.localStorage.removeItem("step2image");
    setResultImage("");

    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    mutateUploadFile({ variables: { file } });
  }

  if ((data && error) || errorUpload) return <div>error</div>;

  return (
    <Box
      className={`second-verify ${backAnimation ? "back" : "next"}`}
      id="container"
    >
      <Box className="second-verify-content">
        {loading || loadingUpload ? (
          <Box className="loader-bg">
            <div className="snippet" data-title=".dot-pulse">
              <div className="stage">
                <div className="dot-pulse"></div>
              </div>
            </div>
          </Box>
        ) : resultImage || chooseFile ? (
          <img
            className="image-bg"
            src={`../../../container/${resultImage ? resultImage : chooseFile}`}
            alt="voters"
          />
        ) : (
          <video
            id="webcam"
            autoPlay={true}
            style={{ display: isCapture ? "none" : "block" }}
            className="video"
          ></video>
        )}
        <canvas
          id="canvas"
          className="capture"
          style={{ display: !isCapture ? "none" : "block" }}
        ></canvas>
      </Box>

      {isCapture ? (
        <Box className="button-bottom">
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={saveImage}
          >
            Save
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={cancel}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box className="button-bottom">
          <Button type="button" onClick={HandleClickNext}>
            Next
          </Button>
          <input
            hidden
            name="file2"
            id="raised-button-file"
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <Button variant="outlined">
            <label htmlFor="raised-button-file">Upload</label>
          </Button>
          {resultImage ? (
            <>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  window.localStorage.removeItem("step2finalImage");
                  window.localStorage.removeItem("step2image");
                  setResultImage("");
                  window.location.href = `/s/${urlID}/verify`;
                }}
              >
                Remove Photo
              </Button>
              <Button type="button" onClick={HandleClickBack}>
                Back
              </Button>
            </>
          ) : chooseFile ? (
            <>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  window.localStorage.removeItem("step2chooseFile");
                  setChooseFile("");
                  window.location.href = `/s/${urlID}/verify`;
                }}
              >
                Back and take photo
              </Button>
              <Button type="button" onClick={HandleClickBack}>
                Back
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="contained" onClick={capture}>
                Take Photo
              </Button>
              <Button type="button" onClick={HandleClickBack}>
                Back
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

const ThirdVerify: React.FC<{
  ChangeStep: React.EffectCallback;
  updateFullName: any;
  fullname: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
}> = ({ ChangeStep, updateFullName, fullname }): JSX.Element => {
  const [backAnimation, setBackAnimation] = React.useState<boolean>(false);
  const [showVotersIDNumber, setShowVotersIDNumber] =
    React.useState<boolean>(false);
  const [showVotersPresint, setShowVotersPresint] =
    React.useState<boolean>(false);

  const HandleClickNext = () => {
    ChnageContentForward("second");
    ChangeStep();
    setBackAnimation(true);
  };

  return (
    <Box className={`third-verify ${backAnimation ? "back" : "next"}`} >
      <Box className="third-verify-content" >
        <CustomInputField
          inputArray={codeInput1}
          show={showVotersIDNumber}
          setShow={setShowVotersIDNumber}
          setTitle={"Enter Your Voters ID number"}
        />
        <CustomInputField
          inputArray={codeInput2}
          show={showVotersPresint}
          setShow={setShowVotersPresint}
          setTitle={"Enter Your Precinct locator"}
        />
        <Box className="third-verify-input-content">
          <p className="title-content" style={{ padding: "20px 0 0  20px" }}>
            Enter Your Full Name
          </p>
          <Box
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <TextField
              value={fullname.lastName}
              onChange={(e: any) => updateFullName(e, "lastName")}
              type="text"
              variant="outlined"
              label="LastName"
              color="primary"
              helperText="LastName"
            />
            <TextField
              value={fullname.firstName}
              onChange={(e: any) => updateFullName(e, "firstName")}
              type="text"
              variant="outlined"
              label="FirstName"
              color="primary"
              helperText="FirstName"
            />
            <TextField
              value={fullname.middleName}
              onChange={(e: any) => updateFullName(e, "middleName")}
              type="text"
              variant="outlined"
              label="MiddleName"
              color="primary"
              helperText="MiddleName"
            />
          </Box>
        </Box>
      </Box>

      <Box className="button-bottom">
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={HandleClickNext}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

const CustomInputField: React.FC<{
  inputArray: { name: string; id: string }[];
  show: boolean;
  setShow: any;
  setTitle: string;
}> = ({ inputArray = [], show, setShow, setTitle }): JSX.Element => {
  const [whosRender, setWhosRender] = React.useState<string>("code");

  const handleKeyDown = (e: any, next: string) => {
    if (e.target.value.length) {
      const element: HTMLElement | null = document.querySelector(`#${next}`);
      element && element.focus();
    }
  };

  const handleFocus = (e: any, m: string) => {
    setWhosRender(m);
    e.target.value = "";
  };

  return (
    <Box className="third-verify-input-content border">
      <p className="title-content">{setTitle}</p>
      <Box className="voterId-digit">
        {inputArray.map((data: { name: string; id: string }, idx: number) => {
          return (
            <div className="input-container" key={idx}>
              {idx === 4 || idx === 10 ? (
                <div className="dash"></div>
              ) : (
                <input
                  type={show ? "text" : "password"}
                  name={data.name}
                  id={data.id}
                  maxLength={1}
                  onFocus={(e) =>
                    handleFocus(e, data.name === "code" ? "code" : "code1")
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      whosRender === "code"
                        ? `input${parseInt(data.id.split("t")[1]) + 1}`
                        : `inpt${parseInt(data.id.split("t")[1]) + 1}`
                    )
                  }
                />
              )}
            </div>
          );
        })}
      </Box>
      <Box className="button-container">
        <Button
          startIcon={show ? <VisibilityOffIcon /> : <VisibilityIcon />}
          onClick={() => setShow(!show)}
        >
          {show ? "hide" : "show"}
        </Button>
      </Box>
    </Box>
  );
};

const FirstInstructions: React.FC = (): JSX.Element => {
  return (
    <Box className="first-instructions">
      <h2>First - Step</h2>
      <p>
        <span> Take a picture or upload a photo of your valid id.</span>
        <br />
        <br />
        List of Acceptable Government-Issued Identification Cards (IDs) /
        Documents.
        <br />
        <br />
        1. e-Card / UMID.
        <br />
        2. Employee's ID / Office Id.
        <br />
        3. Driver's License*
        <br />
        4. Professional Regulation Commission (PRC) ID *<br />
        5. Passport *<br />
        6. Senior Citizen ID.
        <br />
        7. SSS ID.
        <br />
        8. COMELEC / Voter's ID / COMELEC Registration Form.
        <br />
      </p>
    </Box>
  );
};

const SecondInstructions: React.FC = (): JSX.Element => {
  return (
    <Box className="first-instructions">
      <h2>Second - Step</h2>
      <p>
        <span>
          Confirm your identity with a photo of yourself holding your ID
        </span>
        <br />
        <br />
        How to take a photo of yourself holding your ID.
        <br />
        <br />
        1. Take the photo in a room with enough light Select the highest photo{" "}
        <br />
        2. quality on the device you use to take the photo Hold up the document{" "}
        <br />
        3. next to your face, like in the image below Make sure both your face
        and <br />
        4. ID are clear on the photo — nothing on the ID can be covered or
        censored <br />
      </p>
    </Box>
  );
};

const ThirdInstructions: React.FC = (): JSX.Element => {
  return (
    <Box className="first-instructions">
      <h2>Third - Step</h2>
      <p>
        <span>fill-out one of these for verifying your account</span>
        <br />
        <br />
        how is this ?
        <br />
        <br />
        if your only fill-out on the form is your full name to verifying your
        account will take 1 or 2 days because you may have the same name so you
        need to manually verify this account using the information we gathered
        from you such as the id picture and id picture with you. <br /> <br />
        but if you put the precinct number or voter's id number along with the
        fullname it may only take a few seconds because the voter's id is
        unique. the precinct may not be because it is similar to other voters
        but there is a small possibility that someone will have the same full
        name so you can still quickly verify your account
      </p>
    </Box>
  );
};
