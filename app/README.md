# APP

```
app/
├── public/
│   ├── assets/
│   │   └── img/
│   │       └── error-404-monochrome.svg
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── auth.ts
│   ├── App.tsx
│   ├── components/
│   │   ├── AuthFormContainer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── Sidebar.tsx
│   ├── contexts/
│   │   └── AuthContext.ts
│   ├── features/
│   │   ├── background/
│   │   │   └── backgroundSlice.ts
│   │   └── sidebar/
│   │       └── sidebarSlice.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── interfaces/
│   │   ├── RouteHandle.ts
│   │   └── User.ts
│   ├── main.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── E401.tsx
│   │   ├── E404.tsx
│   │   ├── E500.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   └── Register.tsx
│   ├── providers/
│   │   └── AuthProvider.tsx
│   ├── routes.tsx
│   ├── scss/
│   │   ├── _global.scss
│   │   ├── _variables.scss
│   │   ├── layout/
│   │   │   ├── _authentication.scss
│   │   │   ├── _dashboard-default.scss
│   │   │   ├── _dashboard-fixed.scss
│   │   │   └── _error.scss
│   │   ├── navigation/
│   │   │   ├── _nav.scss
│   │   │   ├── _topnav.scss
│   │   │   └── sidenav/
│   │   │       ├── _sidenav-dark.scss
│   │   │       ├── _sidenav-light.scss
│   │   │       └── _sidenav.scss
│   │   ├── plugins/
│   │   │   └── simple-datatables.scss
│   │   ├── styles.scss
│   │   └── variables/
│   │       ├── _navigation.scss
│   │       └── _spacing.scss
│   ├── store.ts
│   └── vite-env.d.ts
├── .env.development
├── .env.production
├── .gitignore
├── example.env
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Hooks 

### useState (local state mangement)

```jsx
    import { useState } from "react";

    function Counter() {
        const [counter, setCounter] = useState(0);

        return (
            <>
                <p>Value: {counter}</p>
                <button onClick={() => setCounter(counter + 1)}> Increment</button>
            </>
        )
    }
```

### useEffect (colateral effects)

```jsx
    import { useState, useEffect } from "react";

    function UserData() {
        const [data, setData] = useState(null);

        useEffect(() => {
            fetch("https://localhost/api/users/1")
            .then((res) => res.json() )
            .then((data) =>setData(data));
        }, []); // the empty arry means this will run one time (like `componentDidMount`)

        return <pre>{JSON.stringify(data, null, 2)}</pre>
    }
```


### useContext (share global state)

```jsx
    import { useContext, createContext } from "react";

    const ThemeContext = createContext("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return <button style={{ background : theme === "dark" ? "black" :  "white"}}> Click to change </button>
    }
```


### useRef (DOM element refference)


```jsx
    import { useRef } from "react";

    function InputFocus() {
        const inputRef = useRef(null);

        return (
            <>
                <input ref={inputRef} type="text" />
                <button onmClick={() => inputRef.current.focus()}> Focused </button>)
            </>
    }
```


### use Memo (memorize calculus)


```jsx
    import { useState, useMemo } from "react";

    function SomeSum({numbers}) {
        const result = useMemo(() => number.reduce((a,b) => a + b, 0), [numbers]);

        return  <p> Sum: { result } </p>;
    }
```

### useCallback (memorize the functions )


```jsx
    import { useCallback } from "react";

    function Component() {
        const memorizedFunction = useCallback(() => {
            console.log("Executing ...")
        }, []);

        return  <button onCLick={memorizedFunction}>Execute</button>
    }
```

