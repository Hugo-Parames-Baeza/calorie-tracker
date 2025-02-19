import type { tActivity } from "../types"
import { categories } from "../data/categorias"
import { useMemo, ActionDispatch } from "react"
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline'
import type { tActivityActions } from "../reducers/activityReducer"
type tActivityProps = {
    activities:tActivity[]
    dispatch:ActionDispatch<[action: tActivityActions]>
}

export default function Activity({activities, dispatch}:tActivityProps) {
    const categoryName = useMemo(()=> (category:tActivity['category'])=> {
        return categories.map(cat=>cat.id==category?cat.name:"")
    } ,[activities])
    const isEmptyActivities = useMemo(()=>activities.length > 0 , [activities])
    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades:</h2>
            {!isEmptyActivities? <p className="text-center mt-3">No hay actividades aún...</p> : activities.map(act=>(
                <div key={act.id} className="px-5 py-10 bg-white mt-5 flex justify-between overflow-hidden">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${act.category === 1?'bg-lime-500':'bg-orange-500'}`}>
                            {categoryName(act.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5">
                            {act.name}
                        </p>
                        <p className="font-black text-4xl text-lime-500">
                            {act.calories}{' '}
                            <span>Calorías</span>
                        </p>
                    </div>
                    <div className="flex gap-7 items-center">
                        <button className="hover:bg-red-600 group transition-all p-1 rounded-2xl" onClick={()=>{dispatch({type:"delete-item", payload:{activity:act}})}}>
                            <TrashIcon className="h-8 w-8 group-hover:text-white transition-all"/>
                        </button>
                        <button className="hover:bg-lime-800 group transition-all p-1 rounded-2xl" onClick={()=>dispatch({type:'set-activeId', payload:{id:act.id}})}>
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800 group-hover:text-white transition-all"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
