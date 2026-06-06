import type { NextFunction, Request, Response } from "express";

import { usersService } from "./users.service.js";
import type { UpdateProfileBody, UserIdParams } from "./users.validators.js";

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await usersService.getMe(req.user!.id);
    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
}

export async function updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as UpdateProfileBody;
    const user = await usersService.updateMe(req.user!.id, body);
    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as UserIdParams;
    const user = await usersService.getById(id);
    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
}
