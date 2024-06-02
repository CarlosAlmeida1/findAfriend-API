import { OrgsRepository } from "@/repositories/org-repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from "bcryptjs";

interface CreateOrgServiceRequest {
  name: string;
  email: string;
  author_name: string;
  password: string;
  cep: string;
  city: string;
  street: string;
  phone: string;
  state: string;

  latitude: number;
  longitude: number;
}

interface CreateOrgServiceResponse {
  orgs: Org;
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    author_name,
    cep,
    city,
    email,
    latitude,
    longitude,
    name,
    password,
    phone,
    state,
    street,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (orgAlreadyExists) throw new OrgAlreadyExistsError();

    const passwordHash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      email,
      author_name,
      password: passwordHash,
      cep,
      city,
      street,
      phone,
      state,
      latitude,
      longitude,
    });

    return {
      orgs: org,
    };
  }
}
