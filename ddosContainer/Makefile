up:
	docker-compose up --build

down:
	docker-compose down

scale-workers:
	docker-compose up --scale locust-worker=2 -d

.PHONY: up down scale-workers