import React,{useState,useEffect} from 'react'
import {Card,CardProps} from "../../components/Card/Card.js"
import './Home.css'

type newStudent={
  name:string;
  time:string;
}

type ProfileUser={
  name:string;
  avatar_url:string;
}

function Home() {
  const [studentName,setStudentName]=useState("");
  const [students,setStudents]=useState<CardProps[]>([]);
  const [user,setUser]=useState({name:"",avatar:""})

  function addStudent(){
    const newStudent:newStudent={
      name:studentName,
      time:new Date().toLocaleDateString("pt-br",{
        hour:"2-digit",minute:'2-digit',second:'2-digit'
      })

    }
    setStudents(estadoAnterior=>[...estadoAnterior, newStudent])
  }

  useEffect(()=>{
       fetch("https://api.github.com/users/DavidSantosDeveloper")
       .then((response)=>{
          response.json().then((data)=>{
            setUser({name:data.name,avatar:data.avatar_url})
         })
       })
       .catch(error=>console.error(error))

  },[])
  return (
        < >

          <div className='container'>
            <header>
              <h1>Lista de Presença</h1>
              <div>
              <strong>{user.name} </strong>
              <img src={user.avatar} alt='Foto do perfil'/>
            </div>
            </header>
            <input type="text" placeholder='Digite o nome...' onChange={e=>setStudentName(e.target.value)}/><button onClick={addStudent}>Adicionar</button>
           
            {
                students.map(estudantes=><Card key={estudantes.time}  name={estudantes.name} time={estudantes.time} />)
               
            }
          </div>
          
        </>
  )
}

export default Home
