import { LovePassCardType } from "@/components/love-pass-card";
import { getAuthToken } from "@/utils/auth-token";
import axios from "axios";

export class CardsService {
  async createOne(data: LovePassCardType): Promise<string> {
    const response = await axios.post("/api/cards", data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }

  async findManyByAuthToken(): Promise<LovePassCardType[]> {
    const response = await axios.get("/api/cards", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }

  async findOneByLovePassId(lovePassId: string): Promise<LovePassCardType> {
    const response = await axios.get(`/api/cards/${lovePassId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }

  async updateOneByLovePassId(
    lovePassId: string,
    data: LovePassCardType
  ): Promise<void> {
    await axios.patch(`/api/cards/${lovePassId}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  }

  async deleteOneByLovePassId(lovePassId: string): Promise<void> {
    await axios.delete(`/api/cards/${lovePassId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  }
}
