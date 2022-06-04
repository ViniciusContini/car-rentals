import { AppError } from "../../../../errors/AppErrors";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "320i",
      description: "Sedan médio",
      daily_rate: 10,
      license_plate: "kfg1233",
      fine_amount: 20,
      brand: "BMW",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Sedan médio",
        daily_rate: 10,
        license_plate: "kfg1233",
        fine_amount: 20,
        brand: "BMW",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Sedan médio",
        daily_rate: 10,
        license_plate: "kfg1233",
        fine_amount: 20,
        brand: "BMW",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car2",
      description: "Sedan médio",
      daily_rate: 10,
      license_plate: "asf-1233",
      fine_amount: 20,
      brand: "BMW",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
