#!/usr/bin/env python3
"""Module providing a Cache class for Redis storage."""
import redis
import uuid
from typing import Union, Callable, Optional
from functools import wraps


def count_calls(method: Callable) -> Callable:
    """Count calls to a method using Redis."""
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)

    return wrapper


def call_history(method: Callable) -> Callable:
    """Store the input and output history of a method."""
    @wraps(method)
    def wrapper(self, *args):
        inputs_key = method.__qualname__ + ":inputs"
        outputs_key = method.__qualname__ + ":outputs"

        self._redis.rpush(inputs_key, str(args))

        output = method(self, *args)

        self._redis.rpush(outputs_key, output)

        return output

    return wrapper


class Cache:
    """Class for storing data in Redis."""

    def __init__(self):
        """Initialize Redis client and clear the database."""
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store data in Redis using a randomly generated key."""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None):
        """Retrieve data from Redis and optionally convert it."""
        data = self._redis.get(key)

        if data is None:
            return None

        if fn is not None:
            return fn(data)

        return data

    def get_str(self, key: str) -> str:
        """Retrieve data from Redis and decode it to a string."""
        return self.get(key, lambda data: data.decode("utf-8"))

    def get_int(self, key: str) -> int:
        """Retrieve data from Redis and convert it to an integer."""
        return self.get(key, int)
