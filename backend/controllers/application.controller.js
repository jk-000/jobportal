import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";



export const applyJob = async (req, res) => {
  try {
      const userId = req.id;
      const jobId = req.params.id;

      if (!jobId) {
          return res.status(400).json({
              message: "Job ID is required.",
              success: false
          });
      }

      // Check if the user has already applied for the job
      const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
      if (existingApplication) {
          return res.status(400).json({
              message: "You have already applied for this job.",
              success: false
          });
      }

      // Check if the job exists
      const job = await Job.findById(jobId).populate("company");
      if (!job) {
          return res.status(404).json({
              message: "Job not found.",
              success: false
          });
      }

      // Create a new application
      const newApplication = await Application.create({
          job: jobId,
          applicant: userId,
      });

      job.applications.push(newApplication._id);
      await job.save();

      // Send quick response first
      res.status(201).json({
          message: "Job applied successfully, and confirmation email will be sent shortly.",
          success: true
      });

      // Fetch user details asynchronously
      const user = await User.findById(userId);
      if (!user?.email) return;

      // Send email in the background
      sendConfirmationEmail(user, job);
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
          message: "Internal server error",
          success: false
      });
  }
};

// Function to send email in the background
const sendConfirmationEmail = async (user, job) => {
  try {
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
          },
      });

      const mailOptions = {
          from: '"JobHunt Support" <piyushnakarani2@gmail.com>',
          to: user.email,
          subject: "Application Received - Thank you!",
          html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #2d89ef;">Application Received - Thank you!</h2>
                  <p>Dear <strong>${user.fullname},</strong></p>

                  <p>Thank you for applying to <strong>${job.company.name}</strong> for the role of <strong>${job.title}</strong> through our career portal.</p>

                  <h3>Next Steps:</h3>
                  <p>This email is to confirm that we have received your application.</p>
                  <p>We appreciate your interest in joining our team and will carefully review your qualifications and experience. If your profile matches our requirements, we will reach out to you for further evaluation.</p>
                  
                  <p>Please note that due to the high volume of applications we receive, it may take some time to process them all. We kindly ask for your patience during this process.</p>

                  <p>For any queries or further information, please contact: <a href="mailto:hr@${job.company.name}.com">hr@${job.company.name}.com</a>.</p>

                  <p>Best Regards,<br>
                  <strong>${job.company.name} Hiring Team</strong></p>
              </div>
          `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Application confirmation email sent successfully.");
  } catch (error) {
      console.error("Error sending confirmation email:", error);
  }
};

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}



// export const updateStatus = async (req, res) => {
//     try {
//       const { status } = req.body;
//       const applicationId = req.params.id;
  
//       if (!status) {
//         return res.status(400).json({
//           message: "Status is required",
//           success: false,
//         });
//       }
  
//       // Populate job -> company & applicant details
//       const application = await Application.findOne({ _id: applicationId })
//         .populate({
//           path: "job",
//           populate: { path: "company" }, // Populate job -> company
//         })
//         .populate("applicant");
  
//       if (!application) {
//         return res.status(404).json({
//           message: "Application not found.",
//           success: false,
//         });
//       }
  
//       // Update status
//       application.status = status.toLowerCase();
//       await application.save();
  
//       // If status is accepted or rejected, send email
//       if (application.status === "accepted" || application.status === "rejected") {
//         const user = application.applicant;
//         const job = application.job;
//         const company = job?.company; // Optional chaining to prevent undefined error
  
//         if (!user?.email) {
//           return res.status(500).json({
//             message: "Applicant email not found.",
//             success: false,
//           });
//         }
  
//         if (!company?.name) {
//           return res.status(500).json({
//             message: "Company name not found.",
//             success: false,
//           });
//         }
  
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//           },
//         });
  
//         let subject, htmlMessage;
  
//         if (application.status === "accepted") {
//           subject = "Congratulations! Your Job Application is Accepted";
//           htmlMessage = `
//               <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//                  <h2 style="color: #2d89ef;">Congratulations, ${user.fullname}!</h2>
//                  <p>Dear <strong>${user.fullname},</strong></p>

//      <p>Congratulations! 🎉 We are pleased to inform you that you have been selected for the next round of the hiring process at <strong>${company.name}</strong>. The next step will be an <strong>interview</strong>.</p>

//      <h3>Next Steps:</h3>
//      <p>The hiring team will share the interview details, including date, time, and mode, in the coming days.</p>

//      <p>For any queries or further information, please contact: <a href="mailto:hr@${company.name}.com">hr@${company.name}.com</a>.</p>

//      <p>We look forward to meeting you in the interview and discussing your potential role with us.</p>

//     <p>Best Regards,<br>
//     <strong>HR Department</strong><br>
//     <strong>${company.name}</strong></p>
//               </div>
//             `;
//         } else {
//           subject = "Job Application Update - Not Selected";
//           htmlMessage = `
//             <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//     <h2 style="color: red;">Dear ${user.fullname},</h2>
//     <p>We appreciate your interest in the opportunity at <strong>${company.name}</strong>.</p>

//     <p>After careful consideration, we regret to inform you that we have decided to move forward with other candidates for this position. Please do not be discouraged, as we truly value your skills and experience.</p>

//     <h3>Stay Connected:</h3>
//     <p>We encourage you to apply for future openings that match your qualifications. You can check for new job postings at <strong>${company.name}</strong> on our website.</p>

//     <p>If you have any questions or would like feedback on your application, feel free to contact us at <a href="mailto:hr@${company.name}.com">hr@${company.name}.com</a>.</p>

//     <p>Thank you again for your time and effort. We wish you success in your job search!</p>

//     <p>Best Regards,<br>
//     <strong>HR Department</strong><br>
//     <strong>${company.name}</strong></p>
// </div>
//           `;
//         }
  
//         const mailOptions = {
//           from: '"JobHunt Support" <piyushnakarani2@gmail.com>',
//           to: user.email,
//           subject: subject,
//           html: htmlMessage,
//         };
  
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.error("Error sending email:", error);
//             return res.status(500).json({
//               message: "Error sending email. Please try again later.",
//               success: false,
//             });
//           }
  
//           console.log("Email Sent Successfully:", info.response);
//           return res.status(200).json({
//             message: `Candidate notified for job ${application.status}`,
//             success: true,
//           });
//         });
//       } else {
//         return res.status(400).json({
//           message: "Invalid status update. No email sent.",
//           success: false,
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({
//         message: "Internal server error",
//         success: false,
//       });
//     }
//   };

 

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }

        // Populate job -> company & applicant details
        const application = await Application.findOne({ _id: applicationId })
            .populate({
                path: "job",
                populate: { path: "company" }, // Populate job -> company
            })
            .populate("applicant");

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        // Update status
        application.status = status.toLowerCase();
        await application.save();

        // If status is accepted or rejected, send email
        if (application.status === "accepted" || application.status === "rejected") {
            const user = application.applicant;
            const job = application.job;
            const company = job?.company;

            if (!user?.email || !company?.name) {
                return res.status(500).json({
                    message: "Applicant email or company name missing.",
                    success: false,
                });
            }

            // Send email asynchronously (non-blocking)
            sendStatusUpdateEmail(user, job, company, application.status)
                .then(() => console.log(`Status update email sent to ${user.email}`))
                .catch((error) => console.error("Error sending email:", error));

            return res.status(200).json({
                message: `Candidate notified for job ${application.status}`,
                success: true,
            });
        }

        return res.status(400).json({
            message: "Invalid status update. No email sent.",
            success: false,
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// Function to send email asynchronously
const sendStatusUpdateEmail = async (user, job, company, status) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        let subject, htmlMessage;

        if (status === "accepted") {
            subject = "Congratulations! Your Job Application is Accepted";
            htmlMessage = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                 <h2 style="color: #2d89ef;">Congratulations, ${user.fullname}!</h2>
                 <p>Dear <strong>${user.fullname},</strong></p>

     <p>Congratulations! 🎉 We are pleased to inform you that you have been selected for the next round of the hiring process at <strong>${company.name}</strong>. The next step will be an <strong>interview</strong>.</p>

     <h3>Next Steps:</h3>
     <p>The hiring team will share the interview details, including date, time, and mode, in the coming days.</p>

     <p>For any queries or further information, please contact: <a href="mailto:hr@${company.name}.com">hr@${company.name}.com</a>.</p>

     <p>We look forward to meeting you in the interview and discussing your potential role with us.</p>

    <p>Best Regards,<br>
    <strong>HR Department</strong><br>
    <strong>${company.name}</strong></p>
              </div>
            `;
        } else {
            subject = "Job Application Update - Not Selected";
            htmlMessage = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: red;">Dear ${user.fullname},</h2>
    <p>We appreciate your interest in the opportunity at <strong>${company.name}</strong>.</p>

    <p>After careful consideration, we regret to inform you that we have decided to move forward with other candidates for this position. Please do not be discouraged, as we truly value your skills and experience.</p>

    <h3>Stay Connected:</h3>
    <p>We encourage you to apply for future openings that match your qualifications. You can check for new job postings at <strong>${company.name}</strong> on our website.</p>

    <p>If you have any questions or would like feedback on your application, feel free to contact us at <a href="mailto:hr@${company.name}.com">hr@${company.name}.com</a>.</p>

    <p>Thank you again for your time and effort. We wish you success in your job search!</p>

    <p>Best Regards,<br>
    <strong>HR Department</strong><br>
    <strong>${company.name}</strong></p>
</div>
            `;
        }

        const mailOptions = {
            from: '"JobHunt Support" <piyushnakarani2@gmail.com>',
            to: user.email,
            subject: subject,
            html: htmlMessage,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Status update email successfully sent to ${user.email}`);

    } catch (error) {
        console.error("Error sending status update email:", error);
        throw error; // Ensures the error can be caught and logged
    }
};
