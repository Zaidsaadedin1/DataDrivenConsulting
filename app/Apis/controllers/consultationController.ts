import axios from "../types/axios";
import {
  CreateConsultationDto,
  GetConsultationDto,
  GetConsultationForAdminDto,
} from "../types/consultationDtos/consultationDtos";
import { GenericResponse } from "../types/Shared/sharedDtos";

export const consultationController = {
  CreateConsultationAsync: async (
    createConsultationDto: CreateConsultationDto
  ) => {
    const response = await axios.post<GenericResponse<number>>(
      `/Consultation`,
      createConsultationDto
    );
    return response.data;
  },
  GetAllUserAppointmentAsync: async (userId: string) => {
    const response = await axios.get<GenericResponse<GetConsultationDto[]>>(
      `/Consultation/GetAllUserAppointmentAsync/${userId}`
    );
    return response.data;
  },

  GetConsultations: async () => {
    const response = await axios.get<
      GenericResponse<GetConsultationForAdminDto[]>
    >(`/Consultation`);
    return response.data.data;
  },
};

export default consultationController;
