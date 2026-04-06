# Arquitectura del Motor de Reportes (SRJUNCO)

## 1. El Ciclo de Datos (Inyección Atómica)
Para evitar que los registros se pierdan por latencia en la nube (Vercel/DB), usamos un sistema de **Transacciones con Aislamiento ReadCommitted**.
*   **Backend:** Genera el código `JQ` dentro de la transacción para asegurar unicidad.
*   **Frontend:** Utiliza **SWR Mutate** para inyectar el dato visualmente al instante (Optimistic UI).

## 2. Auditoría en Tiempo Real
Si detectas que una tabla no se actualiza, abre la consola (F12). Los mensajes marcados como `[AUDIT DATA FLOW]` te dirán exactamente:
- Cuándo se envió el dato.
- Qué ID devolvió el servidor.
- Cuándo se disparó la actualización de la lista.

## 3. Mantenimiento de la Base de Datos
Cada vez que realices un cambio en el archivo `prisma/schema.prisma`, debes ejecutar:
- `npx prisma db push` (Si cambias el código y quieres actualizar la base).
- `npx prisma db pull` (Si cambias la base directamente y quieres actualizar el código).

Esto asegura que tu código y tu base de datos en la nube estén sincronizados.
