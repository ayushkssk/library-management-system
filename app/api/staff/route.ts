import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Staff from '@/models/Staff';

export async function GET() {
  await dbConnect();
  const staffMembers = await Staff.find({});
  return NextResponse.json(staffMembers);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const newStaff = new Staff(body);
  await newStaff.save();
  return NextResponse.json(newStaff, { status: 201 });
}

