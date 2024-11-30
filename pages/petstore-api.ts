import { APIRequestContext } from '@playwright/test';

export class PetStoreAPI {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = 'https://petstore.swagger.io/v2';
  }

  async createPet(petData: any) {
    const response = await this.request.post(`${this.baseURL}/pet`, { data: petData });
    return response;
  }

  async updatePet(petData: any) {
    const response = await this.request.put(`${this.baseURL}/pet`, { data: petData });
    return response;
  }

  async findPetsByStatus(status: string) {
    const response = await this.request.get(`${this.baseURL}/pet/findByStatus`, { params: { status } });
    return response;
  }
}