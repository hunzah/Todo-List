import {UserReducer, UserType} from './user-reducer';

test('testing reducer', () => {
    const user: UserType = {
        age: 5,
        name: 'Vova',
        childrenCount:2
    }
    // const res =
  UserReducer(user, {type: 'SUM-AGE'})
    expect(user.age).toBe(6)
    expect(user.childrenCount).toBe(2)

})