import {useReducer, useEffect, useMemo} from 'react'
import Form from './components/Form.tsx';
import { activityReducer, initialState } from './reducers/activityReducer.ts';
import Activity from './components/Activity.tsx';
import {TrashIcon} from '@heroicons/react/24/outline'
import CalorieTracker from './components/CalorieTracker.tsx';
export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities));
  },[state.activities])

  const canRestarApp = ()=>useMemo(()=>state.activities.length, [state.activities]);

  return (
    <>
      <header className='bg-lime-600 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>
            Contador de calorías
          </h1>
          <button disabled={!canRestarApp()} className='disabled:opacity-10 bg-white rounded-2xl px-7 py-1 hover:bg-gray-300 transition-all' onClick={()=>dispatch({type:'delete'})}>
            <TrashIcon className='w-8 h-8'/>
          </button>
        </div>
      </header>
      <section className='bg-lime-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <Activity
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>
    </>
  )
}