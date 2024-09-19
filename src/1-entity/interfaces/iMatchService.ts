import type { MatchsDto } from '../dto/tournamentDto'

export interface iMatchInterface {
	create(input: MatchsDto): Promise<boolean>
}
