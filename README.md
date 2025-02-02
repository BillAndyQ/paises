# paises

@startuml
entity Usuario {
  +id_usuario: INT
  --
  nombre: VARCHAR
  email: VARCHAR
}
entity Pedido {
  +id_pedido: INT
  --
  fecha: DATE
  total: DECIMAL
}
Usuario ||--o{ Pedido : realiza
@enduml


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
