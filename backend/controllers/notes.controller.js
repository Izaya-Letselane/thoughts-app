import cloudinary from "../lib/cloudinary.js";
import Notes from "../models/notes.model.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({}).populate("user","name");
    res.json({ notes });
  } catch (error) {
    console.log("Error getting notes");
    res.status(500).json({ message: "Server error" });
  }
};

const addNotes = async (req, res) => {
  try {
    const { headline, content, image } = req.body;

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "player",
      });
    }
    const notes = await Notes.create({
      user: req.user._id,
      headline,
      content,
      image: cloudinaryResponse?.secure_url || "",
    });
    res.status(201).json({ notes });
  } catch (error) {
    console.log("Error in the addNottes", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOne({_id:req.params.id, user:req.user.id});
    if (!note) {
      return res.status(404).json({ message: "Note is not found" });
    }
    // Delete image from Cloudinary if it exists
    if (note.image) {
      const publicId = note.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`player/${publicId}`);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    await Notes.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in the delete card function");
    res.status(500).json({ message: "Server error" });
  }
};


const updateNote = async (req, res) => {
  try {
    const { headline, content, image } = req.body;

    const note = await Notes.findOne({_id:req.params.id, user:req.user.id});
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    let updatedImage = note.image;

    if (image && typeof image === "string" && image.startsWith("data:image")) {
      // delete old image from cloudinary
      if (note.image) {
        const publicId = note.image.split("/").pop().split(".")[0];
        try {
          await cloudinary.uploader.destroy(`player/${publicId}`);
        } catch (err) {
          console.error("Error destroying old Cloudinary image:", err);
        }
      }

      // upload new image
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "player",
      });

      updatedImage = cloudinaryResponse.secure_url;
    }

    note.headline = headline || note.headline;
    note.content = content || note.content;
    note.image = updatedImage;

    const updatedNote = await note.save();

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });

  } catch (error) {
    console.log("Error in updateNote function:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id).populate("user", "name");
    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }
    return res.status(200).json(note);
  } catch (error) {
    console.log("Error in the getNotes function");
    res.status(500).json({ message: "Server Error" });
  }
};

export { addNotes, getAllNotes, deleteNote, updateNote, getNote };
