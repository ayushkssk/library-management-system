import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Book from '@/models/Book';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const book = await Book.findById(params.id);
  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  return NextResponse.json(book);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await dbConnect();
  const updatedBook = await Book.findByIdAndUpdate(params.id, body, { new: true });
  if (!updatedBook) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  return NextResponse.json(updatedBook);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deletedBook = await Book.findByIdAndDelete(params.id);
  if (!deletedBook) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Book deleted successfully' });
}

