import { getAccessToken } from "@/lib/auth-storage";
import { getApiBaseUrl } from "@/lib/env";
import type { ApiFieldErrors } from "@/types/auth";

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly fieldErrors: ApiFieldErrors;

  constructor(message: string, options: { code: string; status: number; fieldErrors?: ApiFieldErrors }) {
    super(message);
    this.name = "ApiError";
    this.code = options.code;
    this.status = options.status;
    this.fieldErrors = options.fieldErrors ?? {};
  }
}

interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
    details?: {
      fieldErrors?: ApiFieldErrors;
      formErrors?: string[];
    };
  };
}

type ApiRequestOptions = RequestInit & {
  auth?: boolean;
};

function parseFieldErrors(payload: ApiErrorPayload): ApiFieldErrors {
  const fieldErrors = payload.error?.details?.fieldErrors ?? {};
  const formErrors = payload.error?.details?.formErrors ?? [];

  if (formErrors.length > 0 && !fieldErrors._form) {
    return { ...fieldErrors, _form: formErrors };
  }

  return fieldErrors;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { auth = true, headers: initHeaders, ...rest } = options;
  const headers = new Headers(initHeaders);

  if (!headers.has("Content-Type") && rest.body) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...rest,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = (await response.json().catch(() => ({}))) as T & ApiErrorPayload;

  if (!response.ok) {
    throw new ApiError(payload.error?.message ?? "Request failed", {
      code: payload.error?.code ?? "REQUEST_FAILED",
      status: response.status,
      fieldErrors: parseFieldErrors(payload),
    });
  }

  return payload;
}

export function getFieldError(fieldErrors: ApiFieldErrors, field: string): string | undefined {
  return fieldErrors[field]?.[0];
}
