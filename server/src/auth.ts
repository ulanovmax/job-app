import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import {getCandidate, getCandidateByEmail} from "./db/candidates.js";
import {getCompany, getCompanyByEmail} from "./db/company.js";
import {Token} from "./ts/token.js";
import type {Response, Request} from "express";

const secret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const candidate = await getCandidateByEmail(email);
  const company = await getCompanyByEmail(email);

  const user = candidate ?? company;

  if (!user) {
    res.status(401).json({ error: "Couldn't find your account", code: "UNAUTHORIZED" });
  } else if (user.password !== password) {
    res.status(401).json({ error: 'Password is not correct', code: "PASSWORD_NOT_CORRECT" });
  } else {
    const claims: Token = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: candidate ? "candidate" : "company"
    };

    const token = jwt.sign(claims, secret);

    // Set days
    const date = new Date();
    date.setDate(date.getDate() + 7);

    // Set cookies
    res.cookie('accessToken', token, { sameSite: "strict", expires: date, secure: true});

    res.json({ accessToken: token });
  }
}

export const handleLogout = async (_req, res) => {
  res.clearCookie('accessToken').status(200).json({ success: true });
}

export const checkAuth = async (req, res) => {
  try {
    const accessToken = req.cookies["accessToken"];

    console.log(req.cookies)

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const decoded = jwt.decode(accessToken);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

    if (decoded.role === 'company') {
      const company = await getCompany(decoded.id);

      if (!company) {
        return res.status(401).json({
          success: false,
          error: 'Account not found'
        });
      }
    } else if (decoded.role === 'candidate') {
      const candidate = await getCandidate(decoded.id);

      if (!candidate) {
        return res.status(401).json({
          success: false,
          error: 'Account not found'
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        error: 'Invalid role'
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};
