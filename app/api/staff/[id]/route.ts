import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Staff from '@/models/Staff';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const staff = await Staff.findById(params.id);
  if (!staff) {
    return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
  }
  return NextResponse.json(staff);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await dbConnect();
  const updatedStaff = await Staff.findByIdAndUpdate(params.id, body, { new: true });
  if (!updatedStaff) {
    return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
  }
  return NextResponse.json(updatedStaff);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deletedStaff = await Staff.findByIdAndDelete(params.id);
  if (!deletedStaff) {
    return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Staff member deleted successfully' });
}

