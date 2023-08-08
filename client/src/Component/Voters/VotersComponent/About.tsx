import React from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import "../../../style/About.css";
import useDetailsContext, {
  DetailsContext,
} from "../../../CustomHooks/useDetailsContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import userContext, { UserContext } from "../../../CustomHooks/UserContext";
import {
  useUpdateData,
  useUpdateUploadFile,
  useFetchSecuredDeatials,
  useEnterPassword,
} from "../../../CustomAPI/API";
import { useFormik } from "formik";
import * as yup from "yup";
import LoaderApi from '../../LoaderApi'



const fontSize: { fontSize: number } = {
  fontSize: 15,
};

interface basicInfoType {
  title?: string;
  messages: (message?: string) => React.ReactElement;
  tag: (text?: string) => React.ReactElement;
}

interface UpdateComponentType {
  name: string;
  Component: (data?: string) => React.ReactElement;
}

const basicInfo: basicInfoType[] = [
  {
    title: "Photo",
    messages: (message) => <p>{message}</p>,
    tag: (profile?: string) => (
      <img src={`../../../container/${profile}`} alt="voter-profile" />
    ),
  },
  {
    title: "Full Name",
    messages: (message) => <p>{message}</p>,
    tag: () => <ArrowForwardIosIcon style={fontSize} />,
  },
  {
    title: "Birthday",
    messages: (message) => <p>{message}</p>,
    tag: () => <ArrowForwardIosIcon style={fontSize} />,
  },
  {
    title: "Gender",
    messages: (message) => <p>{message}</p>,
    tag: () => <ArrowForwardIosIcon style={fontSize} />,
  },
  {
    title: "Municipality",
    messages: (message) => <p>{message}</p>,
    tag: () => <ArrowForwardIosIcon style={fontSize} />,
  },
  {
    title: "Zip Code",
    messages: (message) => <p>{message}</p>,
    tag: () => <ArrowForwardIosIcon style={fontSize} />,
  },
  {
    title: "Address",
    messages: (message) => <p>{message}</p>,
    tag: () => <ArrowForwardIosIcon style={fontSize} />,
  },
];

const updateComponent: UpdateComponentType[] = [
  {
    name: "profile",
    Component: (profile?: string) => <Profile profile={profile} />,
  },
  {
    name: "fullname",
    Component: (fullname?: string) => <Fullname fullname={fullname} />,
  },
  {
    name: "birthdate",
    Component: (birthdate?: string) => <BirthDate birthdate={birthdate} />,
  },
  {
    name: "gender",
    Component: (gender?: string) => <Gender gender={gender} />,
  },
  {
    name: "municipality",
    Component: (municipality?: string) => (
      <Municipality municipality={municipality} />
    ),
  },
  {
    name: "zipcode",
    Component: (zipcode?: string) => <Zipcode zipcode={zipcode} />,
  },
  {
    name: "address",
    Component: (address?: string) => <Address address={address} />,
  },
];

