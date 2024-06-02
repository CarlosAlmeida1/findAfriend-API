import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { FindAllParams, PetsRepository } from "@/repositories/pets.repository";
import { Pet, Prisma } from "@prisma/client";
import crypto from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.items.push(pet);

    return pet;
  }
}
