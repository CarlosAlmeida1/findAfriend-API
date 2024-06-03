import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory-repository/in-memory-org-repository";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { rejects } from "assert";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateService;

describe("Authenticate Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateService(orgsRepository);
  });

  test("should be able do authenticate org", async () => {
    await orgsRepository.create({
      name: "Org Name",
      author_name: "Author Name",
      email: "email@gmail.com",
      phone: "00000000000",
      cep: "00000-000",
      city: "City",
      state: "State",
      street: "Street",
      latitude: 0,
      longitude: 0,
      password: await hash("12345", 6),
    });

    const { orgs } = await sut.execute({
      email: "email@gmail.com",
      password: "12345",
    });

    expect(orgs.id).toEqual(expect.any(String));
  });

  test("should not be able do authenticate org whith wrong e-mail", async () => {
    await orgsRepository.create({
      name: "Org Name",
      author_name: "Author Name",
      email: "email@gmail.com",
      phone: "00000000000",
      cep: "00000-000",
      city: "City",
      state: "State",
      street: "Street",
      latitude: 0,
      longitude: 0,
      password: await hash("12345", 6),
    });

    await expect(() =>
      sut.execute({
        email: "carlos@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should not be able do authenticate org whith wrong password", async () => {
    await orgsRepository.create({
      name: "Org Name",
      author_name: "Author Name",
      email: "email@gmail.com",
      phone: "00000000000",
      cep: "00000-000",
      city: "City",
      state: "State",
      street: "Street",
      latitude: 0,
      longitude: 0,
      password: await hash("12345", 6),
    });

    await expect(() =>
      sut.execute({
        email: "email@gmail.com",
        password: "123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
