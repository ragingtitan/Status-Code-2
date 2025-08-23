SHELL := /bin/bash
DC := docker compose
RESULTS_DIR := results
PROGRESS_FILE := .progress

# csv prefixes (Locust will create *_stats.csv, *_failures.csv etc.)
ATTACK_PREFIX := /results/attack
EXTREME_PREFIX := /results/extreme
PROTECTED_PREFIX := /results/protected

.PHONY: up down wait attack attack-extreme attack-protected progress summary finish reset clean

up:
	@echo "Bringing up lab services in background..."
	@$(DC) up -d --build app redis
	@$(MAKE) wait

down:
	@echo "Stopping lab services..."
	@$(DC) down

wait:
	@echo -n "Waiting for app to be ready at http://localhost:8000/status "
	@for i in {1..60}; do \
		if curl -sSf http://localhost:8000/status >/dev/null; then \
			echo "OK"; exit 0; \
		else \
			echo -n "."; sleep 1; \
		fi; \
	done; \
	echo; echo "App did not become ready in time."; exit 1

attack:
	@mkdir -p $(RESULTS_DIR)
	@echo "Launching normal attack (/attack)..."
	-@$(DC) run --rm --entrypoint locust locust-runner \
		-f /mnt/locust/locustfile_attack.py \
		--headless -u 120 -r 30 -t 30s \
		--csv $(ATTACK_PREFIX) \
		--host http://app:8000 
	@$(MAKE) _record_progress WHAT=attack
	@$(MAKE) _print_one_summary FILE=$(RESULTS_DIR)/attack_stats.csv LABEL="attack"

attack-extreme:
	@mkdir -p $(RESULTS_DIR)
	@echo "Launching extreme attack (/attack-extreme)..."
	-@$(DC) run --rm --entrypoint locust locust-runner \
		-f /mnt/locust/locustfile_extreme.py \
		--headless -u 60 -r 60 -t 15s \
		--csv $(EXTREME_PREFIX) \
		--host http://app:8000
	@$(MAKE) _record_progress WHAT=attack-extreme
	@$(MAKE) _print_one_summary FILE=$(RESULTS_DIR)/extreme_stats.csv LABEL="attack-extreme"

attack-protected:
	@mkdir -p $(RESULTS_DIR)
	@echo "Launching attack against protected endpoint (/protected)..."
	@$(DC) run --rm --entrypoint locust locust-runner \
		-f /mnt/locust/locustfile_protected.py \
		--headless -u 200 -r 100 -t 30s \
		--csv $(PROTECTED_PREFIX) \
		--host http://app:8000
	@$(MAKE) _record_progress WHAT=attack-protected
	@$(MAKE) _print_one_summary FILE=$(RESULTS_DIR)/protected_stats.csv LABEL="attack-protected"

# Progress & completion -------------------------------------------------------

progress:
	@done=$$( (sort -u $(PROGRESS_FILE) 2>/dev/null || true) | wc -l | tr -d ' ' ); \
	total=3; \
	filled=$$(printf "%0.s#" $$(seq 1 $$done)); \
	empty=$$(printf "%0.s-" $$(seq 1 $$((total-done)))); \
	echo "Progress: [$$filled$$empty] $$done/$$total"; \
	echo "Completed: $$(sort -u $(PROGRESS_FILE) 2>/dev/null || echo 'None yet')"

finish:
	@done=$$( (sort -u $(PROGRESS_FILE) 2>/dev/null || true) | wc -l | tr -d ' ' ); \
	if [ "$$done" -eq 3 ]; then \
		touch .lab_done; \
		echo "Lab complete! (.lab_done created)"; \
	else \
		echo "You must run: make attack, make attack-extreme, make attack-protected before finishing."; \
		exit 1; \
	fi

summary:
	@$(MAKE) _print_one_summary FILE=$(RESULTS_DIR)/attack_stats.csv LABEL="attack" || true
	@$(MAKE) _print_one_summary FILE=$(RESULTS_DIR)/extreme_stats.csv LABEL="attack-extreme" || true
	@$(MAKE) _print_one_summary FILE=$(RESULTS_DIR)/protected_stats.csv LABEL="attack-protected" || true

# Maintenance -----------------------------------------------------------------

reset:
	@echo "Resetting app counters and wiping progress/results..."
	-@curl -s http://localhost:8000/reset >/dev/null || true
	@rm -rf $(RESULTS_DIR) $(PROGRESS_FILE) .lab_done
	@mkdir -p $(RESULTS_DIR)
	@echo "Done."

clean: down reset

# Internals -------------------------------------------------------------------

_record_progress:
	@touch $(PROGRESS_FILE)
	@grep -qxF "$(WHAT)" $(PROGRESS_FILE) || echo "$(WHAT)" >> $(PROGRESS_FILE)

# Greps 'Aggregated' or 'Total' row; falls back to last row if needed
_print_one_summary:
	@file="$(FILE)"; label="$(LABEL)"; \
	if [ ! -f "$$file" ]; then echo "$(LABEL): (no CSV yet)"; exit 0; fi; \
	line=$$(grep -E 'Aggregated|Total' "$$file" || tail -n 1 "$$file"); \
	IFS=, read -r name reqs fails _ <<< "$$line"; \
	echo "* $$label → requests=$$reqs failures=$$fails (see $$(basename $$file))"
