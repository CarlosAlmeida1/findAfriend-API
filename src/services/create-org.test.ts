import { beforeEach, describe, expect, test } from "vitest";
import { CreateOrgService } from "./create-org";
import { InMemoryOrgsRepository } from "@/repositories/in-memory-repository/in-memory-org-repository";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgService;

describe("Create Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgService(orgsRepository);
  });

  test("should be able do create org", async () => {
    const { orgs } = await sut.execute({
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
      password: "123456",
    });

    expect(orgs.id).toEqual(expect.any(String));
  });
});
