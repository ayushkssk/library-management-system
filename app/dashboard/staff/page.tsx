'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Staff {
  _id: string;
  name: string;
  email: string;
  staffId: string;
  position: string;
}

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([])
  const [newStaff, setNewStaff] = useState({ name: '', email: '', staffId: '', position: '' })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    const response = await fetch('/api/staff')
    const data = await response.json()
    setStaffMembers(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStaff),
    })
    setNewStaff({ name: '', email: '', staffId: '', position: '' })
    fetchStaff()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/staff/${id}`, { method: 'DELETE' })
    fetchStaff()
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64" />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Staff</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={newStaff.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={newStaff.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="staffId"
            placeholder="Staff ID"
            value={newStaff.staffId}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="position"
            placeholder="Position"
            value={newStaff.position}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Add Staff Member</Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Staff ID</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.staffId}</TableCell>
                <TableCell>{staff.position}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(staff._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

