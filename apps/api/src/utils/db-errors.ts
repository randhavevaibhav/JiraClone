export const POSTGRES_ERROR_MAP: Record<
  string,
  { status: number; message: string }
> = {
  ECONNREFUSED: {
    status: 503,
    message: 'Database server is down or refusing connections.',
  },
  ETIMEDOUT: {
    status: 503,
    message:
      'Database connection timed out. Check network or firewall settings.',
  },
  ENOTFOUND: {
    status: 503,
    message: 'Database host address could not be resolved.',
  },
  '28P01': {
    status: 500,
    message: 'Database authentication failed. Check server configuration.',
  },

  '08003': { status: 503, message: 'Database connection is closed.' },
  '08006': {
    status: 503,
    message: 'Database link failure. Server might be down.',
  },
};
