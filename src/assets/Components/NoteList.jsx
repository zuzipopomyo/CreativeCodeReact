/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useFirestore from "../../hooks/useFireStore";
import { useParams } from "react-router-dom";
import moment from "moment";
import trash from "../../img/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import pencil from '../../img/edit_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import NoteForm from "./NoteForm";
export default function NoteList() {
  let { id } = useParams();

  let { getCollection,deleteDocument,updateDocument} = useFirestore();
let [editNote,setEditNote] = useState(null)
  
  let {
    error,
    data: notes,
    loading,
  } = getCollection("notes", ["bookUid", "==", id]);

  //deletenote
  let deleteNote = async (id) =>{
    await  deleteDocument('notes',id)
  }

  
  return (
    !!notes.length && (
        notes.map(note => (
            <div key={note.id} className='border-2 shadow-md p-3 my-3' >
                <div className='flex space-x-3 justify-between'>
                    <div>
                        <img src="data:image/jpeg;base64,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" alt="" className='w-10 h-10 rounded-full' />
                        <div>
                            <h3>Julia</h3>
                            <div className='text-gray-400'>{moment(note?.date?.seconds * 1000).fromNow()}</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <img src={pencil} alt="" onClick={()=>setEditNote(note)} />
                        <img className='cursor-pointer' src={trash} alt=""  onClick={() => deleteNote(note.id)}/>
                       
                    </div>
                </div>
                <div className='mt-3'>
                    {editNote?.id !== note.id && note.body}
                    {editNote?.id == note.id && <NoteForm type='update' setEditNote={setEditNote} editNote={editNote}/>}
                </div>
            </div >
        ))
    )
)
}
