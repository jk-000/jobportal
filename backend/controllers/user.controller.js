import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { log } from "console";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;
    if (!fullname) return res.status(400).json({ message: "Name is required", success: false });

if (!email) {
    return res.status(400).json({ message: "Email is required", success: false });
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format", success: false });
}

if (!phoneNumber) {
  return res.status(400).json({ message: "Phone Number is required", success: false });
} else if (!/^\d+$/.test(phoneNumber)) {
  return res.status(400).json({ message: "Phone number must contain only digits", success: false });
} else if (phoneNumber.length < 10) {
  return res.status(400).json({ message: "Phone number must be at least 10 digits long", success: false });
}


if (!password) {
    return res.status(400).json({ message: "Password is required", success: false });
} else if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
}

if (!role) return res.status(400).json({ message: "Role is required", success: false });
if (!file) {
  return res.status(400).json({ message: "Profile picture is required", success: false });
}
    
    
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required", success: false });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format", success: false });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required", success: false });
} else if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
}
if (!role) return res.status(400).json({ message: "Role is required", success: false });

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};



export const forgetpassword = async (req, res) => {
  try {
      const { email } = req.body;
      console.log("Received Email:", email);

      // 1️⃣ Find user by email
      let user = await User.findOne({ email });
      if (!user) {
          console.log("User Not Found");
          return res.status(400).json({ message: "User with this email does not exist." });
      }

      // 2️⃣ Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

      // 3️⃣ Update user with reset token and expiry
      const updatedUser = await User.findOneAndUpdate(
          { email },
          {
              resetPasswordToken: hashedToken,
              resetPasswordExpires: Date.now() + 3600000, // 1 hour expiry
          },
          { new: true }
      );

      if (!updatedUser) {
          console.log("Database Update Failed");
          return res.status(500).json({ message: "Failed to update user with reset token." });
      }

      // 4️⃣ Construct reset link
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
      console.log("Generated Reset Link:", resetLink);

      // 5️⃣ Send email in background (does not block API response)
      sendResetEmail(user.email, resetLink)
          .then(() => console.log(`✅ Password reset email sent to ${user.email}`))
          .catch((err) => console.error("❌ Email sending failed:", err));

      // ✅ 6️⃣ Respond immediately (no waiting for email)
      return res.status(200).json({ message: "Password reset link is being sent to your email." });

  } catch (error) {
      console.error("Forget Password Error:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// 📌 Send Reset Email Function (Async)
const sendResetEmail = async (email, resetLink) => {
  // 1️⃣ Optimized SMTP Configuration with Pool
  const transporter = nodemailer.createTransport({
      pool: true, // ✅ Improves performance
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
      },
  });

  // 2️⃣ Email Content
  const mailOptions = {
      from: '"JobHunt Support" <piyushnakarani2@gmail.com>',
      to: email,
      subject: "Reset Your Password - JobHunt",
      text: `Hello, 

We received a request to reset your password for your JobHunt account. If you did not make this request, please ignore this email.

To reset your password, click the link below:

${resetLink}

If the above link does not work, copy and paste it into your browser.

For security reasons, this link will expire in 30 minutes.

Best regards,  
The JobHunt Team  
piyushnakarani2@gmail.com`,

      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2d89ef;">Reset Your Password</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password for your <strong>JobHunt</strong> account. If you did not request this, you can ignore this email.</p>
          <p>Click the button below to reset your password:</p>
          <p style="text-align: center;">
              <a href="${resetLink}" style="background: #2d89ef; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                  Reset Password
              </a>
          </p>
          <p>If the button above does not work, copy and paste this link into your browser:</p>
          <p><a href="${resetLink}" style="word-wrap: break-word;">${resetLink}</a></p>
          <p style="color: red;"><strong>Note:</strong> This link is valid for 30 minutes only.</p>
          <hr>
          <p style="font-size: 12px; color: gray;">If you have any questions, contact us at <a href="mailto:piyushnakarani2@gmail.com">piyushnakarani2@gmail.com</a></p>
          <p style="font-size: 12px; color: gray;">&copy; ${new Date().getFullYear()} JobHunt. All Rights Reserved.</p>
      </div>
  `,
  };

  // 3️⃣ Send email asynchronously
  
  await transporter.sendMail(mailOptions);
  
};


export const resetpassword = async (req, res) => {
  try {
    console.log("Reset Password API Called"); // ✅ Debugging Start
    const { token } = req.params;
    const { password } = req.body;

    console.log("Received Token:", token);
    console.log("Received New Password:", password);

    // Hash the received token to match the stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed Token:", hashedToken); // ✅ Log hashed token

    // Find the user by hashed token and check expiration time
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    console.log("Found User:", user); // ✅ Log user object

    if (!user) {
      console.log("Invalid or Expired Token"); // ✅ Token expired or invalid
      return res.status(400).json({
        message: "Invalid or expired reset token.",
        success: false,
      });
    }

    // Hash the new password and update user's password
    user.password = await bcrypt.hash(password, 10);
    console.log("New Password Hashed Successfully");

    // Clear the reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    console.log("User Password Updated in Database");

    return res.status(200).json({
      message: "Password has been reset successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};