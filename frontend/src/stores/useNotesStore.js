import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";


export const useNotesStore = create((set)=>({
    notes:[],
    loading: false,
    currentNote: null,
    error: null,
    
    setNotes: (notes)=>set({notes}),
    createNote: async(notesData)=>{
        set({loading: true})
        try {
            const res = await axios.post("/notes/add", notesData)
            set((prevState)=>({
                notes: [...prevState.notes, res.data],
                loading: false
            }))
            toast.success("Thought shared successfully!")
        } catch (error) {
            toast.error(error.response?.data?.error)
            set({loading:false})
        }
    },
    getAllNotes: async()=>{
        set({loading:true})
        try {
            const res = await axios.get("/notes/getAllNotes")
            set({notes: res.data.notes, loading:false})
        } catch (error) {
            set({error: "Failed to fetch notes", loading: false})
            toast.error(error.response?.data?.error||"Failed to fetch notes")
        }
    },
    deleteNote: async(id)=>{
        set({loading: true})
        try {
            await axios.delete(`/notes/delete/${id}`)
            set((prevNotes)=>({
                notes: prevNotes.notes.filter((note)=> note._id !== id),
                loading:false
            }))
            toast.success("notes deleted successfully")
        } catch (error) {
            set({error: "Errror deleting a notes", loading: false})
            toast.error(error.response?.data?.error ||"You can only delete your own notes")
        }
    },
    getNote: async (id) => {
  set({ loading: true });

  try {
    const res = await axios.get(`/notes/getNote/${id}`);
    
    // Safely extract note whether backend sends { note: {...} } or {...}
    const noteData = res.data.note || res.data;

    set({
      currentNote: noteData,
      loading: false,
    });

    return noteData; // Return the note object so "await getNote(id)" gets data
  } catch (error) {
    set({
      error: "Error getting note",
      loading: false,
    });

    toast.error(error.response?.data?.error || "Error getting note");
    return null; 
  }
},
    updateNote: async(id, updateData)=>{
        set({loading: true})
        try {
            const res = await axios.put(`/notes/update/${id}`, updateData)
        set((currentState)=>({
            notes: currentState.notes.map((note)=>note._id === id?res.data.note: note),
            loading:false
        }))
        toast.success("notes updated successfully")
        } catch (error) {
            set({error: "Error updating notes", loading:false})
            toast.error(error.response?.data?.error ||"You can only update your own notes" )
        }
        
    }

}))


/*
import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useNotesStore = create((set, get) => ({
  notes: [],
  currentNote: null,
  loading: false,

  setNotes: (notes) => set({ notes }),

  // Fetch all notes
  getAllNotes: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/notes/getAllNotes");
      set({ notes: res.data.notes || res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch notes");
    }
  },

  // Fetch single note by ID (useful on direct page reloads)
  getNote: async (id) => {
    // Return cached note if available in store array
    const existing = get().notes.find((n) => n._id === id || n.id === id);
    if (existing) {
      set({ currentNote: existing });
      return existing;
    }

    set({ loading: true });
    try {
      const res = await axios.get(`/notes/getNote/${id}`);
      const noteData = res.data.note || res.data;
      set({ currentNote: noteData, loading: false });
      return noteData;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Error fetching note");
      return null;
    }
  },

  // Create a new note
  createNote: async (notesData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/notes/add", notesData);
      const newNote = res.data.note || res.data;
      set((state) => ({
        notes: [...state.notes, newNote],
        loading: false,
      }));
      toast.success("Thought shared successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Error creating note");
    }
  },

  // Update existing note
  updateNote: async (id, updateData) => {
    set({ loading: true });
    try {
      const res = await axios.put(`/notes/update/${id}`, updateData);
      const updatedNote = res.data.note || res.data;

      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === id || note.id === id ? updatedNote : note
        ),
        currentNote: updatedNote,
        loading: false,
      }));
      toast.success("Note updated successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Error updating note");
    }
  },

  // Delete note by ID
  deleteNote: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/notes/delete/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id && note.id !== id),
        loading: false,
      }));
      toast.success("Note deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Error deleting note");
    }
  },
}));
 */