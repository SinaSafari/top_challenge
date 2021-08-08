# Note Taker

> this app is an assignment for [top.ir](https://top.ir)

## introduction
the purpose of this app is to let you store your notes about anything.
this app uses persistant database so don't worry about losing them!


## Tech that I used:

- **Nextjs**:

I'm using api and database for persisting data in my app. nextjs has support for building a fullstack application so it's the best choice for
our purpose.
also it provides SSR, SSG and ISR for better data fetching which is so useful in various situations.

- **sqlite**:

I used sqlite as my database because it's easy to use and doesn't require any other services to lunch and serve.
you can find it in the root of the project as `db.sqlite`


- **bootstrap**:

due to requirements of the assignment, I used bootstrap as my styling framework. I used form, toast, and layout utilities from this reach framework.



- **axios**:

for requesting to server, I used axios which introduces better functionality than fetch API.