

export type UserType = {
    age:number,
    name:string,
    childrenCount:number
}




export const UserReducer = (state:UserType,action:{type:string}) => {
switch (action.type) {
    case 'SUM-AGE' :
        state.age+=1; return
    case 'ADD-CHILD':
        state.childrenCount+=1; return
    default: return state
}}