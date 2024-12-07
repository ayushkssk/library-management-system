'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Student {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  course: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [newStudent, setNewStudent] = useState({ name: '', email: '', studentId: '', course: '' })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const response = await fetch('/api/students')
    const data = await response.json()
    setStudents(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
    setNewStudent({ name: '', email: '', studentId: '', course: '' })
    fetchStudents()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/students/${id}`, { method: 'DELETE' })
    fetchStudents()
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64" />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Students</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={newStudent.studentId}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="course"
            placeholder="Course"
            value={newStudent.course}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Add Student</Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(student._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

