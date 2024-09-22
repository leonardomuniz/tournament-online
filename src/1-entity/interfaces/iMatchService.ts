import type { MatchsDto } from '../dto/matchsDto'

export interface iMatchInterface {
	create(input: MatchsDto): Promise<boolean>
}
