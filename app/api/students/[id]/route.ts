import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/models/Student';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const student = await Student.findById(params.id);
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
  return NextResponse.json(student);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await dbConnect();
  const updatedStudent = await Student.findByIdAndUpdate(params.id, body, { new: true });
  if (!updatedStudent) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
  return NextResponse.json(updatedStudent);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deletedStudent = await Student.findByIdAndDelete(params.id);
  if (!deletedStudent) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Student deleted successfully' });
}

