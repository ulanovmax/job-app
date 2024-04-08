import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import {getUserByEmail} from "./db/users.js";

const secret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    const claims = { sub: user.id, email: user.email };
    const token = jwt.sign(claims, secret);

    // Set days
    const date = new Date();
    date.setDate(date.getDate() + 7);

    // Set cookies
    res.cookie('accessToken', token, { sameSite: "strict", expires: date, secure: true});

    res.json({ token });
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
