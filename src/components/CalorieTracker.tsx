import { tActivity } from "../types"
import { useMemo } from "react"
import CaloryDisplay from "./CaloryDisplay"

type tCaloryTrackerProps = {
    activities:tActivity[]
}

export default function CalorieTracker({activities}:tCaloryTrackerProps) {
    
    const caloriesConsumed = useMemo(()=> activities.reduce((accumulator, item)=>item.category ===1? accumulator+item.calories : accumulator,0) ,[activities])
    const caloriesBurned  = useMemo(()=> activities.reduce((accumulator, item)=>item.category ===2? accumulator+item.calories : accumulator,0) ,[activities])
    const total  = useMemo(()=> caloriesConsumed-caloriesBurned ,[caloriesBurned, caloriesConsumed])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloryDisplay
                    calories={caloriesConsumed}
                    text={'Consumidas'}
                />
                <CaloryDisplay
                    calories={caloriesBurned}
                    text={'Quemadas'}
                />
                <CaloryDisplay
                    calories={total}
                    text={'Total'}
                />
            </div>
        </>
    )
}
