import time
from locust import HttpUser, task, between, constant, tag

# -------------------------------
# Normal attack hitting /attack
# -------------------------------
@tag("attack")
class AttackUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def attack_endpoint(self):
        """Attack the vulnerable endpoint"""
        with self.client.get("/attack", catch_response=True) as response:
            if response.status_code >= 500:
                # record as failure in Locust reports
                response.failure(f"[ATTACK] Server failure {response.status_code}")
                print(f"[ATTACK] Server failure! Status: {response.status_code}")

# -------------------------------
# Extreme attack hitting /attack-extreme
# -------------------------------
@tag("extreme")
class ExtremeUser(HttpUser):
    wait_time = constant(0.01)  # Fast requests

    @task
    def extreme_endpoint(self):
        """Hit the extremely vulnerable endpoint"""
        with self.client.get("/attack-extreme", catch_response=True) as response:
            if response.status_code >= 500:
                response.failure(f"[EXTREME] Server failure {response.status_code}")
                print(f"[EXTREME] Server failure! Status: {response.status_code}")

# -------------------------------
# Protected endpoint hitting /protected
# -------------------------------
@tag("protected")
class ProtectedUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def protected_endpoint(self):
        """Hit rate-limited endpoint"""
        with self.client.get("/protected", catch_response=True) as response:
            if response.status_code == 429:
                # treat rate-limit hits as expected success
                response.success()
                print("[PROTECTED] Rate limit triggered!")
            elif response.status_code >= 500:
                response.failure(f"[PROTECTED] Server failure {response.status_code}")
                print(f"[PROTECTED] Server failure! Status: {response.status_code}")

# -------------------------------
# Optional: Status checker (no tag)
# -------------------------------
@tag("status")
class StatusUser(HttpUser):
    wait_time = constant(5)  # Check every 5s

    @task
    def check_status(self):
        self.client.get("/status")
