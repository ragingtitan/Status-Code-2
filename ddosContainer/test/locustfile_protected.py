from locust import HttpUser, task, between

class ProtectedUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def protected_endpoint(self):
        """Hit rate-limited endpoint"""
        with self.client.get("/protected", catch_response=True) as response:
            if response.status_code == 429:
                response.success()
                print("[PROTECTED] Rate limit triggered!")
            elif response.status_code >= 500:
                response.failure(f"[PROTECTED] Server failure {response.status_code}")
                print(f"[PROTECTED] Server failure! Status: {response.status_code}")