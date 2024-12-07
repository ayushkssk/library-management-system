import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';

export async function GET() {
  await dbConnect();
  const students = await Student.find({});
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const newStudent = new Student(body);
  await newStudent.save();
  return NextResponse.json(newStudent, { status: 201 });
}

