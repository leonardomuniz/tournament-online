import { Router } from 'express'
import { lobbyRouter } from './lobbyFunction'
import { matchRouter } from './matchFunction'
import { tournamentRouter } from './tournamentFunction'
import { userRouter } from './userFunction'

export const routers = Router()

routers.use('/users', userRouter)
routers.use('/tournaments', tournamentRouter)
routers.use('/matchs', matchRouter)
routers.use('/lobby', lobbyRouter)
