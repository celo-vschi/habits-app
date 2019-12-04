import { login, logout } from '../../actions/auth';

test('should set up LOGIN action correctly', () => {
    const action = login('uid');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'uid'
    });
});
test('should set up LOGOUT action correctly', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});