const About: React.FC = (): JSX.Element => {
  const { profile, birthdate, address, municipality, zipcode }: DetailsContext =
    React.useContext(useDetailsContext);
  const { fullname, gender }: UserContext = React.useContext(userContext);
  const { data, loading, error } = useFetchSecuredDeatials();
  const [name, setName] = React.useState<string | null>("");

  const updateName = React.useCallback((newName: string) => {
    setName(newName);
  }, []);

  if (loading) return <LoaderApi />;
  if (error) return <Box>error</Box>;

  return (
    <Box className="about-main-container" id="basic-container">
      {name === "email" || name === "password" ? (
        <UpdateSecuredDetails
          name={name}
          securedDetails={data && data.fetchSecuredDetails[0]}
        />
      ) : (
        <UpdateContainer
          votersBasicInfo={{
            profile,
            fullname,
            birthdate,
            gender,
            municipality,
            zipcode,
            address,
          }}
        />
      )}
      <Box className="title">
        <Box className="title-content">
          <h1>Personal info</h1>
          <p>Info about you and your preferences in Online Voting System </p>
        </Box>
      </Box>
      <Box className="content-express">
        <Box className="content-express-con">
          <Box className="content-express-text">
            <h2>Your profile info in Online Voting System</h2>
            <p>
              Personal info and options to manage it. You can make some of this
              info, like your contact details, You can also see a summary of
              your profiles.
            </p>
          </Box>
          <img src="../../../about-image.jpg" alt="about" />
        </Box>
      </Box>
      <Box className="basic-info-container">
        <Box className="basic-info-first-content">
          <h3>Basic Info</h3>
          {basicInfo.map((data: basicInfoType, idx: number): JSX.Element => {
            return (
              <BasicDetailsComponent
                updateName={updateName}
                data={data}
                birthdate={birthdate}
                gender={gender}
                profile={profile}
                fullname={fullname}
                key={idx}
                index={idx}
                municipality={municipality}
                zipcode={zipcode}
                address={address}
              />
            );
          })}
        </Box>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <Box className="basic-info-second-content">
            <SecuredDetailsEmail
              securedDetails={data && data.fetchSecuredDetails[0]}
              setName={updateName}
            />
          </Box>
          <Box className="basic-info-third-content">
            <SecuredDetailsPassword setName={updateName} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;

const SecuredDetailsEmail: React.FC<{
  securedDetails: { email: string };
  setName: (newName: string) => void;
}> = ({ securedDetails, setName }): JSX.Element => {
  const handleClcik = () => {
    const basicInfoContainer = document.querySelector("#basic-container");
    const selection = document.querySelectorAll("#selection");
    setName("email");

    const arr: string[] = [
      "profile",
      "fullname",
      "birthdate",
      "gender",
      "zipcode",
      "municipality",
      "address",
      "email",
      "password",
    ];
    arr.forEach((data:any ,idx:number)=>{
      console.log(data)
      
      if(data !== "email"){
        selection[idx]?.classList.remove(data)
      }
    })
    basicInfoContainer?.classList.add("email");
    selection[7]?.classList.add("email");

    
  };

  return (
    <Box>
      <h3>Contact info</h3>
      <Box
        id="selection"
        className={`basic-info-first-content-image `}
        onClick={handleClcik}
      >
        <h5>Email</h5>
        <Box className="messages">{securedDetails.email}</Box>
        <Box className="last-content">
          <ArrowForwardIosIcon style={fontSize} />
        </Box>
      </Box>
    </Box>
  );
};

const SecuredDetailsPassword: React.FC<{
  setName: (newName: string) => void;
}> = ({ setName }): JSX.Element => {
  const handleClcik = () => {
    const basicInfoContainer = document.querySelector("#basic-container");
    const selection = document.querySelectorAll("#selection");
    setName("password");

    const arr: string[] = [
      "profile",
      "fullname",
      "birthdate",
      "gender",
      "zipcode",
      "municipality",
      "address",
      "email",
      "password",
    ];
    arr.forEach((data:any ,idx:number)=>{
      console.log(data)
      
      if(data !== "password"){
        selection[idx]?.classList.remove(data)
      }
    })
    basicInfoContainer?.classList.add("password");
    selection[8]?.classList.add("password");
   
  };

  return (
    <Box>
      <h3>A secure password helps protect your Online Voting Account</h3>
      <Box
        id="selection"
        className={`basic-info-first-content-image `}
        onClick={handleClcik}
      >
        <h5>Password</h5>
        <Box className="messages">
          <h2>••••••••</h2>
        </Box>
        <Box className="last-content">
          <ArrowForwardIosIcon style={fontSize} />
        </Box>
      </Box>
    </Box>
  );
};

const UpdateSecuredDetails: React.FC<{
  name: string | null;
  securedDetails: { email: string; password: string };
}> = ({ name, securedDetails }): JSX.Element => {
 

  return name === "email" ? (
    <Email name={name} securedDetails={securedDetails} />
  ) : (
    <EnterPassword name={name} />
  );
};
const emailValidationSchema = yup.object({
  email: yup.string().trim().required(),
});

const Email: React.FC<{
  name: string | null;
  securedDetails: { email: string };
}> = ({ name, securedDetails }): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();
  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      email: securedDetails.email,
    },
    validationSchema: emailValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"email":"${input.email}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const email = document.querySelector("#update-field-container");
    email?.classList.remove("update-field-container-active");
    email?.classList.add("update-field-container-not-active");
  }
  const handleClick = () => {
    visibilty();
  };

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box className={`edit-content ${name}`}>
      <Button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
        }}
        onClick={handleClick}
      >
        ✖
      </Button>
      <h2>Edit Your Email</h2>
      <form onSubmit={formik.handleSubmit}>
        <Box className="update-component-container">
          <Box
            style={{
              margin: "35px 0",
            }}
          >
            <TextField
              variant="outlined"
              color="primary"
              fullWidth
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={(e: any) => {
                const email = document.querySelector("#update-field-container");
                email?.classList.remove("update-field-container-not-active");
                email?.classList.add("update-field-container-active");
                formik.handleChange(e);
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          {formik.values.email && (
            <Box
              id="update-field-container"
              className={
                formik.values.email ? "update-field-container-active" : ""
              }
            >
              <Button type="button" variant="outlined" onClick={cancel}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined">
                Save
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

const passwordValidationSchema = yup.object({
  password: yup.string().trim().required(),
});

const EnterPassword: React.FC<{
  name: string | null;
}> = ({ name }): JSX.Element => {
  const [confirm, setConfirm] = React.useState<string | null>(null);
  const { mutate, loading, error, data } = useEnterPassword();
  const removeConfirmation = React.useCallback(() => {
    window.localStorage.removeItem("Confirmation Active");
    visibilty();
    setConfirm("");
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { password: input.password } });
      formik.resetForm();
    },
  });

  React.useEffect(() => {
    if (data && data.enterPassword.success) {
      window.localStorage.setItem("Confirmation Active", "true");
      setConfirm(window.localStorage.getItem("Confirmation Active"));
    }
    return () => {
      window.localStorage.removeItem("Confirmation Active");
      setConfirm("");
    };
  }, [data]);

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box className={`edit-content ${name}`}>
      {confirm ? (
        <Password />
      ) : (
        <>
          <Button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
            }}
            onClick={removeConfirmation}
          >
            ✖
          </Button>
          <h2
            style={{
              margin: "60px 0 20px 0",
            }}
          >
            First Enter Your password.
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <Box className="update-component-container">
              <TextField
                style={{
                  margin: "20px 0",
                }}
                label="Enter your password"
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  (data && !data.enterPassword.success) ||
                  (formik.touched.password && Boolean(formik.errors.password))
                }
                helperText={
                  (formik.touched.password && formik.errors.password) ||
                  (data && data.enterPassword.message)
                }
              />
            </Box>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

const editPasswordValidationSchema = yup.object({
  password: yup.string().trim().required(),
  confirmPassword: yup.string().trim().required().oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Password: React.FC = (): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();
  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword:""
    },
    validationSchema: editPasswordValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"password":"${input.password}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const password = document.querySelector("#update-field-container");
    password?.classList.remove("update-field-container-active");
    password?.classList.add("update-field-container-not-active");
  }
  const handleClick = () => {
    visibilty();
  };

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <>
      <Button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
        }}
        onClick={handleClick}
      >
        ✖
      </Button>
      <h2>Edit Your Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <Box className="update-component-container">
          <Box
            style={{
              margin: "35px 0",
            }}
          >
            <TextField
              variant="outlined"
              color="primary"
              label="Password"
              fullWidth
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={(e: any) => {
                const password = document.querySelector(
                  "#update-field-container"
                );
                password?.classList.remove("update-field-container-not-active");
                password?.classList.add("update-field-container-active");
                formik.handleChange(e);
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <br/>
            <br/>
              <TextField
              label="Confirm Password"
              variant="outlined"
              color="primary"
              fullWidth
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={(e: any) => {
                const password = document.querySelector(
                  "#update-field-container"
                );
                password?.classList.remove("update-field-container-not-active");
                password?.classList.add("update-field-container-active");
                formik.handleChange(e);
              }}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
          {formik.values.password && (
            <Box
              id="update-field-container"
              className={
                formik.values.password ? "update-field-container-active" : ""
              }
            >
              <Button type="button" variant="outlined" onClick={cancel}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined">
                Save
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </>
  );
};

const BasicDetailsComponent: React.FC<{
  data: basicInfoType;
  fullname?: string;
  birthdate?: string;
  gender?: string;
  profile?: string;
  index: number;
  address?: string;
  zipcode?: string;
  municipality?: string;
  updateName: (name: string) => void;
}> = ({
  data,
  fullname,
  birthdate,
  gender,
  profile,
  index,
  address,
  zipcode,
  municipality,
  updateName,
}): JSX.Element => {
  const handleClcik = () => {
    if (index === 0) {
      visibilty("profile");
      updateName("profile");
    } else if (index === 1) {
      visibilty("fullname");
      updateName("fullname");
    } else if (index === 2) {
      visibilty("birthdate");
      updateName("birthdate");
    } else if (index === 3) {
      visibilty("gender");
      updateName("gender");
    } else if (index === 4) {
      visibilty("municipality");
      updateName("municipality");
    } else if (index === 5) {
      visibilty("zipcode");
      updateName("zipcode");
    } else if (index === 6) {
      visibilty("address");
      updateName("address");
    } else {
      return;
    }
  };

  return (
    <Box
      id="selection"
      className={`basic-info-first-content-image `}
      onClick={handleClcik}
    >
      <h5>{data.title}</h5>
      <div className="messages">
        {(data.title === "Photo" &&
          data.messages("A photo helps personalize your account")) ||
          (data.title === "Full Name" && data.messages(fullname)) ||
          (data.title === "Birthday" &&
            data.messages(formatGender(birthdate))) ||
          (data.title === "Gender" && data.messages(gender)) ||
          (data.title === "Municipality" && data.messages(municipality)) ||
          (data.title === "Zip Code" && data.messages(zipcode)) ||
          (data.title === "Address" && data.messages(address))}
      </div>
      <Box className="last-content">{data.tag(profile)}</Box>
    </Box>
  );
};

const UpdateContainer: React.FC<{
  votersBasicInfo: {
    profile?: string;
    fullname?: string;
    birthdate?: string;
    gender?: string;
    municipality?: string;
    zipcode?: string;
    address?: string;
  };
}> = ({ votersBasicInfo }): JSX.Element => {
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    const readVisibility = (): any => {
      const myInterval = setTimeout(readVisibility, 100);
      const arr: string[] = [
        "profile",
        "fullname",
        "birthdate",
        "gender",
        "zipcode",
        "municipality",
        "address",
      ];
      const basicInfoContainer = document.querySelector("#basic-container");
      arr.forEach((data: string) => {
        if (basicInfoContainer?.classList.contains(data)) {
          setName(data);
        } else {
          return myInterval;
        }
      });
    };

    clearTimeout(readVisibility());
    return () => {
      clearTimeout(readVisibility());
    };
  }, []);

  const handleClick = () => {
    visibilty();
  };

  return (
    <Box className={`edit-content ${name}`}>
      <h2>Edit Your {name === "profile" ? "Photo" : name}</h2>
      <Button className="custom-botton" onClick={handleClick}>
        ✖
      </Button>
      <Box className="update-component-container">
        {updateComponent.map((data: UpdateComponentType, idx: number) => {
          return (
            <Box key={idx}>
              {(data.name === name &&
                data.name === "profile" &&
                data.Component(votersBasicInfo.profile)) ||
                (data.name === name &&
                  data.name === "fullname" &&
                  data.Component(votersBasicInfo.fullname)) ||
                (data.name === name &&
                  data.name === "birthdate" &&
                  data.Component(votersBasicInfo.birthdate)) ||
                (data.name === name &&
                  data.name === "gender" &&
                  data.Component(votersBasicInfo.gender)) ||
                (data.name === name &&
                  data.name === "municipality" &&
                  data.Component(votersBasicInfo.municipality)) ||
                (data.name === name &&
                  data.name === "zipcode" &&
                  data.Component(votersBasicInfo.zipcode)) ||
                (data.name === name &&
                  data.name === "address" &&
                  data.Component(votersBasicInfo.address))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const Profile: React.FC<{ profile?: string }> = ({ profile }): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateUploadFile();
  const [file, setFile] = React.useState<any>(null);

  React.useEffect(() => {
    if (data && data.UpdateUploadFile.success) {
      return window.location.reload();
    }
  }, [data]);

  function handleChange(e: any) {
    e.preventDefault();
    const getfile = e.target.files[0];
    if (!getfile) return;
    setFile(getfile);
  }
  function cancel() {
    setFile(null);
  }

  function save() {
    mutate({ variables: { file } });
  }

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;

  return (
    <Box>
      <Box
        style={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          margin: "15px 0",
        }}
      >
        <img
          src={`../../../container/${profile}`}
          alt="profile"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            position: "relative",
            marginInline: "auto",
            boxShadow: "0 0 3px grey",
          }}
        />
      </Box>
      <TextField
        name="file"
        variant="outlined"
        color="primary"
        fullWidth
        type="file"
        onChange={handleChange}
      />
      {file && (
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={cancel}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={save}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

const fullnameValidationSchema = yup.object({
  fullname: yup.string().trim().required(),
});

const Fullname: React.FC<{ fullname?: string }> = ({
  fullname,
}): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();

  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      fullname: fullname,
    },
    validationSchema: fullnameValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"fullname":"${input.fullname}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const fullname = document.querySelector("#update-field-container");
    fullname?.classList.remove("update-field-container-active");
    fullname?.classList.add("update-field-container-not-active");
  }
  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            label="Fullname"
            type="text"
            name="fullname"
            id="fullname"
            value={formik.values.fullname}
            onChange={(e: any) => {
              const municipality = document.querySelector(
                "#update-field-container"
              );
              municipality?.classList.remove(
                "update-field-container-not-active"
              );
              municipality?.classList.add("update-field-container-active");
              formik.handleChange(e);
            }}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
        </Box>

        {formik.values.fullname && (
          <Box
            id="update-field-container"
            className={
              formik.values.fullname ? "update-field-container-active" : ""
            }
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              marginTop: "20px",
            }}
          >
            <Button type="button" variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};
const birthdateValidationSchema = yup.object({
  birthdate: yup.string().trim().required(),
});

const BirthDate: React.FC<{ birthdate?: string }> = ({
  birthdate,
}): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();

  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      birthdate: birthdate,
    },
    validationSchema: birthdateValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"birthdate":"${input.birthdate}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const birthdate = document.querySelector("#update-field-container");
    birthdate?.classList.remove("update-field-container-active");
    birthdate?.classList.add("update-field-container-not-active");
  }

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <TextField
             label="Birth Date"
            variant="outlined"
            color="primary"
            fullWidth
            type="date"
            name="birthdate"
            id="birthdate"
            value={formik.values.birthdate}
            onChange={(e: any) => {
              const municipality = document.querySelector(
                "#update-field-container"
              );
              municipality?.classList.remove(
                "update-field-container-not-active"
              );
              municipality?.classList.add("update-field-container-active");
              formik.handleChange(e);
            }}
            error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
            helperText={formik.touched.birthdate && formik.errors.birthdate}
          />
        </Box>

        {formik.values.birthdate && (
          <Box
            id="update-field-container"
            className={
              formik.values.birthdate ? "update-field-container-active" : ""
            }
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              marginTop: "20px",
            }}
          >
            <Button type="button" variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

const genderValidationSchema = yup.object({
  gender: yup.string().trim().required(),
});
const genderSelection: { value: string }[] = [
  {
    value: "male",
  },
  {
    value: "female",
  },
];
const Gender: React.FC<{ gender?: string }> = ({ gender }): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();

  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      gender: gender,
    },
    validationSchema: genderValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"gender":"${input.gender}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const gender = document.querySelector("#update-field-container");
    gender?.classList.remove("update-field-container-active");
    gender?.classList.add("update-field-container-not-active");
  }

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <TextField
            select
            label="Gender"
            variant="outlined"
            color="primary"
            fullWidth
            type="text"
            name="gender"
            id="gender"
            value={formik.values.gender}
            onChange={(e: any) => {
              const municipality = document.querySelector(
                "#update-field-container"
              );
              municipality?.classList.remove(
                "update-field-container-not-active"
              );
              municipality?.classList.add("update-field-container-active");
              formik.handleChange(e);
            }}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            {genderSelection.map((option: { value: string }) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {formik.values.gender && (
          <Box
            id="update-field-container"
            className={
              formik.values.gender ? "update-field-container-active" : ""
            }
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              marginTop: "20px",
            }}
          >
            <Button type="button" variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

const municipalityValidationSchema = yup.object({
  municipality: yup.string().trim().required(),
});
const Municipality: React.FC<{ municipality?: string }> = ({
  municipality,
}): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();

  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      municipality: municipality,
    },
    validationSchema: municipalityValidationSchema,
    onSubmit: (input) => {
      mutate({
        variables: { data: `{"municipality":"${input.municipality}"}` },
      });
      formik.resetForm();
    },
  });

  function cancel() {
    const municipality = document.querySelector("#update-field-container");
    municipality?.classList.remove("update-field-container-active");
    municipality?.classList.add("update-field-container-not-active");
  }

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <TextField
           label="Municipality"
            variant="outlined"
            color="primary"
            fullWidth
            type="text"
            name="municipality"
            id="municipality"
            value={formik.values.municipality}
            onChange={(e: any) => {
              const municipality = document.querySelector(
                "#update-field-container"
              );
              municipality?.classList.remove(
                "update-field-container-not-active"
              );
              municipality?.classList.add("update-field-container-active");
              formik.handleChange(e);
            }}
            error={
              formik.touched.municipality && Boolean(formik.errors.municipality)
            }
            helperText={
              formik.touched.municipality && formik.errors.municipality
            }
          />
        </Box>
        {formik.values.municipality && (
          <Box
            id="update-field-container"
            className={
              formik.values.municipality ? "update-field-container-active" : ""
            }
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              marginTop: "20px",
            }}
          >
            <Button type="button" variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};
