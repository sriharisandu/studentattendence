import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Button from '../components/Button'
import Toggle from '../components/Toggle'

export default function StudentsPage(){
  const [students, setStudents] = useState([])
  const [mark, setMark] = useState({})
  const [date, setDate] = useState(()=>new Date().toISOString().slice(0,10))
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const teacherId = localStorage.getItem('teacherId') || 1

  useEffect(()=>{
    async function load(){
      try{
        const res = await api.get(`/api/students?teacherId=${teacherId}`)
        setStudents(res.data || [])
        const initial = {}
        res.data.forEach(s => initial[s.id] = true)
        setMark(initial)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [])

  async function submit(){
    setMsg('')
    try{
      const payload = {
        date,
        entries: Object.entries(mark).map(([studentId, present]) => ({ studentId: Number(studentId), present }))
      }
      await api.post('/api/attendance', payload)
      setMsg('Attendance submitted ✅')
    }catch(e){
      console.error(e)
      setMsg('Failed to submit')
    }
  }

  if(loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Mark Attendance</h2>
      <div className="row" style={{alignItems:'center', justifyContent:'space-between', margin:'12px 0 18px'}}>
        <div className="tag">Date</div>
        <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} style={{maxWidth:200}}/>
      </div>
      <table className="table">
        <thead>
          <tr><th>Roll</th><th>Name</th><th>Present?</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.rollNo}</td>
              <td>{s.name}</td>
              <td><Toggle value={!!mark[s.id]} onChange={v => setMark(m => ({...m, [s.id]: v}))} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:16}}>
        <Button onClick={submit}>Submit Attendance</Button>
        {msg && <span style={{marginLeft:12}}>{msg}</span>}
      </div>
    </div>
  )
}
