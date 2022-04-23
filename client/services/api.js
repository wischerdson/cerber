let client = null
export const setClient = ($axios) => client = $axios


export const signIn = data => client.post('/auth/token', data)
export const signUp = data => client.post('/auth/sign-up', data)

export const resetPassword = data => client.post('/password-reset/via-email', data)
export const getPasswordReset = data => client.get('/password-reset/details', data)
export const confirmPasswordResetCode = data => client.get('/password-reset/confirm', data)
export const changePasswordViaReset = data => client.put('/password-reset/change-password', data)
