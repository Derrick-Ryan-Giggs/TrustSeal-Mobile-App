// Utilities for safe error serialization and console arg formatting

type AnyRecord = Record<string, any>;

export function isErrorLike(value: any): value is Error {
  return (
    value instanceof Error ||
    (value && typeof value === 'object' &&
      typeof value.message === 'string' &&
      ('stack' in value || 'name' in value))
  );
}

export function toPlainError(err: any): AnyRecord {
  if (!err) return { message: 'Unknown error' };
  if (isErrorLike(err)) {
    const plain: AnyRecord = {
      name: (err as any).name || 'Error',
      message: (err as any).message || String(err),
    };
    if ((err as any).stack) plain.stack = (err as any).stack;
    if ((err as any).code) plain.code = (err as any).code;
    if ((err as any).cause) plain.cause = safeSerialize((err as any).cause);
    return plain;
  }
  // If it's a string or primitive, return as message
  if (typeof err !== 'object') return { message: String(err) };
  // Generic object with potential message/stack
  const maybeMessage = (err as any).message;
  const maybeStack = (err as any).stack;
  const out: AnyRecord = {};
  if (maybeMessage) out.message = String(maybeMessage);
  if (maybeStack) out.stack = String(maybeStack);
  out.data = safeSerialize(err);
  return out;
}

export function safeSerialize<T = any>(value: T): any {
  const seen = new WeakSet();
  const replacer = (_key: string, val: any) => {
    if (typeof val === 'object' && val !== null) {
      if (seen.has(val)) return '[Circular]';
      seen.add(val);
    }
    if (isErrorLike(val)) return toPlainError(val);
    if (val instanceof Map) return { __type: 'Map', entries: Array.from(val.entries()) };
    if (val instanceof Set) return { __type: 'Set', values: Array.from(val.values()) };
    if (typeof val === 'bigint') return String(val);
    return val;
  };
  try {
    return JSON.parse(JSON.stringify(value as any, replacer));
  } catch {
    try {
      return String(value);
    } catch {
      return '[Unserializable]';
    }
  }
}

export function argsToMessage(args: any[]): string {
  return args
    .map((a) => {
      if (isErrorLike(a)) return `${(a as any).name || 'Error'}: ${(a as any).message || String(a)}`;
      if (typeof a === 'object') {
        try { return JSON.stringify(safeSerialize(a)); } catch { return '[Object]'; }
      }
      return String(a);
    })
    .join(' ');
}

export function argsToDetails(args: any[]): any {
  if (!args || args.length === 0) return undefined;
  if (args.length === 1) return safeSerialize(args[0]);
  return args.map((a) => safeSerialize(a));
}

export function normalizeErrorInput(input: any, extra?: any) {
  // Build a normalized error payload suitable for cross-frame postMessage
  let base = toPlainError(input);
  const payload: AnyRecord = {
    ...base,
    timestamp: new Date().toISOString(),
  };
  if (extra && typeof extra === 'object') {
    if ('componentStack' in extra) payload.componentStack = String((extra as any).componentStack);
    payload.details = safeSerialize(extra);
  }
  return payload;
}

