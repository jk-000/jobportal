import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteCompany, getAdminCompany, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(getCompany);
router.route("/getadmincompany").get(isAuthenticated,getAdminCompany);
router.route("/get/:id").get(getCompanyById);
router.route("/delete/:id").delete(isAuthenticated,deleteCompany);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;

