from locust import HttpUser, task, constant

class ExtremeUser(HttpUser):
    wait_time = constant(0.01)

    @task
    def extreme_endpoint(self):
        """Hit the extremely vulnerable endpoint"""
        with self.client.get("/attack-extreme", catch_response=True) as response:
            if response.status_code >= 500:
                response.failure(f"[EXTREME] Server failure {response.status_code}")
                print(f"[EXTREME] Server failure! Status: {response.status_code}")