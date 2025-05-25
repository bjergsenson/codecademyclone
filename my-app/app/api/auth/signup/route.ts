import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Save to your DB (e.g., Prisma, Mongo, etc.)
    // await db.user.create({ data: { email, password: hashedPassword } });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
}