#!/usr/bin/env python3
"""
JT-PROXENSE - Proxmox VE Monitoring System
Main entry point
"""

import asyncio
import logging
import signal
import sys

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("jt-proxense")


async def main():
    """Main entry point"""
    from server.server import start_server, stop_server

    logger.info("Starting JT-PROXENSE...")

    runner = None
    shutdown_event = asyncio.Event()

    def signal_handler():
        logger.info("Shutdown signal received")
        shutdown_event.set()

    # Register signal handlers
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, signal_handler)

    try:
        runner = await start_server()
        logger.info("JT-PROXENSE is running. Press Ctrl+C to stop.")

        # Wait for shutdown signal
        await shutdown_event.wait()

    except Exception as e:
        logger.error(f"Error: {e}")
        raise

    finally:
        if runner:
            await stop_server(runner)

    logger.info("JT-PROXENSE stopped.")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)
