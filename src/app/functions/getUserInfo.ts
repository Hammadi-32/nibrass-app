export function getUserInfo() {
    const jsonInfo = localStorage.getItem('user-Info');
    const userInfo = jsonInfo ? JSON.parse(jsonInfo!) : ''
    return userInfo;
}