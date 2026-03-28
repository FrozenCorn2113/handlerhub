export class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message)
    this.name = 'TimeoutError'
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message?: string
): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new TimeoutError(message ?? `Timed out after ${ms}ms`))
      }, ms)

      // Avoid keeping the event loop alive longer than needed
      if (typeof timeoutId === 'object' && 'unref' in timeoutId) {
        ;(timeoutId as { unref: () => void }).unref()
      }
    }),
  ])
}
