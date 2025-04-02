## Rotas passageiro

[X] Consultar se existe uma corrida pendente (hoje) para o usuario logado
GET -> /rides
Filtros: passenger_user_id, pickup_date, ride_id, driver_user_id, status

[X] Cadrastrar novas caronas
POST -> /rides

[X] Cancelar um pedido de carona (excluir o pedido)
DELETE -> /rides/:ride_id

[X] Finalizar uma carona que foi concluida
PUT -> /rides/:ride_id/finish
body: driver_user_id

## Rotas motorista

[X] Consultar as corridas para o motorista (corridas dele + corridas pendentes sem motorista)
GET -> /rides/drivers/:driver_user_id

[X] Consutar todos os dados de uma determinada corrida
GET -> /rides/:ride_id

[X] Aceitar uma carona
PUT -> /rides/:ride_id/accept
body: driver_user_id

[X] Motorista cacela uma carona
PUT -> /rides/:ride_id/cancel

## Regras de negócio

[ ] O usuario so pode pedir uma carona por vez

[ ] O motorista so pode aceitar uma carona por vez
