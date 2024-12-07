'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  category: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', quantity: 1, category: '' })

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const response = await fetch('/api/books')
    const data = await response.json()
    setBooks(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
    setNewBook({ title: '', author: '', isbn: '', quantity: 1, category: '' })
    fetchBooks()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/books/${id}`, { method: 'DELETE' })
    fetchBooks()
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64" />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Books</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={newBook.title}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={newBook.isbn}
            onChange={handleInputChange}
            required
          />
          <Input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newBook.quantity}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="category"
            placeholder="Category"
            value={newBook.category}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Add Book</Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(book._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

