import time
import asyncio
import threading
from typing import Union
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

def rate_limit_exceeded_handler(request: Request, exc: Union[Exception, RateLimitExceeded]):
    return JSONResponse(status_code=429, content={"error": "Too many request. Try again later."})

limiter = Limiter(
    key_func=get_remote_address,
    storage_uri="redis://redis:6379"
)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

# Global variables to simulate resource exhaustion
request_count = 0
active_connections = 0
max_connections = 50  # Artificially low limit
memory_hog = []

@app.get("/")
async def root():
    return {"message": "FastAPI is running..."}

@app.get("/attack")
def target():
    global request_count, active_connections, memory_hog
    
    # Strategy 1: Increment connection counter
    active_connections += 1
    request_count += 1
    
    try:
        # Strategy 2: Simulate resource exhaustion after certain number of requests
        if request_count > 100:
            raise HTTPException(status_code=503, detail="Service Unavailable - Server Overloaded")
        
        # Strategy 3: Simulate connection limit
        if active_connections > max_connections:
            raise HTTPException(status_code=503, detail="Too many active connections")
        
        # Strategy 4: Memory exhaustion simulation (be careful with this)
        if request_count % 10 == 0:  # Every 10th request
            memory_hog.append("x" * 1000000)  # Add 1MB of data
            if len(memory_hog) > 100:  # Keep only last 100 entries
                memory_hog.pop(0)
        
        # Strategy 5: Increasing response time as load increases
        sleep_time = 0.1 + (request_count * 0.01)  # Gets slower over time
        if sleep_time > 2.0:  # Cap at 2 seconds
            sleep_time = 2.0
        
        time.sleep(sleep_time)
        
        # Strategy 6: Random failures after certain threshold
        if request_count > 50 and request_count % 7 == 0:
            raise HTTPException(status_code=500, detail="Internal Server Error - Random failure")
        
        return {
            "message": "Test server ready...",
            "request_number": request_count,
            "active_connections": active_connections,
            "response_time": sleep_time
        }
    
    finally:
        # Always decrement active connections
        active_connections = max(0, active_connections - 1)

@app.get("/attack-extreme")
def extreme_target():
    """Even more vulnerable endpoint for demonstration"""
    global request_count
    request_count += 1
    
    # Strategy 7: CPU intensive operation
    start = time.time()
    while time.time() - start < 0.5:  # Burn CPU for 0.5 seconds
        pass
    
    # Strategy 8: Always fail after 30 requests
    if request_count > 30:
        raise HTTPException(status_code=503, detail="Service Completely Overwhelmed")
    
    return {"message": "Extreme endpoint survived", "request_number": request_count}

@app.get("/protected")
@limiter.limit("10/second")
def protected(request: Request):
    return {"message": "This is a protected endpoint"}

@app.get("/reset")
def reset_counters():
    """Reset counters for testing purposes"""
    global request_count, active_connections, memory_hog
    request_count = 0
    active_connections = 0
    memory_hog.clear()
    return {"message": "Counters reset"}

@app.get("/status")
def server_status():
    """Check server status"""
    return {
        "total_requests": request_count,
        "active_connections": active_connections,
        "memory_usage_mb": len(memory_hog),
        "server_status": "overloaded" if request_count > 100 else "healthy"
    }