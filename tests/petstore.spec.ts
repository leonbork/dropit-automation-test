import { test, expect, APIRequestContext } from '@playwright/test';
import { PetStoreAPI } from '../pages/petstore-api';

test.describe('PetStore API Automation with POM', () => {
  let petStoreAPI: PetStoreAPI;
  let petId: number;

  test.beforeEach(async ({ request }) => {
    petStoreAPI = new PetStoreAPI(request);
  });

  test('Create a new pet and update its status', async () => {
    // Step 1: Create a new pet
    const petData = {
      id: 12345,
      name: "Fluffy",
      category: { id: 1, name: "dog" },
      photoUrls: ["https://example.com/photo"],
      tags: [{ id: 1, name: "cute" }],
      status: "available",
    };

    const createResponse = await petStoreAPI.createPet(petData);
    expect(createResponse.ok()).toBeTruthy();

    const createResponseBody = await createResponse.json();
    petId = createResponseBody.id;
    expect(createResponseBody.status).toBe("available");

    // Step 2: Update the pet's status to "sold"
    const updatedPetData = { ...petData, status: "sold" };
    const updateResponse = await petStoreAPI.updatePet(updatedPetData);
    expect(updateResponse.ok()).toBeTruthy();

    const updateResponseBody = await updateResponse.json();
    expect(updateResponseBody.status).toBe("sold");
  });

  test('Find a pet by status: available and verify fourth pet name', async () => {
    // Step 1: Find pets by status: "available"
    const findResponse = await petStoreAPI.findPetsByStatus("available");
    expect(findResponse.ok()).toBeTruthy();

    const pets = await findResponse.json();

    // Verify the fourth pet's name is "Puff"
    expect(pets[3]).toBeTruthy();
    expect(pets[3].name).toBe("Puff");

    // Log the fourth pet object to the console
    console.log(pets[3]);
  });

  test('Find a pet by status: sold and validate statuses', async () => {
    // Step 1: Find pets by status: "sold"
    const findResponse = await petStoreAPI.findPetsByStatus("sold");
    expect(findResponse.ok()).toBeTruthy();

    const pets = await findResponse.json();

    // Validate all pets have the status "sold"
    pets.forEach((pet: any) => {
      expect(pet.status).toBe("sold");
    });
  });
});