const zipcodeValidationSchema = yup.object({
  zipcode: yup.string().trim().required(),
});
const Zipcode: React.FC<{ zipcode?: string }> = ({ zipcode }): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();

  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      zipcode: zipcode,
    },
    validationSchema: zipcodeValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"zipcode":"${input.zipcode}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const address = document.querySelector("#update-field-container");
    address?.classList.remove("update-field-container-active");
    address?.classList.add("update-field-container-not-active");
  }

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <TextField
            label="Zip Code"
            variant="outlined"
            color="primary"
            fullWidth
            type="text"
            name="zipcode"
            id="zipcode"
            value={formik.values.zipcode}
            onChange={(e: any) => {
              const zipcode = document.querySelector("#update-field-container");
              zipcode?.classList.remove("update-field-container-not-active");
              zipcode?.classList.add("update-field-container-active");
              formik.handleChange(e);
            }}
            error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
            helperText={formik.touched.zipcode && formik.errors.zipcode}
          />
        </Box>
        {formik.values.zipcode && (
          <Box
            id="update-field-container"
            className={
              formik.values.zipcode ? "update-field-container-active" : ""
            }
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px",
              marginTop: "20px",
            }}
          >
            <Button type="button" variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};
const addressValidationSchema = yup.object({
  address: yup.string().trim().required(),
});

