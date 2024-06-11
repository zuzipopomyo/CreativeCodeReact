/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFireStore";
import { update } from "firebase/database";

export default function NoteForm({ type = "create" ,setEditNote,editNote}) {
  let { id } = useParams();
  let [body, setBody] = useState("");

  let { addCollection, updateDocument} = useFirestore();

  useEffect(()=>{
    if(type == 'update'){
        setBody(editNote.body)
    }
  },[]);

  let submit = async (e) => {
    e.preventDefault();
    if(type == 'create'){
        let data = {
            body,
            bookUid: id,
          };
          await addCollection("notes", data);
    }else{
        editNote.body = body;
       await updateDocument('notes',editNote.id,editNote,false)
       setEditNote(null)
    }
   

    setBody("");
  };
  return (
    <form onSubmit={submit}>
      <textarea
        className="p-3 shadow-md border-2 bg-gray-50 w-full"
        name=""
        id=""
        cols="30"
        rows="5"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <div className="flex space-x-3">
        <button className="border bg-blue-400 text-white px-3 py-2 rounded-lg my-3 flex items-center gap-1">
          {type === "create" ? "Add" : "Update"} Note
        </button>
        {type == 'update' && <button onClick={()=>setEditNote(null)} className="border bg-blue-400 text-white px-3 py-2 rounded-lg my-3 flex items-center gap-1">
           Cancel
        </button>}
      </div>
    </form>
  );
}
