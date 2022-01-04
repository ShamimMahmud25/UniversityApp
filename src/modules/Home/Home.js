import React, { useEffect,useState } from 'react'
import { Container } from '@material-ui/core'
import NoteCard from '../../components/NoteCard'
import Masonry from 'react-masonry-css'
import Layout from '../Layout/NewLayout'
export default function Notes() {
  const [notes,SetNotes]= useState([])
  useEffect(()=>{
fetch('http://localhost:3000/notes')
.then(res=>res.json()).then(data=>SetNotes(data))
  },[])
  const handleDelete=async(id)=>{
    console.log(id);
    await fetch('http://localhost:3000/notes/'+id,{
      method:'DELETE'
    })
    const newNotes=notes.filter(note=>note.id!==id)
    SetNotes(newNotes)
  }
  const breakpoints={
    default:3,
    1100:2,
    700:1
  }
  return (
    <Layout>
    <Container>
      <Masonry   breakpointCols={breakpoints}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
      {notes.map(note=>(
        <div key={note.id}>
          
          <NoteCard note={note} handleDelete={handleDelete}/>
          
          </div>
      ))}
      </Masonry>
    </Container>
    </Layout>
  )
}
