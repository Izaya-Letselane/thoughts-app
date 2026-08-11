import { useNotesStore } from "../stores/useNotesStore";

import NoteCard from "../components/NoteCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Thoughts = () => {
  const { notes, getAllNotes } = useNotesStore();

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);
  return (
    <div className="flex flex-col relative">
      <Link to={"/create"} className=" absolute right-5 mt-15 text-white flex items-center justify-center mb-10 p-1 bg-rose-700 hover:bg-amber-50 hover:text-rose-500 transition-all duration-300 ease-in-out rounded-full w-10 h-10">
        <Plus className="h-5 w-5" />
      </Link>
      <div className="mt-25 text-white w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Thoughts;
