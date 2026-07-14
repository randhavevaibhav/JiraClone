export type Success<T> = {
  success: true;
  message: string;
  data: T;
};

export type Failure<E = unknown> = {
  success: false;
  message: string;
  details?: E;
};

export interface ValidationErrorResponse {
  message: string;

  details: Record<
    string,
    {
      errors: string[];
    }
  >;
}
