class authService {
    async check() {
        let response = await fetch(process.env.REACT_APP_API_URL+"/users/checkauth",{
            credentials: "include"
          });
        let data = response.json()
        return data;
    }

    async login(body) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(body)
        });
        const responseJsoned = response.json()
        return responseJsoned;
    }

    async logout() {
        let response = await fetch(process.env.REACT_APP_API_URL+"/users/logout", {
            credentials: "include"
        });
        let data = response.json()
        return data;
    }
}

export default new authService()