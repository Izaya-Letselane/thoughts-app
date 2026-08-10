import { Loader, SaveAllIcon, Upload } from "lucide-react";
import { useNotesStore } from "../stores/useNotesStore"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdatePage = () => {
  const { loading, updateNote, getNote} = useNotesStore();
  const {id} = useParams()
  const navigate= useNavigate()
    const [thoughts, setThoughts] = useState({
      headline: "",
      content: "",
      image: "",
    })
    useEffect(()=>{
      const existingNote = async()=>{
        const note = await getNote(id)
        if(note){
          setThoughts({
            headline: note.headline||"",
            content: note.content||"",
            image: note.image||""
          })
        }
        
      }
      if(id){
          existingNote()
        }
    },[id, getNote])
    const handleSubmit =async(e)=>{
      e.preventDefault()
      await updateNote(id, thoughts)
      navigate("/thoughts")
    }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThoughts({ ...thoughts, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    
    <div className="mt-20 p-10 text-white bg-rose-700 w-[65%] mx-auto flex flex-col juistify-center items-center rounded-md">
      <h1 className="semi-bold text-2xl text-white mt-1">
       Update Your Thoughts
      </h1>
      <div className="mt-10 shadow-3xl">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="headline" className="block text-sm font-medium">
              Headline
            </label>
            <textarea
              type="text"
              className="mt-1 w-full bg-amber-50 text-rose-500 py-2 px-3 rounded-md border border-rose-700 focus:outline-none focus:ring-2
						focus:ring-rose-500"
            value={thoughts.headline}
            onChange={(e) =>
                setThoughts((prev) => ({ ...prev, headline: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <textarea
              type="text"
              className="mt-1 w-full bg-amber-50 text-rose-500 py-2 px-3 rounded-md border border-rose-700 focus:outline-none focus:ring-2
						focus:ring-rose-500"
              rows={5}
              value={thoughts.content}
            onChange={(e) =>
                setThoughts((prev) => ({ ...prev, headline: e.target.value }))
              }
            />
          </div>
          <div className="mt-1  flex items-center" >
            <input
              type="file"
              name="image"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              value={thoughts.image}
              className="cursor-pointer bg-rose-500 py-2 px-3 border-rose-800 focus:outline-none rounded-md focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 hover:bg-amber-50 hover:text-rose-700 shadow-2xl text-sm font-medium transition-all duration-300 ease-in-out"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {thoughts.image && <span className="ml-2 text-sm">Image uploaded</span>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full flex justify-center py-2 px-3 bg-rose-500 text-sm font-medium border border-rose-500 rounded-md transition-all duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:bg-rose-400 hover:bg-amber-50 hover:text-rose-600 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader
                  className="cursor-pointer mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <SaveAllIcon className="mr-2 h-5 w-5" />
                Save
              </>
            )}
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default UpdatePage