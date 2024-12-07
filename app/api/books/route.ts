import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Book from '@/models/Book';

export async function GET() {
  await dbConnect();
  const books = await Book.find({});
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const newBook = new Book(body);
  await newBook.save();
  return NextResponse.json(newBook, { status: 201 });
}

