import { PrismaClient } from '@prisma/client';
import { hashPassword, verifyPassword } from './auth';

const prisma = new PrismaClient();

export async function getUsers() {
  const users = await prisma.users.findMany();
  return users;
}

export async function getUserById(id) {
  const user = await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });
  return user;
}

export async function registerUser(name, email, password) {
  const hashedPassword = await hashPassword(password);
  const defaultProfilePictureUrl = 'https://profilepicturesbibliotecabucket.s3.sa-east-1.amazonaws.com/uploads/default-profile.png';
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'user',
      profilePicture: defaultProfilePictureUrl,
    },
  });
  return user;
}

export async function loginUser(email, password) {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }
  return user;
}

export async function analiseEmail(email) {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  return user;
}

export async function updateUser(id, name, email, profilePicture) {
  const user = await prisma.users.update({
    where: { id: parseInt(id) },
    data: {
      name,
      email,
      profilePicture,
    },
  });
  return user;
}

export async function removeUser(id) {
  const user = await prisma.users.delete({
    where: { id: parseInt(id) },
  });
  return user;
}

export async function createTicket(userId, title) {
  const ticket = await prisma.ticket.create({
    data: {
      userId: parseInt(userId),
      title,
    },
  });
  return ticket;
}

export async function getTickets() {
  const tickets = await prisma.ticket.findMany({
    include: {
      user: true,
      messages: true,
    },
  });
  return tickets;
}

export async function createMessage(ticketId, senderId, content) {
  const message = await prisma.message.create({
    data: {
      ticketId: parseInt(ticketId),
      senderId: parseInt(senderId),
      content,
    },
  });
  return message;
}

export async function getMessages(ticketId) {
  const messages = await prisma.message.findMany({
    where: { ticketId: parseInt(ticketId) },
    include: {
      sender: true,
    },
  });
  return messages;
}