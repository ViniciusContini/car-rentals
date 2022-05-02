import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  create(data: ICreateCarDTO): Promise<void> {}
}

export { CarsRepositoryInMemory };
