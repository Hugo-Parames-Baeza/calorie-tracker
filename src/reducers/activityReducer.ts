import type {tActivity} from '../types/index'

//acciones, state inicial, reducer

export type tActivityActions = {
    type:'save-activity'
    payload: {newActivity:tActivity}
} | {type:'set-activeId', payload:{id:tActivity['id']}} | 
{type:'delete'} | {type:'delete-item', payload:{activity:tActivity}}

export type tActivityState = {
    activities:tActivity[]
    activeId:tActivity['id']
}

function localStorageGetitem():tActivity[]{
    return JSON.parse(localStorage.getItem('activities')||'[]');
}

export const initialState:tActivityState = {
    activities:localStorageGetitem(),
    activeId: ''
}

export const activityReducer = (state:tActivityState = initialState, action:tActivityActions)=>{
    switch(action.type){
        case 'save-activity':
            const existe = state.activities.some(item=>action.payload.newActivity.id == item.id);
            //Este codigo actualiza el state
            return existe ? {activities:state.activities.map(item=>item.id==action.payload.newActivity.id? action.payload.newActivity : item), activeId:''} :{//Pasa solo un elemento y se sobreescribe
                activeId:'',
                activities:[...state.activities, action.payload.newActivity]
            }
            break;
        case 'set-activeId':
            return {
                ...state,
                activeId:action.payload.id
            }
            break;
        case 'delete':
            return{
                ...state,
                activities:[]
            }
            break;
        case 'delete-item':
            return{
                ...state,
                activities: state.activities.filter(item=>item.id != action.payload.activity.id)
            }
        break;
    }
}