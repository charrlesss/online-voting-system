import nodemailer from "nodemailer";
interface UserFeedBack {
  fullname: string;
  email: string;
  message: string;
}

export async function feedbackFromEmail(user: UserFeedBack): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SYSTEM_USERNAME,
      pass: process.env.SYSTEM_SECRET,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: "andrecoso09@gmail.com",
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
          <h3>Hi Online Voting System from ${user.email}</h3>
           <p>
            This message is from ${user.fullname} ${user.message}
           </p>
    
       `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export async function verifyAccountFromEmail(
  email: string,
  code: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user:  `${process.env.SYSTEM_USERNAME}`,
      pass: `${process.env.SYSTEM_SECRET}`,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: `${email}`,
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
           <p>
           Hi ${email}! , ${code} This code is for verify your account in online voting system.
           </p>
       `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export async function verifyAccountToVotedWaiting(
  email: string,
  messages: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SYSTEM_USERNAME,
      pass: process.env.SYSTEM_SECRET,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: `${email}`,
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
           <h3>
           Hi ${email} this is from Online Voting System
           </h3>
           <p>${messages}</p>
       `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export async function verifyAccountToVotedSuccess(
  email: string,
  messages: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SYSTEM_USERNAME,
      pass: process.env.SYSTEM_SECRET,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: `${email}`,
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
           <h3>
           Hi ${email} this is from Online Voting System
           </h3>
           <p>${messages}</p>
           <button>
           <a href='http://localhost:3000/signup'>LOGIN TO YOUR ACCOUNT</a>
           </button>
       `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export async function sendMessagesForVoted(
  email: string,
  messages: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SYSTEM_USERNAME,
      pass: process.env.SYSTEM_SECRET,
    },
  });

  var mailOptions = {
    from: "andrecoso09@gmail.com",
    to: `${email}`,
    subject: "Online Voting System",
    text: "Content-type:application/json",
    html: `
           <h3>
           Hi ${email} this is from Online Voting System
           </h3>
           <h3 style='color:#263238;'>
           Congratulations Your Participate To Online Voting System Your Vote List
           </h3>
           ${messages}
       `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
