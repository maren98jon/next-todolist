# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar estos comando de Prisma
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base datos local](http://localhost:3000/api/seed)


## Nota: Usuario por defecto
__usuario:__ test1@google.eus
__pass__: 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```



# Prod

# Stage