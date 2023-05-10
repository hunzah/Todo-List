import {UserReducer, UserType} from './user-reducer';
const user: UserType = {
    age: 5,
    name: 'Vova',
    childrenCount:2
}
test('user should increment only age', () => {

    // const res =
  UserReducer(user, {type: 'SUM-AGE'})
    expect(user.age).toBe(6)
    expect(user.childrenCount).toBe(2)

})
test('user should increment only childrens', () => {


  UserReducer(user, {type: 'ADD-CHILD'})
    expect(user.age).toBe(6)
    expect(user.childrenCount).toBe(2)

})