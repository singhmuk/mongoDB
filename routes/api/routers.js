const express = require('express');
const router = express.Router();
const mainsRoutes = require('../../controllers/contacts')

router.route("/").post(mainsRoutes.postRecord);
router.route("/").get(mainsRoutes.all);
router.route("/:contactId").put(mainsRoutes.updates);
router.route("/:contactId").delete(mainsRoutes.remove);

// router.route("/:id").get(mainsRoutes.getOne);


module.exports = router;