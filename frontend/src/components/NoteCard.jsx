import { FileEdit, Trash2 } from "lucide-react"
import { useNotesStore } from "../stores/useNotesStore"
import { Link } from "react-router-dom"

const NoteCard = ({note}) => {
  const { deleteNote}= useNotesStore()
  
  const handleDelete = async (e,id)=>{
    if(!window.confirm("Are you sure you want to delete this thought?")) return;
    e.preventDefault()
    await deleteNote(id)
  }
 
  return (
    <div className="flex flex-col h-full p-2 bg-rose-700 m-2 rounded-md text-white">
        <div className="flex-1 p-1">
          <h6 className="font-serif font-medium">@{note.user?.name ?? "Unknown user"}</h6>
          <h5 className="md:font-semibold text-2xl">{note.headline}</h5>
          <p className="text-sm mr-2 font-medium">{note.content}</p>
        </div>
        <div className="shrink-0">
          <img src={note.image} alt="" className="rounded-md mt-2 h-60 object-cover w-full" />
        </div>
        <div className="mt-10 flex justify-start items center py-2 px-3">
          <button onClick={(e) => handleDelete(e, note._id)} className="mr-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out flex items-center gap-1 bg-rose-500 hover:bg-amber-50 hover:text-rose-500 p-2">
            <Trash2 className="h-6 w-6"/>Delete
          </button>
          <Link to={`/notes/update/${note._id}`} className="rounded-md ml-4 cursor-pointer transition-all duration-200 ease-in-out flex items-center gap-1 bg-rose-500 hover:bg-amber-50 hover:text-rose-500 p-2">
            <FileEdit className="h-6 w-6"/>Edit
          </Link>
        </div>
    </div>
  )
}

export default NoteCard