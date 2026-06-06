import type { NextFunction, Request, Response } from "express";

import { authService } from "./auth.service.js";
import type { LoginBody, LogoutBody, RefreshBody, RegisterBody } from "./auth.validators.js";

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as RegisterBody;
    const result = await authService.register(body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as LoginBody;
    const result = await authService.login(body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as RefreshBody;
    const result = await authService.refresh(body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as LogoutBody;
    await authService.logout(body);
    res.status(200).json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
}
