import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, getJobsByCompany, postJob, updatejob } from "../controllers/job.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated,updatejob);
router.route("/delete/:id").delete(isAuthenticated,deleteJob);
router.route("/getbycompany/:companyId").get(getJobsByCompany);


export default router;

