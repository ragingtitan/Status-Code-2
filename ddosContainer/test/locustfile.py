import time
from locust import HttpUser, task, between, constant
import random

class LoadTestUser(HttpUser):
    wait_time = between(0.1, 0.5)  # More aggressive timing

    @task(10)  # Higher weight for attack endpoint
    def attack_endpoint(self):
        """Attack the vulnerable endpoint"""
        with self.client.get("/attack", catch_response=True) as response:
            if response.status_code == 503:
                #response.success()  # Mark 503 as success for demonstration
                print(f"Server overloaded! Status: {response.status_code}")
            elif response.status_code == 500:
                #response.success()  # Mark 500 as expected failure
                print(f"Server crashed! Status: {response.status_code}")

    @task(5)  # Attack the extreme endpoint
    def attack_extreme_endpoint(self):
        """Attack the extremely vulnerable endpoint"""
        with self.client.get("/attack-extreme", catch_response=True) as response:
            if response.status_code >= 500:
                #response.success()  # Mark server errors as expected
                print(f"Extreme endpoint failed! Status: {response.status_code}")

    @task(2)  # Lower weight for protected endpoint
    def hit_protected_endpoint(self):
        """Hit the rate-limited endpoint"""
        with self.client.get("/protected", catch_response=True) as response:
            if response.status_code == 429:
                response.success()  # Rate limiting is working as expected
                print("Rate limit triggered!")

    @task(1)
    def check_status(self):
        """Occasionally check server status"""
        self.client.get("/status")

class AggressiveUser(HttpUser):
    """More aggressive user that hammers the server"""
    wait_time = constant(0.01)  # Very fast requests
    
    @task
    def spam_attack(self):
        """Spam the attack endpoint as fast as possible"""
        with self.client.get("/attack", catch_response=True) as response:
            if response.status_code >= 500:
                print(f"Aggressive attack failed! Status: {response.status_code}")
                #response.success()

class BurstUser(HttpUser):
    """User that sends bursts of requests"""
    wait_time = between(2, 5)  # Wait longer between bursts
    
    @task
    def burst_attack(self):
        """Send a burst of requests"""
        for _ in range(10):  # Send 10 requests quickly
            with self.client.get("/attack", catch_response=True) as response:
                if response.status_code >= 500:
                    print(f"Burst attack failed! Status: {response.status_code}")
                    #response.success()
            time.sleep(0.01)  # Very small delay between requests in burst