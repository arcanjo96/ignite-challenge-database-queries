import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("LOWER(games.title) like :title", { title: `%${param.toLowerCase()}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(*) from games;");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return getRepository(User)
      .createQueryBuilder("users")
      .innerJoin("users.games", "game")
      .where("game.id = :id", {id})
      .getMany();
  }
}
