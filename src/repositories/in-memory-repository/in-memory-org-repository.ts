import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import crypto from "node:crypto";
import { OrgsRepository } from "../org-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async findById(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) || null;
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null;
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(org);

    return org;
  }
}
