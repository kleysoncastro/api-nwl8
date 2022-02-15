## API em typesscipt express Prisma axios
#### Api acessa e faz autenticação usando oauth do github


```javascript
app.get("/github", (requst, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTE_ID}`
    );
});
```
### Rota  `/github` é o endpoint da nossa api
Quando essa rota é acessada `"/github"` o express redireciona para o auth do github.

A variavel `process.env.GITHUB_CLIENTE_ID` deve ser ativada na área de desenvilvedor do github.

[Informações sobre os parâmetros da api de autenticação do github](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)

### Retirecionamento redirect_uri


```javascript
    app.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    response.send({ code });
});
```
A string `"/signin/callback"` é a redirect_uri, node que o `request` reseberá o code
se for for consedida a outorização 

### ULR de autorização 
### `POST https://github.com/login/oauth/access_token`

```javascript
  async execute(code: string) {
        const url = "http://github.com/login/oauth/access_token";

        const getAccessTokenUser = await axios.post<IAccessTokenResponse>(
            url,
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENTE_ID,
                    client_secret: process.env.GITHUB_CLIENTE_SECRET,
                    code,
                },
                headers: {
                    Accept: "application/json",
                },
            }
        );
```
Acessando a url de redirecionamento passando os parametros de acesso de desenvolvedor
a api retorna o access token.

#### Por fim

```javascript
       const response = await axios.get<IUserResponse>(
            "https://api.github.com/user",
            {
                headers: {
                    authorization: `Bearer ${getAccessTokenUser.data.access_token}`,
                },
            }
        );
```
Com o token vindo do github `getAccessTokenUser`.
Podemos usa-lo para acessar `https://api.github.com/user` que vai retornar um objeto `data` detro de response.
Ex 
```javascript
  const { id, login, avatar_url, name } = response.data;
```
