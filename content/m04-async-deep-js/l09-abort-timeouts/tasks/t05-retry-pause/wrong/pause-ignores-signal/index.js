export async function retry(task, { attempts, pauseMs, signal } = {}) {
  signal?.throwIfAborted();
  for (let attempt = 1; ; attempt++) {
    try {
      return await task(signal);
    } catch (error) {
      if (signal?.aborted) throw signal.reason;
      if (attempt >= attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, pauseMs));
  }
}
