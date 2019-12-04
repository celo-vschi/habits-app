import authReducer from '../../reducers/auth';

test('shoud set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should login correctly', () => {
    const uid = 'uid';
    const state = authReducer({}, {
        type: 'LOGIN',
        uid
    });
    expect(state).toEqual({ uid });
});

test('should logout correctly', () => {
    const state = authReducer({ uid: 'uid' }, { type: 'LOGOUT' });
    expect(state).toEqual({});
});