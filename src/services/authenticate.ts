import { OrgsRepository } from "@/repositories/org-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  orgs: Org;
}

export class AuthenticateService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const orgs = await this.orgsRepository.findByEmail(email);

    if (!orgs) throw new InvalidCredentialsError();

    const isPasswordCorrect = await compare(password, orgs.password);

    if (!isPasswordCorrect) throw new InvalidCredentialsError();

    return { orgs };
  }
}
