import express from 'express';
import {createDeveloper, getAllDevelopers, getUserById, updateUserById, deleteUserById} from '../controller/developers.controller.js';
const router = express.Router();

router.route("/createdeveloper").post(createDeveloper);
router.route("/getAlldevelopers").get(getAllDevelopers);
router.route("/getbyid/:id").get(getUserById);
router.route("/updatebyid/:id").put(updateUserById);
router.route("/deletebyid/:id").delete(deleteUserById);

export default router;