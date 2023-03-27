const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// create route to get ALL ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong in GET ALL request",
    });
  }
});

// GET route for signle idea by id hard coded:
// router.get("/:id", (req, res) => {
//   const idea = ideas.find((idea) => idea.id === +req.params.id);

//   if (!idea) {
//     res.status(404).json({ success: false, error: "Resource not found" });
//   }
//   res.json({ success: true, data: idea });
// });

// GET ONE with mongoose
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: "FindById not working" });
  }
});

// create route for adding new idea
router.post("/", async (req, res) => {
  // construct an idea
  const idea = new Idea({
    // id: ideas.length + 1, // autoincrements the ideas
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    // date: new Date().toISOString().slice(0, 10)
  });
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    res.status(500).json({ success: false, error: "POST ROUTE not " });
  }
});

// PUT method hardcoded:
// router.put("/:id", (req, res) => {
//   const idea = ideas.find((idea) => idea.id === +req.params.id);

//   if (!idea) {
//     return res.status(404)
//       .json({ success: false, error: "No message found" });
//   }
//   idea.text = req.body.text || idea.text;
//   idea.tag = req.body.tag || idea.tag

//   res.json({ success: true, data: idea })
// })

//PUT METHOD with MongoDB

router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    // validate the username
    if (idea.username === req.body.username) {
      const updateIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updateIdea });
    }
    res
      .status(403)
      .json({ succes: false, error: "You are not authorized to edit this" });
  } catch (error) {
    res.status(500).json({ success: false, error: "PUT request didn't work" });
  }
});

// DELETE hard coded
// router.delete("/:id", (req, res) => {
//   const idea = ideas.find((idea) => idea.id === +req.params.id);

//   if (!idea) {
//     return res.status(404)
//       .json({ success: false, error: "No message found" });
//   }
//   const index = ideas.indexOf(idea);
//   ideas.splice(index, 1)
//   // return an empty object
//   res.json({ success: true, data: {} })
// });

//DELETE with mongoose
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // match the username (simple validation)
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // usernames do not match
    res.status(403).json({
      success: false,
      error: "You are jot authorized to delete this resource",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Delete unsuccessful" });
  }
});

module.exports = router;
