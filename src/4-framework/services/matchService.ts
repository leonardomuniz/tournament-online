import type { MatchsDto } from '../../1-entity/dto/tournamentDto'
import type { iMatchInterface } from '../../1-entity/interfaces/iMatchService'
import { AppDataSource } from '../database/data-source'
import { Matchs } from '../database/entity/match'

export class MatchService implements iMatchInterface {
	private matchRepository = AppDataSource.getRepository(Matchs)

	async create(input: MatchsDto): Promise<boolean> {
		console.log('START MatchService :: create ::', input)
		try {
			const tournament = this.matchRepository.create(input)
			console.log('MatchService :: create ::', tournament)

			const response = await this.matchRepository.save(tournament)
			console.log('MatchService :: save ::', response)

			console.log('FINISH MatchService :: create')
			return true
		} catch (error) {
			console.log('MatchService :: create ::', error)

			throw error
		}
	}
}
