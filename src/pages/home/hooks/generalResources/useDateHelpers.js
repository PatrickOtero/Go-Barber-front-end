import { useState } from 'react'

const useDateHelpers = () => {
  const [weekDay] = useState([
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ])

  const [month] = useState([
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ])

  const [appointmentHours] = useState([
    {id: 1, hour: "8:00"},
    {id: 2, hour: "8:30"},
    {id: 3, hour: "9:00"},
    {id: 4, hour: "9:30"},
    {id: 5, hour: "10:00"},
    {id: 6, hour: "10:30"},
    {id: 7, hour: "12:30"},
    {id: 8, hour: "13:00"},
    {id: 9, hour: "13:30"},
    {id: 10, hour: "14:00"},
    {id: 11, hour: "14:30"},
    {id: 12, hour: "15:00"},
    {id: 13, hour: "15:30"},
    {id: 14, hour: "16:00"},
    {id: 15, hour: "16:30"},
    {id: 16, hour: "17:00"},
    {id: 17, hour: "17:30"},
    {id: 18, hour: "18:00"},
    {id: 19, hour: "18:30"},
    {id: 20, hour: "19:00"},
    {id: 21, hour: "19:30"},
    {id: 22, hour: "20:00"},

  ])

  return { weekDay, month, appointmentHours }
}

export default useDateHelpers
