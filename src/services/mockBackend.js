const usersKey = "users";
const articlesKey = "articles";
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
let articles = JSON.parse(localStorage.getItem(articlesKey)) || [];

export function mockBackend() {
    let realFetch = window.fetch;

    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 1000);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/register') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/') && opts.method === 'GET':
                        return getArticles();
                    case url.match(/\/article\/\d+$/) && opts.method === 'GET':
                        return getArticleById();
                    case url.endsWith('/article/new') && opts.method === 'POST':
                        return newArticle();
                    case url.match(/\/article\/\d+$/) && opts.method === 'PUT':
                        return editArticle();
                    case url.match(/\/article\/\d+$/) && opts.method === 'DELETE':
                        return deleteArticle();
                    default:
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            function authenticate() {
                const { email, password } = body();
                const user = users.find(x => x.email === email && x.password === password);

                if (!user) return error('Username or password is incorrect');

                return ok({
                    ...{ id: user.id, email: user.email },
                    token: 'mock-jwt-token'
                });
            }

            function register() {
                const user = body();

                if (users.find(x => x.email === user.email)) {
                    return error('Email "' + user.email + '" is already taken. Try another email address.')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            function getArticles() {
                if (!isAuthenticated()) return unauthorized();
                return ok(articles.map(x => copyArticle(x)));
            }

            function getArticleById() {
                if (!isAuthenticated()) return unauthorized();

                const article = articles.find(x => x.id === idFromUrl());

                if (article == null) {
                    return error("Article is not exist.")
                }

                return ok(copyArticle(article));
            }

            function newArticle() {
                const article = body();

                article.id = articles.length ? Math.max(...articles.map(x => x.id)) + 1 : 1;
                article.createdAt = new Date().toISOString();
                articles.push(article);

                localStorage.setItem(articlesKey, JSON.stringify(articles));
                return ok();
            }

            function editArticle() {
                if (!isAuthenticated()) return unauthorized();

                let params = body();
                let article = articles.find(x => x.id === idFromUrl());

                Object.assign(article, params);
                localStorage.setItem(articlesKey, JSON.stringify(articles));
                return ok();
            }

            function deleteArticle() {
                if (!isAuthenticated()) return unauthorized();

                articles = articles.filter(x => x.id !== idFromUrl());
                localStorage.setItem(articlesKey, JSON.stringify(articles));
                return ok();
            }

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function copyArticle(article) {
                const { id, title, author, tags, content, createdAt } = article;
                return { id, title, author, tags, content, createdAt };
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer mock-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        });
    }
}