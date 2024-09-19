import type { TournamentDto } from '../../1-entity/dto/tournamentDto'
import type { iTournamentInterface } from '../../1-entity/interfaces/iTournamentService'
import { AppDataSource } from '../database/data-source'
import { Tournaments } from '../database/entity/tournament'

export class TournamentService implements iTournamentInterface {
	private tournamentRepository = AppDataSource.getRepository(Tournaments)

	async findAll(): Promise<TournamentDto[]> {
		return await this.tournamentRepository.find({
			relations: {
				owner: true
			}
		})
	}

	async create(input: TournamentDto): Promise<boolean> {
		console.log('START TournamentService :: create ::', input)
		try {
			const tournament = this.tournamentRepository.create(input)
			console.log('TournamentService :: create ::', tournament)

			const response = await this.tournamentRepository.save(tournament)
			console.log('TournamentService :: save ::', response)

			console.log('FINISH TournamentService :: create')
			return true
		} catch (error) {
			console.log('TournamentService :: create ::', error)

			throw error
		}
	}
	async findOne(tournamentId: string): Promise<TournamentDto | null> {
		return this.tournamentRepository.findOne({
			where: { id: tournamentId },
			relations: { owner: true }
		})
	}
	async update(tournamentId: string, input: TournamentDto): Promise<boolean> {
		console.log('START TournamentService :: update ::', input)
		try {
			const response = await this.tournamentRepository.update({ id: tournamentId }, input)
			console.log('TournamentService :: update ::', response)

			console.log('FINISH TournamentService :: update')
			return true
		} catch (error) {
			console.log('TournamentService :: update ::', error)

			throw error
		}
	}

	async delete(tournamentId: string): Promise<boolean> {
		console.log('START TournamentService :: delete ::', tournamentId)
		try {
			const response = await this.tournamentRepository.delete({ id: tournamentId })
			console.log('TournamentService :: delete ::', response)

			console.log('FINISH TournamentService :: delete')
			return true
		} catch (error) {
			console.log('TournamentService :: delete ::', error)

			throw error
		}
	}
}
