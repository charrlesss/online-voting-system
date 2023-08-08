import React from "react";
import "../../style/Contact.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { TextField, Grid, Box, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useFeedBackUser } from "../../CustomAPI/API";
import LoaderApi from "../LoaderApi";
import Alert from '@mui/material/Alert';
const validationSchema = yup.object({
  fullName: yup.string().required().min(5),
  email: yup.string().email().required().min(5),
  messages: yup.string().required().min(5),
});

const Contact: React.FC = ():JSX.Element => {
  const { mutate, loading, error ,data } = useFeedBackUser();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      messages: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input: any) => {
      mutate({
        variables: {
          fullname: input.fullName,
          email: input.email,
          message: input.messages,
        },
      });
      formik.resetForm();
    },
  });
  if (loading) return <LoaderApi />;
  if (error) return <div>error</div>;
  return (
    <div
      className="contact-container"
      style={{
       height:"100vh"
      }}
    >
      <div className="contact-title">
        <h1>Contact Us</h1>
        <br />
        <p>
          Lorem ipsum dolor sit amet. 33 recusandae corrupti eum internos maxime
          ut sint ipsam ut ipsam galisum cum officia error non fugiat adipisci
          aut autem eaque. Hic voluptatem nihil id explicabo dolorem eos galisum
          aperiam ut sint quod.
        </p>
      </div>
      <br />
      <br />
      <div className="contact-content">
        <div className="content-contact">
          <div className="cotent-text">
            <div className="content-text-icon">
              <div>
                <LocationOnRoundedIcon className="svg_icons" />
              </div>
            </div>
            <div className="content-ph">
              <h2>Address</h2>
              <br />
              <p>
                Lorem ipsum dolor sit amet. 33 recusandae corrupti eum internos
                maxime ut sint ipsam internos maxime ut sint ipsam
              </p>
            </div>
          </div>
          <div className="cotent-text">
            <div className="content-text-icon">
              <div>
                <PhoneRoundedIcon className="svg_icons" />
              </div>
            </div>
            <div className="content-ph">
              <h2>Contact</h2>
              <br />
              <p>
                Lorem ipsum dolor sit amet. 33 recusandae corrupti eum internos
                maxime ut sint ipsam internos maxime ut sint ipsam
              </p>
            </div>
          </div>
          <div className="cotent-text">
            <div className="content-text-icon">
              <div>
                <MailOutlineRoundedIcon className="svg_icons" />
              </div>
            </div>
            <div className="content-ph">
              <h2>Email</h2>
              <br />
              <p>
                Lorem ipsum dolor sit amet. 33 recusandae corrupti eum internos
                maxime ut sint ipsam internos maxime ut sint ipsam
              </p>
            </div>
          </div>
        </div>
        <div className="content-form">
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              justifyContent="center"
              direction="column"
              alignItems="center"
            >
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mt: 4,
                }}
              >
                <Typography variant="h3">Send Message</Typography>
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mt: 4,
                }}
              >
               {data &&
               
                 <Alert severity="success">  { data.contact.message}</Alert>
               
                }
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Full Name"
                  variant="standard"
                  name="fullName"
                  id="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mb: 4,
                  mt: 4,
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="example@gamil.com"
                  variant="standard"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mt: 4,
                  mb: 4,
                }}
              >
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Message"
                  name="messages"
                  id="messages"
                  value={formik.values.messages}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.messages && Boolean(formik.errors.messages)
                  }
                  helperText={formik.touched.messages && formik.errors.messages}
                />
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mb: 4,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="info"
                >
                  Send
                </Button>
              </Box>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// export default function Contact() {
//   const { contact, loading, error } = useContact();
//   const {width} =useWindowWidth()
//

//   if (loading) return <div>Loading</div>;
//   if (error) return <div>error</div>;

// }