const Address: React.FC<{ address?: string }> = ({ address }): JSX.Element => {
  const { mutate, loading, error, data } = useUpdateData();

  React.useEffect(() => {
    if (data && data.UpdateData.success) {
      return window.location.reload();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      address: address,
    },
    validationSchema: addressValidationSchema,
    onSubmit: (input) => {
      mutate({ variables: { data: `{"address":"${input.address}"}` } });
      formik.resetForm();
    },
  });

  function cancel() {
    const address = document.querySelector("#update-field-container");
    address?.classList.remove("update-field-container-active");
    address?.classList.add("update-field-container-not-active");
  }

  if (loading) return <LoaderApi />;
  if (error) return <Box>Error</Box>;
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <TextField
          label="Address"
            name="address"
            id="address"
            variant="outlined"
            color="primary"
            fullWidth
            type="text"
            value={formik.values.address}
            onChange={(e: any) => {
              const address = document.querySelector("#update-field-container");
              address?.classList.remove("update-field-container-not-active");
              address?.classList.add("update-field-container-active");
              formik.handleChange(e);
            }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>
        {formik.values.address && (
          <Box
            id="update-field-container"
            className={
              formik.values.address ? "update-field-container-active" : ""
            }
          >
            <Button type="button" variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

function visibilty(addClass?: string) {
  const basicInfoContainer = document.querySelector("#basic-container");
  const selection = document.querySelectorAll("#selection");

  const arr: string[] = [
    "profile",
    "fullname",
    "birthdate",
    "gender",
    "zipcode",
    "municipality",
    "address",
    "email",
    "password",
  ];

  arr.forEach((name: string, idx: number) => {
    selection[idx]?.classList.add(name);
    if (!basicInfoContainer?.classList.contains("password")) {
      window.localStorage.removeItem("Confirmation Active");
      basicInfoContainer?.classList.remove("password");
    }
    if (name === addClass) {
      basicInfoContainer?.classList.add(addClass);
    } else {
      basicInfoContainer?.classList.remove(name);
      basicInfoContainer?.classList.remove("email");
      basicInfoContainer?.classList.remove("password");
    }
  });
}

function formatGender(message?: string): string | undefined {
  if (!message) return;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const finalize1 = message.split("-")[0];
  const finalize2 = message.split("-")[1].split("")[1];
  const finalize3 = message.split("-")[2];
  const finalFormat = `${
    month[parseInt(finalize2) - 1]
  } ${finalize3}, ${finalize1}`;
  return finalFormat;
}
