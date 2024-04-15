import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import {getCandidateByEmail} from "./db/candidates.js";
import {getCompany, getCompanyByEmail} from "./db/company.js";
import {Token} from "./ts/token.js";
import {Response, Request} from "express";

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

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Unauthorized' });
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

export const handleLogout = async (req, res) => {
  res.clearCookie('accessToken').status(200).json({ success: true });
}

export const getAuthInfo = async (req,res) => {
  if (!req.cookies.accessToken) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    res.status(200).json({ success: true })
  }
}