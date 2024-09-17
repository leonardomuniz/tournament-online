import { Router } from 'express'
import { tournamentRouter } from './tournamentFunction'
import { userRouter } from './userFunction'

export const routers = Router()

routers.use('/users', userRouter)
routers.use('/tournaments', tournamentRouter)
