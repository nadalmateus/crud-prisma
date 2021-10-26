import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.get('/', async (request: Request, response: Response) => {
  const users = await prisma.user.findMany()

  return response.json(users)
})

app.get('/byId/:id', async (request: Request, response: Response) => {
  const id = request.params.id
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  })

  return response.json(user)
})

app.post('/', async (request: Request, response: Response) => {
  const { username, password } = request.body
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })
  return response.json(user)
})

app.put('/', async (request: Request, response: Response) => {
  const { id, username } = request.body
  const updatedUser = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      username: username
    }
  })
  return response.json(updatedUser)
})

app.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id)
    }
  })
  return response.json(deletedUser)
})

app.listen(3333, () => { console.log('3333') })
