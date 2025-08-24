from locust import HttpUser, task, between

class AttackUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def attack_endpoint(self):
        """Attack the vulnerable endpoint"""
        with self.client.get("/attack", catch_response=True) as response:
            if response.status_code >= 500:
                response.failure(f"[ATTACK] Server failure {response.status_code}")
                print(f"[ATTACK] Server failure! Status: {response.status_code}")