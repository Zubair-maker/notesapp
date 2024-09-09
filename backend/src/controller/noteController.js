import Note from "../models/notesModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const addNote = async (req, res, next) => {
  const { title, content, tags } = req.body;

  const { id } = req.user;
  if (!title || title.trim() === "") {
    return next(errorHandler(400, "Title is required"));
  }
  if (!content || content.trim() === "") {
    return next(errorHandler(400, "Content is required"));
  }
  if (tags && !Array.isArray(tags)) {
    return next(errorHandler(400, "Tags must be an array"));
  }

  try {
    // create a new note
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: id,
    });
    await note.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.log("error in addnote", error);
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  const { noteId } = req.params; // Note ID from request params
  const { id } = req.user; // User ID from authenticated user (req.user)
  //console.log("noteId", noteId, "userid", id);
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return next(errorHandler(404, "Note not found"));
    }
    //check that the user owns the note
    if (note.userId !== id) {
      return next(errorHandler(401, "you can only ur own note"));
    }
    const { title, content, tags, isPinned } = req.body;

    // Check if there's nothing to update
    if (!title && !content && typeof isPinned === "undefined")
      return next(404, "NO changes provided");
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;

    //save the updated note
    await note.save();

    res.status(201).json({
      success: true,
      message: "Note Updated successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  const { id } = req.user;
  console.log("userID", id);
  try {
    const notes = await Note.find({ userId: id }).sort({ isPinned: -1 });
    if (!notes) {
      return next(errorHandler(404, "notes not found"));
    }
    res.status(200).json({
      success: true,
      message: "All notes retrived successfully",
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.user; // Get the user ID from the authenticated user
  const { noteId } = req.params; // Get the note ID from the request params
  try {
    // First, find the note to check if it exists and if the user owns it
    const note = await Note.findById(noteId);
    if (!note) {
      return next(errorHandler(404, "Note not found"));
    }
    // Check if the note belongs to the user
    if (note.userId !== id) {
      return next(errorHandler(401, "You can only delete your own note"));
    }
    // Delete the note
    //await note.remove(); or
    // Delete the note using findByIdAndDelete
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateNotePinned = async (req, res, next) => {
  const { id } = req.user; // Get the ID of the authenticated user
  const { noteId } = req.params; // Get the ID of the note from request parameters

  try {
    // Find the note by its ID
    const note = await Note.findById(noteId);
    console.log("noteId",noteId)
    console.log("id",id)
    if (!note) {
      return next(errorHandler(404, "Note not found")); // Note not found error
    }

    // Check if the authenticated user is the owner of the note
    if (note.userId !== id) {
      return next(errorHandler(401, "You can only update your own note!")); // Unauthorized error
    }

    // Update the `isPinned` field with the value from request body
    const { isPinned } = req.body;
    note.isPinned = isPinned;

    // Save the updated note to the database
    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};
