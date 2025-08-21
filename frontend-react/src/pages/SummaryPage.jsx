import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SummaryPage(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const teacherId = localStorage.getItem('teacherId') || 1

  useEffect(()=>{
    async function load(){
      try{
        const res = await api.get(`/api/attendance/summary?teacherId=${teacherId}`)
        setData(res.data || [])
      }catch(e){ console.error(e) }
      finally{ setLoading(false) }
    }
    load()
  }, [])

  if(loading) return <div>Loading...</div>

  const labels = data.map(d => d.studentName)
  const percentages = data.map(d => d.percentage)

  return (
    <div>
      <h2>Attendance Summary</h2>
      <div className="row" style={{marginTop:12}}>
        <div style={{flex:1}} className="card">
          <Bar
            data={{
              labels,
              datasets: [{ label: 'Attendance %', data: percentages }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' }, title: { display: true, text: 'Per-Student Attendance' } },
              scales: { y: { beginAtZero: true, max: 100 } }
            }}
          />
        </div>
        <div style={{flexBasis:'320px'}} className="card">
          <h3>Quick Stats</h3>
          <ul>
            <li>Total Students: {data.length}</li>
            <li>Average %: {data.length ? Math.round(data.reduce((a,b)=>a+b.percentage,0)/data.length) : 0}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
