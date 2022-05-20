import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
// import AddTodo from './Todo/AddTodo'
// Загрузим элемент addTodo отдельно от основного бандла
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(()=> new Promise(resolve => {
  setTimeout(()=>{
    resolve(import('./Todo/AddTodo'))
  }, 3000) 
}))

// const AddTodo = React.lazy(()=> import('./Todo/AddTodo'))
// Добавляем динамический импорт

function App() 
{
  // Нам нужны useState чтобы перерендеривать компонент chekbox при изменении состояния
  // Ф-ия useState всегда возвращает массив из 2-х эл-ов: состояние и ф-ия изменяющая сост.
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
    // Добавили лимит чтобы загрузилось только 5 эл-ов
      .then(response => response.json())
      .then(todos => {
        // Сделаем чтобы сервер отвечал на 2с дольше
        setTimeout(()=>{
          setTodos(todos)
          setLoading(false)
          // Когда закончится процесс загрузки то анимация исчезнет
        },2000)
        
      })
// Взяли пример с сайта jsonplaceholder.typicode.com
  },[])
  // Этот массив обязательно нужен как список зависимостей для отработки колбэка, нужно чтобы отработал 1 раз 

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id !==id)) 
  // Если todo.id !== id то мы оставляем эл-т в массиве
  // Если = то эл-т удалится
}

function addTodo(title) {
  setTodos(todos.concat([
      {
        title,
        id: Date.now(),
        completed: false
      }
]))
}


  return (
    //Чтобы Реакт понял что загружаем его лениво */}
    // Нужно обернуть шаблон в этот комп-т чтобы передавать ф-ии сквозь другие комп-ты
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
        <h1>My simple React project</h1>

        <Modal />

        <React.Suspense fallback={<p>loading....</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>


        {loading && <Loader />}
        {todos.length ?(
           <TodoList todos={todos} onToggle={toggleTodo}/>
        ): loading ? null : (
          <p>No Todos!</p>
        )}
        
      </div>
    </Context.Provider>
  )
}

export default App
