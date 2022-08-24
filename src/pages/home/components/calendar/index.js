import ptBr from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import './styles.css'

const markedDays = [{ dayOfWeek: [1, 2, 3, 4, 5] }]
const markedStyle = { background: '#3e3b47', borderRadius: '10px' }

const HomeCalendar = ({ getDate }) => {
  const [marked, setMarked] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  getDate(selectedDate);

  const handleDayClick = (day, modifiers) => {
    setMarked(day && modifiers.marked)
    setSelectedDate(day)
  }

  return (
    <aside>
      <DayPicker
        mode={'single'}
        locale={ptBr}
        fromMonth={new Date()}
        disabled={[{ dayOfWeek: [0, 6] }]}
        modifiers={{ marked: markedDays }}
        modifiersStyles={{ marked: markedStyle }}
        onDayClick={handleDayClick}
        selected={selectedDate}
      />
    </aside>
  )
}

export default HomeCalendar
