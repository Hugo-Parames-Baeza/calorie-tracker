import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import { categories } from "../data/categorias"
import type { tActivity } from "../types"
import type {tActivityActions, tActivityState} from "../reducers/activityReducer"

type tFormProps = {
    dispatch:Dispatch<tActivityActions>
    state:tActivityState
}

const initialState : tActivity = {
    id: uuidv4(),
    category:1,
    name:'',
    calories:0
}

export default function Form({dispatch, state}:tFormProps) {

    const[activity, setActivity] = useState<tActivity>(initialState)

    useEffect(()=>{
        if(state.activeId){
            const selected = state.activities.find(item=>item.id===state.activeId) as tActivity
            setActivity(selected)
        }
    },[state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLInputElement>)=>{
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        setActivity(prev=>{
            return {
                ...prev,
                [e.target.id]: isNumberField? +e.target.value : e.target.value
            }
        })
    }

    const isValidAcivity = ()=>{
        const {name, calories} = activity;
        return name.trim() != '' && calories >0
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch({type:"save-activity", payload:{newActivity:activity}});
        setActivity({...initialState, id:uuidv4()})
    }
    return (
        <form onSubmit={handleSubmit} method="GET" className="space-y-5 bg-white shadow rounded-lg p-10">
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="category">Categoría:</label>
                <select onChange={handleChange} id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white" name="category" value={activity.category}>
                    {categories.map(category=>(
                        <option key={category.id} value={`${category.id}`}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Actividad:</label>
                <input onChange={handleChange} placeholder="Ej. Comida, ejercicio..." value={activity.name} className="border border-slate-300 rounded-lg p-1" id="name" type="text" name="name"/>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories">Calorías:</label>
                <input onChange={handleChange} value={activity.calories} className="border border-slate-300 rounded-lg p-1" id="calories" type="number" name="calories"/>
            </div>
            <input disabled={!isValidAcivity()} type="submit" className="transition-all disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer" value={`Guardar ${activity.category==1?'Comida':'Ejercicio'}`}/>
        </form>
    )
}
